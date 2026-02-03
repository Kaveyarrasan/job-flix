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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 font-sans" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070")' }}>
      <div className="w-full max-w-md bg-white p-12 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-black mb-8 text-gray-900 uppercase tracking-tighter font-poppins">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-900 outline-none transition font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-900 outline-none transition font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-black uppercase tracking-widest hover:bg-black transition shadow-xl active:scale-[0.98] font-poppins"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-gray-500 text-sm font-medium">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="accent-gray-900" />
            <span>Remember me</span>
          </label>
          <span className="hover:text-black cursor-pointer">Need help?</span>
        </div>
        <div className="mt-12 text-gray-400 font-medium">
          New to JobFlix? <span className="text-gray-900 font-bold hover:underline cursor-pointer">Sign up now.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
