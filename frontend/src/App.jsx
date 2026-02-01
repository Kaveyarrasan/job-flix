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
    <div className="min-h-screen bg-netflix-black text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-12 py-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-3xl font-bold tracking-tighter">JOBFLIX</h1>
          <ul className="flex space-x-4 text-sm font-light">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">Remote</li>
            <li className="hover:text-gray-300 cursor-pointer">Trending</li>
            <li className="hover:text-gray-300 cursor-pointer">My Applications</li>
          </ul>
        </div>
        <div className="flex items-center space-x-6">
          <Search size={20} className="cursor-pointer" />
          <Bell size={20} className="cursor-pointer" />
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center cursor-pointer">
            <User size={20} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full bg-cover bg-center flex items-center px-12" style={{ backgroundImage: 'linear-gradient(to right, #141414, transparent), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' }}>
        <div className="max-w-2xl space-y-4">
          <h2 className="text-5xl font-bold italic">Top Pick for You</h2>
          <h3 className="text-4xl font-extrabold">Senior Full Stack Developer</h3>
          <p className="text-lg text-gray-300">
            Join the team at **CloudScale** and lead the architectural design of our next-gen cloud platform. 
            Competitive salary, remote-first, and premium health benefits.
          </p>
          <div className="flex space-x-3 pt-4">
            <button className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-opacity-80 transition flex items-center">
              Apply Now
            </button>
            <button className="bg-gray-500 bg-opacity-50 text-white px-8 py-2 rounded font-bold hover:bg-opacity-40 transition">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Job Rows */}
      <div className="-mt-32 pb-20 relative z-40">
        <JobRow title="Trending Jobs" jobs={trendingJobs} onJobClick={setSelectedJob} />
        <JobRow title="Remote Opportunities" jobs={remoteJobs} onJobClick={setSelectedJob} />
      </div>

      <JobModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
        onApply={handleApply}
      />
    </div>
  );
};

export default App;
