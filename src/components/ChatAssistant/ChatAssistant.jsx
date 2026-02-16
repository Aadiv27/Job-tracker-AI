import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function ChatAssistant({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help filter jobs. Try: "show remote react jobs" or "high match only"' }
  ]);

  const extractFiltersFromMessage = (userMessage) => {
    const msg = userMessage.toLowerCase();
    const filters = {};
    
    const skills = ['react', 'javascript', 'python', 'java', 'golang', 'rust', 'node', 'nodejs', 'angular', 'vue', 'typescript', 'c++', 'c#', 'ruby', 'php'];
    const locations = ['remote', 'india', 'usa', 'uk', 'canada', 'bangalore', 'delhi', 'mumbai'];
    const jobTypes = ['full-time', 'fulltime', 'part-time', 'parttime', 'contract', 'freelance', 'internship'];
    
    const detectedSkills = skills.filter(skill => msg.includes(skill));
    const detectedLocations = locations.filter(loc => msg.includes(loc));
    const detectedTypes = jobTypes.filter(type => msg.includes(type));
    
    if (detectedSkills.length > 0) {
      filters.skills = detectedSkills;
    }
    
    if (detectedLocations.length > 0) {
      filters.locations = detectedLocations;
    }
    
    if (detectedTypes.length > 0) {
      filters.jobTypes = detectedTypes;
    }
    
    if (msg.includes('senior') || msg.includes('lead') || msg.includes('manager')) {
      filters.level = 'senior';
    }
    
    return filters;
  };

  const generateSimpleResponse = (userMessage, appliedFilters) => {
    const msg = userMessage.toLowerCase();
    
    if (Object.keys(appliedFilters).length > 0) {
      const filterSummary = [];
      if (appliedFilters.skills) filterSummary.push(appliedFilters.skills.join(', '));
      if (appliedFilters.locations) filterSummary.push(appliedFilters.locations.join(', '));
      if (appliedFilters.jobTypes) filterSummary.push(appliedFilters.jobTypes.join(', '));
      return `🔍 Searching for ${filterSummary.join(' • ')} jobs... Let me find the best matches for you!`;
    }
    
    if (msg.includes('salary') || msg.includes('pay')) return "Salary info is shown in the job cards when available. Some jobs may have estimated salaries.";
    if (msg.includes('help')) return "I can help you search jobs by skills (React, Python, etc.), location (Remote, India, etc.), and job type. What are you looking for?";
    if (msg.includes('filter') || msg.includes('match')) return "I can filter jobs by match score. Try: 'show high match jobs' or 'only 80% match'.";
    if (msg.includes('thanks') || msg.includes('thank you')) return "You're welcome! Let me know if you need any other job searches.";
    
    return "Got it! Let me help you find the right job. I can search by skills, location, or job type.";
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: 'user', content: message };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, currentFilters: {} })
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }

      if (data.action === 'update_filters' && data.filters) {
        onFilterChange(data.filters);
        toast({ title: "Filters updated!", description: "Applying new filters..." });
      }
    } catch (err) {
      console.error('Chat error:', err);
      const extractedFilters = extractFiltersFromMessage(message);
      const fallbackResponse = generateSimpleResponse(message, extractedFilters);
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
      
      if (Object.keys(extractedFilters).length > 0) {
        onFilterChange(extractedFilters);
      }
      
      toast({ 
        title: "Using basic assistant", 
        description: "Backend AI is not available, using simple mode",
        variant: "default" 
      });
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">AI Job Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Ask me anything... (e.g. remote only)"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}