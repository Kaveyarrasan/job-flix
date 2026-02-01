import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobRow = ({ title, jobs, onJobClick }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 px-12 py-4 group">
      <h2 className="text-xl font-semibold text-gray-200 group-hover:text-white transition cursor-pointer">
        {title}
      </h2>
      
      <div className="relative">
        <ChevronLeft 
          className="absolute left-[-40px] top-0 bottom-0 m-auto h-12 w-12 cursor-pointer opacity-0 group-hover:opacity-100 transition hover:scale-125 z-40"
          onClick={() => scroll('left')}
        />
        
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-hidden scrollbar-hide py-2"
        >
          {jobs.map((job) => (
            <div 
              key={job.id}
              onClick={() => onJobClick(job)}
              className="min-w-[300px] h-[168px] bg-gray-800 rounded-md overflow-hidden relative cursor-pointer transform transition duration-300 hover:scale-110 hover:z-50 shadow-lg"
            >
              <img 
                src={job.logo_url || 'https://via.placeholder.com/300x168'} 
                alt={job.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="font-bold text-sm truncate">{job.title}</p>
                <p className="text-xs text-gray-400 font-medium">{job.company}</p>
              </div>
            </div>
          ))}
        </div>

        <ChevronRight 
          className="absolute right-[-40px] top-0 bottom-0 m-auto h-12 w-12 cursor-pointer opacity-0 group-hover:opacity-100 transition hover:scale-125 z-40"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
};

export default JobRow;
