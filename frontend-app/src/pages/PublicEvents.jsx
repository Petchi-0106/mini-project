import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock, Search, ArrowLeft, Send, Sparkles } from 'lucide-react';

const SAMPLE_EVENTS = [
  { id: 's1', eventName: 'AI Research Summit', eventLocation: 'Main Auditorium', eventDate: '2024-10-10', eventDescription: 'A global gathering of researchers to discuss the future of Artificial Intelligence and its impacts.', facultyId: 'SYSTEM' },
  { id: 's2', eventName: 'Code Hackathon 2024', eventLocation: 'Computer Lab 102', eventDate: '2024-11-05', eventDescription: '24-hour non-stop coding battle to build innovative solutions for urban problems.', facultyId: 'SYSTEM' },
  { id: 's3', eventName: 'Cyber Security Seminar', eventLocation: 'Conference Hall B', eventDate: '2024-10-22', eventDescription: 'Learn advanced threat mitigation techniques from industry experts.', facultyId: 'SYSTEM' },
  { id: 's4', eventName: 'Robotics Workshop', eventLocation: 'Indoor Sports Complex', eventDate: '2024-10-15', eventDescription: 'Hands-on experience in building and programming autonomous robots.', facultyId: 'SYSTEM' },
  { id: 's5', eventName: 'Data Science Bootcamp', eventLocation: 'Seminar Hall 3', eventDate: '2024-11-12', eventDescription: 'Intensive training on Python, Pandas, and Scikit-Learn.', facultyId: 'SYSTEM' },
  { id: 's6', eventName: 'Startup Pitch Fest', eventLocation: 'Innovation Center', eventDate: '2024-12-01', eventDescription: 'Pitch your business ideas and get feedback from venture capitalists.', facultyId: 'SYSTEM' },
  { id: 's7', eventName: 'Cloud Expo', eventLocation: 'IT Center Lounge', eventDate: '2024-10-28', eventDescription: 'Showcasing the latest advancements in Azure and AWS technologies.', facultyId: 'SYSTEM' },
  { id: 's8', eventName: 'Blockchain Tech Talk', eventLocation: 'Room 305', eventDate: '2024-11-18', eventDescription: 'Understanding decentralized systems and smart contracts.', facultyId: 'SYSTEM' },
  { id: 's9', eventName: 'Mobile App Contest', eventLocation: 'Creative Studio', eventDate: '2024-12-05', eventDescription: 'Design the best user experience for a cross-platform mobile app.', facultyId: 'SYSTEM' },
  { id: 's10', eventName: 'Open Source Day', eventLocation: 'General Lab 1', eventDate: '2024-10-30', eventDescription: 'Learn how to contribute effectively to global GitHub repositories.', facultyId: 'SYSTEM' },
  { id: 's11', eventName: 'Future of IoT', eventLocation: 'Virtual Reality Lab', eventDate: '2024-11-25', eventDescription: 'Investigating how smart devices will reshape our cities.', facultyId: 'SYSTEM' },
  { id: 's12', eventName: 'Student Expo', eventLocation: 'Main Campus Plaza', eventDate: '2024-12-15', eventDescription: 'A fair showcasing student creativity and innovation.', facultyId: 'SYSTEM' },
  { id: 's13', eventName: 'Digital Marketing', eventLocation: 'Media Room 2', eventDate: '2024-10-18', eventDescription: 'Workshop on SEO, SEM, and social media analytics.', facultyId: 'SYSTEM' },
  { id: 's14', eventName: 'ByteCode Contest', eventLocation: 'Lab 2', eventDate: '2024-11-20', eventDescription: 'Solve complex algorithmic challenges in record time.', facultyId: 'SYSTEM' },
  { id: 's15', eventName: 'Tech Career Fair', eventLocation: 'Placement Cell Hall', eventDate: '2024-12-10', eventDescription: 'Meet recruiters from top MNCs and secure your dream job.', facultyId: 'SYSTEM' }
];

const PublicEvents = ({ setView, user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPublicEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8082/api/events/public/all');
        const dbEvents = res.data;
        // Merge real DB events with our sample events for a full, beautiful portal!
        const merged = [...dbEvents, ...SAMPLE_EVENTS];
        // Remove duplicates if same event name exists in DB
        const unique = merged.filter((v,i,a)=>a.findIndex(v2=>(v2.eventName===v.eventName))===i);
        setEvents(unique);
      } catch (err) {
        setEvents(SAMPLE_EVENTS);
      } finally { setLoading(false); }
    };
    fetchPublicEvents();
  }, []);

  const handleSelfRegister = async (event) => {
     if (!user || user.type !== 'student') { alert("Register and log in as a student to participate!"); return; }
     if (window.confirm(`Register for ${event.eventName}?`)) {
        try {
            await axios.post('http://localhost:8082/api/events/public/register', {
               studentName: user.name, studentRollNumber: user.rollNumber,
               eventName: event.eventName, eventLocation: event.eventLocation,
               eventDate: event.eventDate, eventDescription: event.eventDescription,
               facultyId: "STUDENT_SELF"
            }, { headers: { Authorization: `Bearer ${user.token}` } });
           alert("Registered successfully!");
        } catch { alert("Failed to register."); }
     }
  };

  const filtered = events.filter(e => e.eventName.toLowerCase().includes(search.toLowerCase()) || e.eventLocation.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-['Inter']">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-up">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Academic <span className="text-indigo-600">Events</span></h1>
            <p className="text-slate-500 font-medium mt-1">Found {filtered.length} activities happening on campus</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search event or location..." className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium" onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event, idx) => (
            <div key={event.id || idx} className="bg-white rounded-[2.5rem] p-2 shadow-2xl shadow-indigo-100/20 card-hover group animate-fade-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="bg-slate-900 rounded-[2.2rem] p-8 pb-10 text-white relative h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                    <Sparkles size={12} /> Campus Event
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight uppercase tracking-tighter">{event.eventName}</h3>
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3 text-slate-300">
                        <MapPin size={16} className="text-indigo-400" />
                        <span className="text-sm font-black uppercase tracking-widest">{event.eventLocation}</span>
                     </div>
                     <div className="flex items-center gap-3 text-slate-300">
                        <Calendar size={16} className="text-violet-400" />
                        <span className="text-sm font-bold">{event.eventDate}</span>
                     </div>
                  </div>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-10 line-clamp-3 italic bg-white/5 p-4 rounded-2xl border border-white/5 tracking-tight">
                    {event.eventDescription}
                  </p>
                </div>
                <button onClick={() => handleSelfRegister(event)} className="w-full py-4 btn-primary text-white rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 group/btn">
                  Participate Now <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicEvents;
