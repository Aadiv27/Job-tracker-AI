import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Briefcase, Loader2, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ChatAssistant from '@/components/ChatAssistant/ChatAssistant'; 
import './JobFeed.css';

export default function JobFeed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchJobs = async (query = 'developer in india') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to load jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
      toast({ title: "Error", description: "Jobs load failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm.trim() || 'developer in india');
  }, [searchTerm]);

  const handleApply = (job) => {
    if (job.applyUrl && job.applyUrl !== '#') {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
      setSelectedJob(job);
    } else {
      toast({ title: "Apply link not available", variant: "destructive" });
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      if (selectedJob) {
        setShowPopup(true);
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [selectedJob]);

  const saveApplication = (job, status = 'Applied') => {
    const newApp = {
      id: Date.now().toString(),
      title: job.title,
      company: job.company,
      location: job.location,
      applyUrl: job.applyUrl,
      status,
      appliedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('applications') || '[]');
    localStorage.setItem('applications', JSON.stringify([...existing, newApp]));

    toast({ title: "Application tracked!", description: `Status: ${status}` });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Job Feed</h1>
          <p className="text-gray-600">Discover amazing job opportunities</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs... (e.g. react developer remote india)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => fetchJobs(searchTerm.trim() || 'developer in india')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 md:w-auto"
          >
            <Filter className="w-5 h-5" />
            Search
          </button>
        </div>

        {/* Floating AI Chat Assistant */}
        <ChatAssistant
          onFilterChange={(newFilters) => {
            if (newFilters.query) {
              setSearchTerm(newFilters.query);
            }
            fetchJobs(newFilters.query || searchTerm);
          }}
        />

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            <span className="ml-3 text-lg text-gray-600">Loading real jobs...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-600">
            <p>Error: {error}</p>
            <button
              onClick={() => fetchJobs(searchTerm.trim() || 'developer in india')}
              className="mt-4 text-indigo-600 underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <>
            {/* Best Matches Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Matches for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs
                  .filter(job => job.matchScore >= 50)
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .slice(0, 6)
                  .map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600 hover:shadow-xl transition"
                    >
                      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                      <p className="text-gray-600 mb-3">{job.company}</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          job.matchScore > 70 ? 'bg-green-600' :
                          job.matchScore >= 40 ? 'bg-yellow-600' :
                          'bg-gray-600'
                        }`}>
                          {job.matchScore}% Match
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" /> {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5" /> {job.type}
                        </div>
                        {job.salary && job.salary !== 'Not listed' && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5" /> {job.salary}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>
                      <button
                        onClick={() => handleApply(job)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
              </div>
            </section>

            {/* All Jobs */}
            <div className="space-y-6">
              {jobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-3">{job.company}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      job.matchScore > 70 ? 'bg-green-600' :
                      job.matchScore >= 40 ? 'bg-yellow-600' :
                      'bg-gray-600'
                    }`}>
                      {job.matchScore}% Match
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" /> {job.type}
                    </div>
                    {job.salary && job.salary !== 'Not listed' && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" /> {job.salary}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Smart Apply Popup */}
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Did you apply?</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Did you apply to <strong>{selectedJob?.title}</strong> at <strong>{selectedJob?.company}</strong>?
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPopup(false);
                  setSelectedJob(null);
                }}
              >
                No, just browsing
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPopup(false);
                  setSelectedJob(null);
                }}
              >
                Later
              </Button>
              <Button
                onClick={() => {
                  saveApplication(selectedJob);
                  setShowPopup(false);
                  setSelectedJob(null);
                }}
              >
                Yes, Applied!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}