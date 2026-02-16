import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
});

fastify.register(multipart);

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

fastify.get('/api/jobs', async (request, reply) => {
  const { query = 'developer in india' } = request.query;
  
  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechNova Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $150k',
      description: 'We are looking for an experienced React developer to lead our frontend team.',
      matchScore: 92,
      applyUrl: 'https://example.com/apply/1'
    },
    {
      id: 2,
      title: 'Node.js Backend Engineer',
      company: 'GrowEasy Tech',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹12L - ₹18L',
      description: 'Build scalable APIs using Node.js, Fastify, and MongoDB.',
      matchScore: 78,
      applyUrl: 'https://example.com/apply/2'
    },
    {
      id: 3,
      title: 'Full Stack JavaScript Developer',
      company: 'CloudSync Inc',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹10L - ₹15L',
      description: 'Work with modern JavaScript stack - React, Node.js, and cloud technologies.',
      matchScore: 85,
      applyUrl: 'https://example.com/apply/3'
    },
    {
      id: 4,
      title: 'Frontend Engineer',
      company: 'DesignCraft',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $100k',
      description: 'Create beautiful and responsive user interfaces with React and Tailwind CSS.',
      matchScore: 88,
      applyUrl: 'https://example.com/apply/4'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'InfraScale',
      location: 'Pune, India',
      type: 'Full-time',
      salary: '₹15L - ₹20L',
      description: 'Manage cloud infrastructure, containerization, and CI/CD pipelines.',
      matchScore: 72,
      applyUrl: 'https://example.com/apply/5'
    },
    {
      id: 6,
      title: 'Python Developer',
      company: 'DataPulse AI',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $130k',
      description: 'Build intelligent data processing pipelines and machine learning solutions.',
      matchScore: 75,
      applyUrl: 'https://example.com/apply/6'
    }
  ];

  return { jobs: mockJobs };
});

fastify.post('/api/resume', async (request, reply) => {
  try {
    const data = await request.file();
    
    if (!data) {
      return reply.code(400).send({ error: 'No file provided' });
    }

    const buffer = await data.toBuffer();
    const text = buffer.toString('utf-8');

    return {
      success: true,
      filename: data.filename,
      extractedText: text.substring(0, 1000)
    };
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Resume upload failed' });
  }
});

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
