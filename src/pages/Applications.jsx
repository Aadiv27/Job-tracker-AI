import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import './Applications.css';

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('applications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setApplications(parsed);
        });
      } catch (err) {
        console.error('Failed to parse applications:', err);
        localStorage.removeItem('applications');
      }
    }
  }, []);

  const clearApplications = () => {
    localStorage.removeItem('applications');
    setApplications([]);
    toast({ title: "Cleared", description: "All applications removed" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Your Applications</h1>
          {applications.length > 0 && (
            <Button variant="outline" onClick={clearApplications}>
              Clear All
            </Button>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 font-medium">
              No applications tracked yet.
            </p>
            <p className="mt-4 text-gray-500">
              Apply to jobs — they'll appear here with status and date.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {app.title}
                </h2>
                <p className="text-gray-700 font-medium mb-1">{app.company}</p>
                <p className="text-sm text-gray-500 mb-3">{app.location}</p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span className="font-medium">Applied:</span>
                  {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                  {app.status}
                </div>

                {app.applyUrl && app.applyUrl !== '#' && (
                  <a
                    href={app.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-indigo-600 hover:text-indigo-800 font-medium text-sm underline"
                  >
                    View Original Job →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}