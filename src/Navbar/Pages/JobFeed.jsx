import { useState } from 'react';
import JobCard from '@/components/job/JobCard';
import FilterBar from '@/components/filters/FilterBar'; // agar bana liya to

// Fake data (baad mein API se aayega)
const mockJobs = [
  { id: 1, title: "Senior React Developer", company: "TechNova", location: "Remote", type: "Full-time", description: "Lead frontend team, React + TypeScript + Tailwind", matchScore: 92 },
  { id: 2, title: "Node.js Backend Engineer", company: "GrowEasy", location: "Bangalore", type: "Full-time", description: "Build scalable APIs with Node, Fastify, MongoDB", matchScore: 78 },
  { id: 3, title: "Python ML Engineer", company: "DataPulse", location: "Hybrid - Pune", type: "Full-time", description: "PyTorch, TensorFlow, model deployment", matchScore: 65 },
  // 5-6 aur jobs daal sakte ho
];

export default function JobFeed() {
  const [filters, setFilters] = useState({
    role: '',
    date: 'any',
    type: '',
    mode: '',
    match: 'all'
  });

  // Simple client-side filter example (baad mein backend pe shift kar denge)
  const filteredJobs = mockJobs.filter(job => {
    if (filters.match === 'high' && job.matchScore <= 70) return false;
    if (filters.match === 'medium' && (job.matchScore > 70 || job.matchScore < 40)) return false;
    return true;
  });

  const bestMatches = [...filteredJobs]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Job Tracker</h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => window.location.href = "/profile"}>Profile</Button>
            <Button variant="ghost" onClick={() => window.location.href = "/applications"}>Applications</Button>
            <Button variant="outline" onClick={() => {
              localStorage.removeItem("isAuthenticated");
              window.location.href = "/";
            }}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <FilterBar filters={filters} setFilters={setFilters} />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Matches for You</h2>
          {bestMatches.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No high match jobs found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestMatches.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">All Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}