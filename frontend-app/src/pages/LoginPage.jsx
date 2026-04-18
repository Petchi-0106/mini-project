import React from 'react';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

const LoginPage = ({ role, formData, setFormData, setView, handleLogin, error }) => (
  <div className="bg-mesh min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
    <div className="w-full max-w-md animate-scale-in">

      {/* Top badge */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4 ${role === 'faculty' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-violet-50 text-violet-600 border border-violet-100'}`}>
          <Sparkles size={12} /> {role === 'faculty' ? 'Faculty Portal' : 'Student Portal'}
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-slate-400 font-medium mt-2">Sign in to access your dashboard</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-8">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold mb-6">
            <AlertCircle size={16} className="shrink-0" /> {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.18em] mb-2">
              {role === 'faculty' ? 'Faculty ID' : 'Roll Number'}
            </label>
            <input
              type="text"
              placeholder={role === 'faculty' ? 'e.g. F001' : 'e.g. 21CS001'}
              className="input-field w-full p-4 rounded-2xl border border-slate-200 font-medium text-slate-800 placeholder-slate-300"
              onChange={e => setFormData({ ...formData, [role === 'faculty' ? 'facultyId' : 'rollNumber']: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.18em] mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field w-full p-4 rounded-2xl border border-slate-200 font-medium text-slate-800"
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 mt-2">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <span className="text-sm text-slate-400 font-medium">Don't have an account? </span>
          <button onClick={() => setView('register')} className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors underline underline-offset-2">
            Register Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
