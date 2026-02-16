const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs-extra');
const pdfParse = require('pdf-parse');
const axios = require('axios');
require('dotenv').config();

fastify.register(require('@fastify/cors'), { origin: 'http://localhost:5173' });
fastify.register(require('@fastify/multipart'), { limits: { fileSize: 5 * 1024 * 1024 } });

const DATA_FILE = path.join(__dirname, 'data/users.json');
const APPLICATIONS_FILE = path.join(__dirname, 'data/applications.json');

// Ensure files exist
fs.ensureDirSync(path.dirname(DATA_FILE));
if (!fs.existsSync(DATA_FILE)) {
  fs.writeJsonSync(DATA_FILE, [{ email: 'test@gmail.com', resumeText: '', resumeFileName: '' }], { spaces: 2 });
}
if (!fs.existsSync(APPLICATIONS_FILE)) {
  fs.writeJsonSync(APPLICATIONS_FILE, [], { spaces: 2 });
}

// Resume upload & extraction
fastify.post('/api/resume', async (request, reply) => {
  const data = await request.file();
  if (!data) return reply.code(400).send({ error: 'No file uploaded' });

  const { mimetype, filename, file: fileStream } = data;
  if (!['application/pdf', 'text/plain'].includes(mimetype)) {
    return reply.code(400).send({ error: 'Only PDF or TXT allowed' });
  }

  const buffers = [];
  for await (const chunk of fileStream) {
    buffers.push(chunk);
  }
  const buffer = Buffer.concat(buffers);

  let extractedText = '';
  try {
    if (mimetype === 'application/pdf') {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text.trim();
    } else {
      extractedText = buffer.toString('utf-8').trim();
    }

    const users = fs.readJsonSync(DATA_FILE);
    const user = users.find(u => u.email === 'test@gmail.com');
    if (user) {
      user.resumeText = extractedText;
      user.resumeFileName = filename;
      fs.writeJsonSync(DATA_FILE, users, { spaces: 2 });
    }

    return reply.send({ success: true, message: 'Resume uploaded & text extracted' });
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Failed to extract text' });
  }
});

// GET resume text
fastify.get('/api/resume', async () => {
  const users = fs.readJsonSync(DATA_FILE);
  const user = users.find(u => u.email === 'test@gmail.com');
  return { hasResume: !!user?.resumeText, resumeText: user?.resumeText || '' };
});

// Jobs fetch + Matching (keyword based - embeddings crash avoid kiya)
fastify.get('/api/jobs', async (request, reply) => {
  const { query = 'software developer in india' } = request.query;

  if (!process.env.RAPIDAPI_KEY) {
    return reply.code(500).send({ error: 'RapidAPI key missing in .env' });
  }

  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: { query, page: '1', num_pages: '1' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    const jobs = response.data.data.map(job => ({
      id: job.job_id,
      title: job.job_title || 'Untitled Job',
      company: job.employer_name || 'Unknown',
      location: `${job.job_city || ''}, ${job.job_country || 'India'}`.trim() || 'Remote',
      description: job.job_description || 'No description',
      type: job.job_employment_type || 'Full-time',
      applyUrl: job.job_apply_link || '#',
      salary: job.job_min_salary ? `$${job.job_min_salary} - $${job.job_max_salary || job.job_min_salary}` : 'Not listed'
    }));

    // Matching logic (keyword based - safe & working)
    const users = fs.readJsonSync(DATA_FILE);
    const resumeText = users.find(u => u.email === 'test@gmail.com')?.resumeText || '';

    const enhancedJobs = jobs.map(job => {
      let matchScore = 0;
      if (resumeText && job.description) {
        const resumeLower = resumeText.toLowerCase();
        const descLower = job.description.toLowerCase();

        const keywords = ['react', 'javascript', 'node', 'full stack', 'developer', 'engineer', 'remote', 'india', 'python', 'java', 'sql', 'aws', 'cloud', 'agile', 'git', 'docker'];
        keywords.forEach(kw => {
          if (resumeLower.includes(kw) && descLower.includes(kw)) matchScore += 12;
        });

        if (descLower.includes('remote') && resumeLower.includes('remote')) matchScore += 15;
        if (descLower.includes('full-time') && resumeLower.includes('full-time')) matchScore += 10;

        matchScore = Math.min(matchScore, 100);
      }

      return { ...job, matchScore };
    });

    reply.send({ jobs: enhancedJobs, total: enhancedJobs.length });
  } catch (err) {
    fastify.log.error('JSearch error:', err.response?.data || err.message);
    reply.code(500).send({ error: 'Failed to fetch jobs' });
  }
});

// Track applications
fastify.post('/api/applications', async (request, reply) => {
  const { job } = request.body;

  if (!job || !job.id) return reply.code(400).send({ error: 'Invalid job data' });

  const apps = fs.existsSync(APPLICATIONS_FILE) ? fs.readJsonSync(APPLICATIONS_FILE) : [];

  if (apps.some(a => a.jobId === job.id)) {
    return reply.send({ success: true, message: 'Already tracked' });
  }

  apps.push({
    id: Date.now().toString(),
    ...job,
    status: 'Applied',
    appliedAt: new Date().toISOString()
  });

  fs.writeJsonSync(APPLICATIONS_FILE, apps, { spaces: 2 });

  return reply.send({ success: true, message: 'Application tracked' });
});

// AI Chat for filter control
fastify.post('/api/chat', async (request, reply) => {
  const { message, currentFilters = {} } = request.body;

  if (!message) return reply.code(400).send({ error: 'No message' });

  // Simple mock response (embeddings crash avoid kiya)
  // Real LLM use karne ke liye uncomment kar do
  const mockResponse = {
    action: message.includes('remote') ? 'update_filters' : 'help',
    filters: message.includes('remote') ? { workMode: 'remote' } : null,
    query: null,
    response: message.includes('remote') ? 'Showing remote jobs only!' : 'Got it! How can I help?'
  };

  reply.send(mockResponse);

  // Real LLM (uncomment if you fix embeddings)
  /*
  try {
    const prompt = ChatPromptTemplate.fromTemplate(`...`); // your prompt
    const chain = prompt.pipe(llm);
    const result = await chain.invoke({ message, filters: JSON.stringify(currentFilters) });
    const parsed = JSON.parse(result.content.trim());
    reply.send(parsed);
  } catch (err) {
    fastify.log.error(err);
    reply.code(500).send({ error: 'Chat failed' });
  }
  */
});

// Health check
fastify.get('/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Backend running on http://localhost:5000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();