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
    <section className="space-y-2 px-4 md:px-12 py-4 group">
      <h2 className="text-lg md:text-2xl font-bold text-gray-200 group-hover:text-white transition-colors cursor-pointer inline-flex items-center group/title">
        {title} 
        <span className="ml-2 text-netflix-red opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-sm">Explore All ›</span>
      </h2>
      
      <div className="relative">
        <button 
          aria-label="Scroll Left"
          className="absolute left-[-20px] md:left-[-40px] top-0 bottom-0 m-auto h-12 w-10 md:w-12 bg-black/20 hover:bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-40 rounded-r-md backdrop-blur-sm hidden md:flex items-center justify-center"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex space-x-2 md:space-x-3 overflow-x-auto md:overflow-x-hidden scrollbar-hide py-4 snap-x snap-mandatory"
        >
          {jobs.map((job) => (
            <div 
              key={job.id}
              onClick={() => onJobClick(job)}
              role="button"
              aria-label={`View details for ${job.title} at ${job.company}`}
              className="snap-start min-w-[200px] md:min-w-[320px] aspect-video bg-gray-900 rounded-md overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-50 shadow-2xl ring-1 ring-white/5 hover:ring-white/20"
            >
              <img 
                src={job.logo_url || 'https://via.placeholder.com/320x180'} 
                alt=""
                className="w-full h-full object-cover transition-opacity duration-300 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-3 md:p-5 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="font-black text-xs md:text-base leading-tight uppercase">{job.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-netflix-red text-[10px] font-bold">New</span>
                  <p className="text-[10px] md:text-xs text-gray-300 font-medium">{job.company}</p>
                </div>
              </div>
              {/* Static view for mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-2 md:hidden bg-gradient-to-t from-black to-transparent">
                <p className="font-bold text-[10px] truncate uppercase">{job.title}</p>
                <p className="text-[8px] text-gray-400">{job.company}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          aria-label="Scroll Right"
          className="absolute right-[-20px] md:right-[-40px] top-0 bottom-0 m-auto h-12 w-10 md:w-12 bg-black/20 hover:bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-40 rounded-l-md backdrop-blur-sm hidden md:flex items-center justify-center"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default JobRow;
