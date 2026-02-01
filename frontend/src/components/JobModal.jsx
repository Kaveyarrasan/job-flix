import React from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

const JobModal = ({ job, onClose, onApply }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="relative w-full max-w-3xl bg-netflix-black rounded-lg overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-50 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        >
          <X size={24} />
        </button>

        <div className="h-64 w-full relative">
          <img 
            src={job.logo_url || 'https://via.placeholder.com/800x450'} 
            className="w-full h-full object-cover"
            alt={job.title}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-netflix-black to-transparent">
            <h2 className="text-4xl font-bold">{job.title}</h2>
          </div>
        </div>

        <div className="p-8 grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-4 text-sm font-semibold">
              <span className="text-green-500">98% Match</span>
              <span className="text-gray-400">2024</span>
              <span className="border border-gray-600 px-1 text-[10px]">HD</span>
            </div>
            <p className="text-lg leading-relaxed">
              {job.description || "Join a fast-growing team and work on cutting-edge technologies. This is a great opportunity for a career-oriented professional."}
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div><span className="text-gray-500">Company:</span> {job.company}</div>
            <div><span className="text-gray-500">Location:</span> {job.location || "Remote"}</div>
            <div><span className="text-gray-500">Category:</span> {job.category}</div>
            <button 
              onClick={() => onApply(job.id)}
              className="w-full bg-white text-black py-3 rounded font-bold flex items-center justify-center space-x-2 hover:bg-opacity-80 transition"
            >
              <Play fill="black" size={20} />
              <span>Apply Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
