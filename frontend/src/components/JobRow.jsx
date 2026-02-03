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
    <section className="space-y-4 px-4 md:px-12 py-4 group font-sans">
      <h2 className="text-xl md:text-2xl font-black text-gray-800 group-hover:text-black transition-colors cursor-pointer inline-flex items-center group/title uppercase tracking-wider font-poppins">
        {title} 
        <span className="ml-3 text-netflix-red opacity-0 -translate-x-4 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-500 text-sm font-bold font-poppins">Explore All ›</span>
      </h2>
      
      <div className="relative">
        <button 
          aria-label="Scroll Left"
          className="absolute left-0 top-0 bottom-0 m-auto h-full w-12 md:w-16 bg-white/60 hover:bg-white/90 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 z-40 flex items-center justify-center text-gray-800 border-r border-gray-100 backdrop-blur-sm"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 transform hover:scale-125 transition-transform" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto md:overflow-x-hidden scrollbar-hide py-6 snap-x snap-mandatory group/row"
        >
          {jobs.map((job, idx) => {
            const isEmpty = !job.id;
            const placeholderImg = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=320&h=180&sig=${idx + (title.length)}`;
            
            return (
              <div 
                key={job.id || idx}
                onClick={() => !isEmpty && onJobClick(job)}
                role="button"
                className={`snap-start min-w-[240px] md:min-w-[320px] aspect-video rounded-md overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-50 shadow-lg group/card 
                  ${isEmpty ? 'animate-pulse bg-gray-100' : 'hover:shadow-2xl border border-gray-100'}
                  group-hover/row:opacity-70 hover:!opacity-100`}
              >
                <img 
                  src={job.logo_url || placeholderImg} 
                  alt=""
                  className={`w-full h-full object-cover transition-all duration-700 brightness-105 group-hover/card:brightness-110 ${isEmpty ? 'opacity-20 grayscale' : 'opacity-100'}`}
                />
                
                {/* Lighter Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 transition-opacity duration-300"></div>
                
                <div className={`absolute inset-0 flex flex-col justify-end p-4 md:p-6 transition-all duration-500 ${isEmpty ? 'opacity-40' : 'opacity-0 group-hover/card:opacity-100'}`}>
                  {!isEmpty ? (
                    <div className="text-white">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="bg-netflix-red text-[10px] font-black px-1.5 py-0.5 rounded-sm font-poppins">HOT</span>
                        <span className="text-green-400 text-[10px] font-bold">98% Match</span>
                      </div>
                      <p className="font-black text-sm md:text-lg leading-tight uppercase tracking-tight font-poppins">{job.title}</p>
                      <p className="text-[10px] md:text-xs text-gray-200 font-bold mt-1 uppercase opacity-90">{job.company}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  )}
                </div>
                
                {/* Mobile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:hidden bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-black text-[10px] truncate uppercase tracking-tighter text-white">{job.title || "Searching..."}</p>
                  <p className="text-[8px] text-gray-300 font-bold">{job.company || "JobFlix"}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          aria-label="Scroll Right"
          className="absolute right-0 top-0 bottom-0 m-auto h-full w-12 md:w-16 bg-white/60 hover:bg-white/90 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 z-40 flex items-center justify-center text-gray-800 border-l border-gray-100 backdrop-blur-sm"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12 transform hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default JobRow;
