import React from 'react';
import { Plus, Search, Edit3, Trash2, MapPin, Clock, Calendar, FileText, User } from 'lucide-react';

const FacultyDashboard = ({ events, selectedMonth, setSelectedMonth, fetchByMonth, setShowModal, setFormData, setSelectedEvent, handleDeleteEvent }) => {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="bg-mesh min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-fade-up">
          <div>
            <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-2">Faculty Dashboard</p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Event Management</h1>
            <p className="text-slate-400 font-medium mt-1">{events.length} records found</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Month Filter */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm">
              <Calendar size={16} className="text-slate-400" />
              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(Number(e.target.value))}
                className="bg-transparent font-bold text-sm text-slate-700 outline-none pr-2"
              >
                {months.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
              </select>
              <button onClick={fetchByMonth} className="btn-primary px-4 py-2 rounded-xl text-white text-xs font-black flex items-center gap-1.5">
                <Search size={13} /> Filter
              </button>
            </div>
            <button
              onClick={() => { setFormData({}); setShowModal('add'); }}
              className="btn-primary px-6 py-3 text-white rounded-2xl font-black flex items-center gap-2 text-sm"
            >
              <Plus size={18} /> Add Record
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-fade-up delay-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">#</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Student</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Event Name</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Location</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Date</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Description</th>
                  <th className="text-left px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <FileText size={28} className="text-slate-200" />
                      </div>
                      <p className="text-slate-300 font-black uppercase tracking-widest text-sm">No Records Found</p>
                      <p className="text-slate-300 text-xs mt-1 font-medium">Add your first event record above</p>
                    </td>
                  </tr>
                ) : events.map((event, idx) => (
                  <tr key={event.id} className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">{idx + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                          <User size={15} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{event.studentName}</p>
                          <p className="text-xs text-indigo-500 font-bold">{event.studentRollNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 text-sm">{event.eventName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin size={13} className="text-indigo-400" /> {event.eventLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock size={13} className="text-violet-400" />
                        {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[180px]">
                      <p className="text-xs text-slate-400 font-medium italic line-clamp-2">{event.eventDescription}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setSelectedEvent(event); setFormData(event); setShowModal('edit'); }}
                          className="w-8 h-8 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center hover:bg-amber-100 transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="w-8 h-8 bg-red-50 border border-red-100 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
