// src/components/filters/FilterBar.jsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function FilterBar({ filters, setFilters }) {
  // filters = { role: '', skills: [], date: 'any', type: '', mode: '', location: '', match: 'all' }

  const handleClear = () => setFilters({ role: '', skills: [], date: 'any', type: '', mode: '', location: '', match: 'all' });

  return (
    <div className="bg-card border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Role / Title search */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-1 block">Role / Title</label>
          <Input
            placeholder="e.g. React Developer"
            value={filters.role}
            onChange={e => setFilters({ ...filters, role: e.target.value })}
          />
        </div>

        {/* Date Posted */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Date Posted</label>
          <Select value={filters.date} onValueChange={v => setFilters({ ...filters, date: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="any">Any time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Job Type</label>
          <Select value={filters.type} onValueChange={v => setFilters({ ...filters, type: v })}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Work Mode */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Work Mode</label>
          <Select value={filters.mode} onValueChange={v => setFilters({ ...filters, mode: v })}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="on-site">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Match Score */}
        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Match Score</label>
          <Select value={filters.match} onValueChange={v => setFilters({ ...filters, match: v })}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="high">High (70%)</SelectItem>
              <SelectItem value="medium">Medium (40-70%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={handleClear} className="mt-6">
          <X className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      {/* Skills multi-select baad mein add karenge (Combobox ya tags) */}
    </div>
  );
}