import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    alert('Login successful!');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' }}>
      <div className="w-full max-w-md bg-black/75 p-12 rounded-md shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full bg-[#333] border-none rounded p-4 text-white placeholder-gray-400 focus:bg-[#454545] outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full bg-[#333] border-none rounded p-4 text-white placeholder-gray-400 focus:bg-[#454545] outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-netflix-red py-4 rounded font-bold hover:bg-red-700 transition shadow-lg active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-gray-400 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="accent-netflix-red" />
            <span>Remember me</span>
          </label>
          <span className="hover:underline cursor-pointer">Need help?</span>
        </div>
        <div className="mt-12 text-gray-500">
          New to JobFlix? <span className="text-white hover:underline cursor-pointer">Sign up now.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
