import { X } from 'lucide-react';

export default function FilterBar({ filters, setFilters }) {
  const handleClear = () => setFilters({ role: '', skills: [], date: 'any', type: '', mode: '', location: '', match: 'all' });

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Role / Title search */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-1 block">Role / Title</label>
          <input
            type="text"
            placeholder="e.g. React Developer"
            value={filters.role}
            onChange={e => setFilters({ ...filters, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date Posted */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Date Posted</label>
          <select 
            value={filters.date} 
            onChange={e => setFilters({ ...filters, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="any">Any time</option>
            <option value="24h">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Job Type</label>
          <select 
            value={filters.type} 
            onChange={e => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Work Mode */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Work Mode</label>
          <select 
            value={filters.mode} 
            onChange={e => setFilters({ ...filters, mode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="on-site">On-site</option>
          </select>
        </div>

        {/* Match Score */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Match Score</label>
          <select 
            value={filters.match} 
            onChange={e => setFilters({ ...filters, match: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="high">High (70%)</option>
            <option value="medium">Medium (40-70%)</option>
          </select>
        </div>

        <button 
          onClick={handleClear} 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center gap-2 mt-6"
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>
    </div>
  );
}