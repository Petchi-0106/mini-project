import React from 'react';
import { MapPin, CheckCircle2, Calendar, FileText, BookOpen, Send, Sparkles } from 'lucide-react';

const StudentDashboard = ({ events, user, setView }) => (
  <div className="bg-slate-50 min-h-screen pt-24 pb-16 font-['Inter']">
    <div className="max-w-4xl mx-auto px-8">

      {/* Hero Welcome Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[3rem] p-12 text-white mb-16 shadow-2xl relative overflow-hidden animate-fade-up">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full blur-2xl -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
               <Sparkles size={12} className="text-indigo-400" /> Academic Overview
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-2">Hello, {user?.name || 'Student'}!</h1>
            <p className="text-indigo-100 font-medium text-lg leading-relaxed max-w-lg">
              Manage your participations and discover exciting new academic activities on campus.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 text-center min-w-[200px]">
             <p className="text-4xl font-black mb-1">{events.length}</p>
             <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest">Total Participations</p>
          </div>
        </div>
      </div>

      {/* Discovery Section (Requested Feature) */}
      <div className="mb-16 animate-fade-up delay-100">
         <div className="flex items-center justify-between mb-8 px-2">
            <div>
               <h2 className="text-2xl font-black text-slate-800 tracking-tight">Browse New Opportunities</h2>
               <p className="text-slate-400 font-medium text-sm">Find events you haven't registered for yet</p>
            </div>
            <button 
              onClick={() => setView('public-events')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-100 flex items-center gap-2"
            >
               View All Available Events <Send size={16} />
            </button>
         </div>

         <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center shrink-0">
               <Calendar size={40} className="text-indigo-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-xl font-black text-slate-800 mb-2">Discover Academic Events</h3>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Browse a curated list of workshops, hackathons, seminars, and other opportunities. You can self-register for any event with just one click!
               </p>
            </div>
            <button 
              onClick={() => setView('public-events')}
              className="px-8 py-5 border-2 border-indigo-100 text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all uppercase text-xs tracking-widest"
            >
               Browse Now
            </button>
         </div>
      </div>

      {/* Participation Timeline Section */}
      <div className="animate-fade-up delay-200">
        <div className="mb-8 px-2">
           <h2 className="text-2xl font-black text-slate-800 tracking-tight">My Participation Timeline</h2>
           <p className="text-slate-400 font-medium text-sm">A list of all events you have attended or registered for</p>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-24 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BookOpen size={36} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Participations Yet</p>
            <p className="text-slate-300 text-sm font-medium mt-1">Discover new events using the section above to start your journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {events.map((event, idx) => (
              <div 
                key={event.id} 
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 card-hover group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Date Box */}
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[1.5rem] flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-80 mb-0.5">
                      {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { month: 'short' }) : 'N/A'}
                    </span>
                    <span className="text-3xl font-black leading-none">
                      {event.eventDate ? new Date(event.eventDate).getDate() : '--'}
                    </span>
                  </div>

                  {/* Info Box */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                       <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">
                         {event.eventName}
                       </h3>
                       <div className="flex items-center gap-2">
                         <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                           <CheckCircle2 size={12} /> Confirmed
                         </span>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-bold tracking-tight mb-6">
                       <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-indigo-400" /> {event.eventLocation}
                       </div>
                       <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-violet-400" />
                          {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Date TBD'}
                       </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-indigo-500">
                       <p className="text-slate-500 font-medium italic text-sm leading-relaxed line-clamp-2">
                         {event.eventDescription}
                       </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
                       <FileText size={12} /> RECORD_ID: {event.id.slice(-8)} · ORIGIN: {event.facultyId}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default StudentDashboard;
