import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Remote', path: '/remote' },
    { name: 'Trending', path: '/trending' },
    { name: 'My Applications', path: '/applications' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${
        isScrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="flex items-center space-x-4 md:space-x-10">
        <Link to="/" className="text-netflix-red text-2xl md:text-3xl font-black tracking-tighter">
          JOBFLIX
        </Link>
        
        <ul className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path}
                className={`text-sm transition-colors hover:text-gray-300 ${
                  location.pathname === link.path ? 'font-bold text-white' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-5">
        <Search className="w-5 h-5 cursor-pointer hidden sm:block" />
        <Bell className="w-5 h-5 cursor-pointer hidden sm:block" />
        <Link to="/login" className="flex items-center space-x-2 bg-netflix-red px-4 py-1.5 rounded-sm text-sm font-bold hover:bg-red-700 transition">
          <User className="w-4 h-4" />
          <span>Login</span>
        </Link>
        <button 
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-netflix-black border-t border-white/10 flex flex-col p-6 lg:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-lg border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
