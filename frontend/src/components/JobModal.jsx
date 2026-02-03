import React from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

const JobModal = ({ job, onClose, onApply }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl animate-scaleIn">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-50 bg-white/90 text-gray-900 p-2 rounded-full hover:bg-white shadow-md transition-all border border-gray-100"
        >
          <X size={24} />
        </button>

        <div className="h-72 w-full relative">
          <img 
            src={job.logo_url || 'https://via.placeholder.com/800x450'} 
            className="w-full h-full object-cover"
            alt={job.title}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white to-transparent">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-netflix-red text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase font-poppins">Featured</span>
              <span className="text-gray-600 text-xs font-bold uppercase tracking-widest font-poppins">{job.company}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter drop-shadow-sm font-poppins">{job.title}</h2>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 text-sm font-bold">
              <span className="text-green-600">98% Match</span>
              <span className="text-gray-400">2024</span>
              <span className="border border-gray-300 px-1.5 py-0.5 text-[10px] text-gray-500 rounded font-poppins">FULL TIME</span>
              <span className="text-netflix-red">Remote</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 font-medium font-sans">
              {job.description || "Join a fast-growing team and work on cutting-edge technologies. This is a great opportunity for a career-oriented professional looking to make a global impact."}
            </p>
          </div>

          <div className="space-y-6 text-sm border-l border-gray-100 pl-0 md:pl-8">
            <div className="space-y-3">
              <p><span className="text-gray-400 uppercase font-bold text-[10px] block mb-1 tracking-widest font-poppins">Company</span> <span className="text-gray-900 font-bold text-lg font-poppins">{job.company}</span></p>
              <p><span className="text-gray-400 uppercase font-bold text-[10px] block mb-1 tracking-widest font-poppins">Location</span> <span className="text-gray-900 font-bold">{job.location || "Remote"}</span></p>
              <p><span className="text-gray-400 uppercase font-bold text-[10px] block mb-1 tracking-widest font-poppins">Category</span> <span className="text-gray-900 font-bold">{job.category}</span></p>
            </div>
            
            <button 
              onClick={() => onApply(job.id)}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl active:scale-95 font-poppins"
            >
              <Play fill="white" size={20} />
              <span>Apply Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
