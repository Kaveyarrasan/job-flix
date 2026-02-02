import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import JobRow from './components/JobRow';
import JobModal from './components/JobModal';
import LoginPage from './components/LoginPage';

const HomePage = ({ trendingJobs, remoteJobs, setSelectedJob, handleApply }) => (
  <div className="animate-fadeIn">
    {/* Hero Section */}
    <header className="relative h-[85vh] w-full bg-cover bg-center flex items-center px-6 md:px-12" style={{ backgroundImage: 'linear-gradient(to right, #141414 20%, transparent), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' }}>
      <div className="max-w-3xl space-y-6 pt-32 pb-20">
        <h2 className="text-netflix-red font-bold uppercase tracking-[0.5em] text-xs md:text-sm">Featured Role</h2>
        <h1 className="text-4xl md:text-7xl font-black leading-[1.1] drop-shadow-lg">Senior Full <br /> Stack Developer</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-xl drop-shadow-md">
          Lead the core architecture at **CloudScale**. Help build distributed systems serving millions. 
          Premium salary and global remote benefits.
        </p>
        <div className="flex space-x-4 pt-6">
          <button 
            onClick={() => handleApply(1)}
            className="bg-white text-black px-6 md:px-10 py-3 rounded-md font-bold hover:bg-white/80 transition flex items-center space-x-2 shadow-xl"
          >
            <span className="text-xl">▶</span> <span>Apply Now</span>
          </button>
          <button className="bg-gray-500/60 text-white px-6 md:px-10 py-3 rounded-md font-bold hover:bg-gray-500/40 backdrop-blur-md transition flex items-center space-x-2 shadow-xl">
            <span className="text-lg">ⓘ</span> <span>More Info</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent"></div>
    </header>

    {/* Content Rows */}
    <main className="relative z-40 pb-20 space-y-12 bg-netflix-black">
      <JobRow title="Trending on JobFlix" jobs={trendingJobs.length > 0 ? trendingJobs : Array(6).fill({})} onJobClick={setSelectedJob} />
      <JobRow title="Remote Opportunities" jobs={remoteJobs.length > 0 ? remoteJobs : Array(6).fill({})} onJobClick={setSelectedJob} />
      <JobRow title="Global Tech Leaders" jobs={trendingJobs.length > 0 ? [...trendingJobs].reverse() : Array(6).fill({})} onJobClick={setSelectedJob} />
    </main>
  </div>
);

const App = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [remoteJobs, setRemoteJobs] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const t = await axios.get(`${API_URL}/api/jobs/trending`);
        const r = await axios.get(`${API_URL}/api/jobs/remote`);
        setTrendingJobs(t.data);
        setRemoteJobs(r.data);
      } catch (e) { console.error(e); }
    };
    fetchJobs();
  }, [API_URL]);

  const handleApply = async (jobId) => {
    try {
      await axios.post(`${API_URL}/api/applications/apply`, { job_id: jobId, user_id: 1 });
      alert("Application successful!");
      setSelectedJob(null);
    } catch (e) { alert("Already applied or error occurred"); }
  };

  return (
    <Router>
      <div className="min-h-screen bg-netflix-black text-white overflow-x-hidden selection:bg-netflix-red selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <HomePage 
              trendingJobs={trendingJobs} 
              remoteJobs={remoteJobs} 
              setSelectedJob={setSelectedJob} 
              handleApply={handleApply} 
            />
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/remote" element={<div className="pt-32 px-12 text-center text-2xl">Remote Jobs Page Coming Soon</div>} />
          <Route path="/trending" element={<div className="pt-32 px-12 text-center text-2xl">Trending Jobs Page Coming Soon</div>} />
          <Route path="/applications" element={<div className="pt-32 px-12 text-center text-2xl">My Applications Page Coming Soon</div>} />
        </Routes>

        <JobModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          onApply={handleApply} 
        />

        {/* Global Footer */}
        <footer className="bg-netflix-black border-t border-white/10 px-6 md:px-12 py-10 text-gray-500 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="space-y-3">
              <p className="hover:underline cursor-pointer">Help Center</p>
              <p className="hover:underline cursor-pointer">Terms of Use</p>
            </div>
            <div className="space-y-3">
              <p className="hover:underline cursor-pointer">Privacy</p>
              <p className="hover:underline cursor-pointer">Cookie Preferences</p>
            </div>
          </div>
          <p className="mt-10 text-center">© 2024-2026 JobFlix, Inc.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
