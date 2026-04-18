import React from 'react';
import { Calendar, LogOut, User } from 'lucide-react';

const Navbar = ({ user, handleLogout, setView, setRole }) => (
  <nav className="glass fixed top-0 w-full z-50 h-18">
    <div className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between py-4">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
        <div className="w-10 h-10 btn-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Calendar size={20} />
        </div>
        <div>
          <span className="text-lg font-black tracking-tight text-slate-900">Event</span>
          <span className="text-lg font-black tracking-tight gradient-text">Hub</span>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-slate-100">
            <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
              <User size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800 leading-none">{user.name || user.rollNumber || user.facultyId}</p>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">{user.type}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 rounded-2xl text-sm font-bold hover:bg-red-100 transition-all border border-red-100"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
           <button
             onClick={() => { setRole('student'); setView('landing'); }}
             className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
           >
             Student Portal
           </button>
           <button
             onClick={() => { setRole('faculty'); setView('landing'); }}
             className="px-6 py-2.5 btn-primary text-white rounded-2xl text-sm font-bold"
           >
             Faculty Access
           </button>
        </div>
      )}
    </div>
  </nav>
);

export default Navbar;
