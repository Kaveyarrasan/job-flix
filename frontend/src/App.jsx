import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import JobRow from './components/JobRow';
import JobModal from './components/JobModal';
import axios from 'axios';

const App = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [remoteJobs, setRemoteJobs] = useState([]);

  React.useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const fetchJobs = async () => {
      try {
        const trending = await axios.get(`${API_URL}/api/jobs/trending`);
        const remote = await axios.get(`${API_URL}/api/jobs/remote`);
        setTrendingJobs(trending.data);
        setRemoteJobs(remote.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      await axios.post(`${API_URL}/api/applications/apply`, {
        job_id: jobId,
        user_id: 1 
      });
      setAppliedJobs([...appliedJobs, jobId]);
      alert("Application successful!");
      setSelectedJob(null);
    } catch (error) {
      alert(error.response?.data?.detail || "Error applying for job");
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white font-sans overflow-x-hidden selection:bg-netflix-red selection:text-white">
      {/* Navbar - Glassmorphism effect on scroll */}
      <nav 
        role="navigation"
        aria-label="Main Navigation"
        className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm transition-all duration-500"
      >
        <div className="flex items-center space-x-4 md:space-x-8">
          <h1 className="text-netflix-red text-2xl md:text-3xl font-extrabold tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            JOBFLIX
          </h1>
          <ul className="hidden md:flex space-x-4 text-sm font-medium">
            <li className="text-white hover:text-gray-300 cursor-pointer transition-colors">Home</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">Remote</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">Trending</li>
            <li className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors">My Applications</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <button aria-label="Search Jobs" className="hover:text-netflix-red transition-colors">
            <Search size={20} />
          </button>
          <button aria-label="Notifications" className="relative hover:text-netflix-red transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-netflix-red text-[10px] rounded-full px-1">3</span>
          </button>
          <div 
            role="button"
            aria-label="User Profile"
            className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded ring-2 ring-transparent hover:ring-white transition-all cursor-pointer flex items-center justify-center"
          >
            <User size={18} />
          </div>
        </div>
      </nav>

      {/* Hero Section - Dynamic & Immersive */}
      <header 
        className="relative h-[70vh] md:h-[85vh] w-full bg-cover bg-center flex items-center px-6 md:px-12" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #141414 10%, rgba(20, 20, 20, 0.4) 50%, transparent 100%), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' 
        }}
      >
        <div className="max-w-3xl space-y-4 md:space-y-6 animate-fadeIn">
          <div className="flex items-center space-x-2">
            <span className="bg-netflix-red text-[10px] font-bold px-1 rounded-sm uppercase tracking-widest">Original</span>
            <h2 className="text-sm md:text-lg font-bold text-gray-300 uppercase tracking-widest">Top Pick for You</h2>
          </div>
          <h3 className="text-4xl md:text-7xl font-black leading-tight drop-shadow-2xl">
            Senior Full <br /> Stack Developer
          </h3>
          <p className="text-sm md:text-xl text-gray-200 max-w-xl line-clamp-3 md:line-clamp-none drop-shadow-md">
            Join the elite engineering team at **CloudScale**. Lead the design of distributed systems 
            serving millions. High-impact role with premium global benefits.
          </p>
          <div className="flex space-x-3 pt-2 md:pt-4">
            <button 
              onClick={() => handleApply(1)}
              className="bg-white text-black px-4 md:px-10 py-2 md:py-3 rounded-md font-bold hover:bg-white/90 transition flex items-center space-x-2 shadow-xl active:scale-95"
            >
              <span className="text-xl">▶</span> <span>Apply Now</span>
            </button>
            <button className="bg-gray-500/60 text-white px-4 md:px-10 py-2 md:py-3 rounded-md font-bold hover:bg-gray-500/40 backdrop-blur-md transition flex items-center space-x-2 shadow-xl active:scale-95">
              <span className="text-xl">ⓘ</span> <span>More Info</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-netflix-black to-transparent"></div>
      </header>

      {/* Job Rows - Responsive Containers */}
      <main className="-mt-20 md:-mt-48 pb-20 relative z-40 space-y-4 md:space-y-8">
        <JobRow title="Trending Jobs" jobs={trendingJobs} onJobClick={setSelectedJob} />
        <JobRow title="Remote Opportunities" jobs={remoteJobs} onJobClick={setSelectedJob} />
        <JobRow title="Recently Added" jobs={[...trendingJobs].reverse()} onJobClick={setSelectedJob} />
      </main>

      <JobModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
        onApply={handleApply}
      />

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-netflix-black/95 backdrop-blur-md border-t border-white/10 flex justify-around py-3 z-50">
        <div className="flex flex-col items-center text-[10px] text-white"><Search size={20} /><span>Search</span></div>
        <div className="flex flex-col items-center text-[10px] text-gray-400"><Bell size={20} /><span>Alerts</span></div>
        <div className="flex flex-col items-center text-[10px] text-gray-400"><User size={20} /><span>Account</span></div>
      </nav>
    </div>
  );
};

export default App;
