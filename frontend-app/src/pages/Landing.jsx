import React from 'react';
import { GraduationCap, User, Calendar, Mail, Lock, ArrowRight } from 'lucide-react';

const Landing = ({ setRole, setView, setFormData, formData, handleLogin, role, error }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start font-['Inter'] overflow-hidden">
      {/* Background with Blur Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')` }}
      />
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10" />
      
      {/* Top Header Section (Dark Blue Gradient) */}
      <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900/95 to-transparent pt-12 pb-20 flex flex-col items-center">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20 mb-4 animate-float">
          <GraduationCap size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-[0.2em] border-b-2 border-white/30 pb-2">
          ACADEMIC PORTAL
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-xl px-6 -mt-16 animate-fade-up">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Academic Portal</h2>
          <p className="text-white/70 font-medium">Please log in to your account</p>
        </div>

        {/* Role Selection Cards (Match Image Colors) */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* Student Panel */}
          <button 
            onClick={() => setRole('student')}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all border-b-4 ${role === 'student' ? 'bg-blue-600 scale-105 border-blue-800 shadow-2xl' : 'bg-blue-500/80 hover:bg-blue-600 border-blue-700'}`}
          >
            <GraduationCap size={32} className="text-white mb-3" />
            <span className="text-xs font-black text-white uppercase tracking-tighter">Student Login</span>
          </button>

          {/* Faculty Panel */}
          <button 
            onClick={() => setRole('faculty')}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all border-b-4 ${role === 'faculty' ? 'bg-orange-600 scale-105 border-orange-800 shadow-2xl' : 'bg-orange-500/80 hover:bg-orange-600 border-orange-700'}`}
          >
            <User size={32} className="text-white mb-3" />
            <span className="text-xs font-black text-white uppercase tracking-tighter">Faculty Login</span>
          </button>

          {/* Event Panel (Public Access) */}
          <button 
            onClick={() => setView('public-events')}
            className="flex flex-col items-center justify-center p-6 bg-green-500/80 hover:bg-green-600 rounded-2xl transition-all border-b-4 border-green-700"
          >
            <Calendar size={32} className="text-white mb-3" />
            <span className="text-xs font-black text-white uppercase tracking-tighter">Event Portal</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-white/20 flex-1" />
          <span className="text-white/60 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Or, Sign in to your account</span>
          <div className="h-px bg-white/20 flex-1" />
        </div>

        {/* Login Form (Matches Image Appearance) */}
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Username or Email"
              className="w-full bg-white px-12 py-4 rounded-xl font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/20 transition-all border-none"
              onChange={e => setFormData({...formData, [role === 'faculty' ? 'facultyId' : 'rollNumber']: e.target.value})}
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-white px-12 py-4 rounded-xl font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/20 transition-all border-none"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 text-white/80 text-sm font-medium cursor-pointer">
              <input type="checkbox" className="rounded-md accent-blue-600" />
              Remember Me
            </label>
            <button className="text-white/80 text-sm font-medium hover:text-white transition-colors underline underline-offset-4">
              Forgot Password?
            </button>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full py-5 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white rounded-xl font-black text-lg shadow-2xl transition-all active:scale-[0.98] uppercase tracking-widest mt-6"
          >
            Login
          </button>
        </div>

        {/* Footer Support */}
        <div className="mt-12 mb-8 text-center">
          <button className="text-white/60 text-sm font-medium hover:text-white transition-colors">
            Need Help? Contact Support
          </button>
          <div className="mt-6">
            <button onClick={() => setView('register')} className="text-white bg-white/10 px-6 py-2 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              Create New Account <ArrowRight size={12} className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
