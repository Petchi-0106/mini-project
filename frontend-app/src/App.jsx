import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import RegisterPage from './pages/RegisterPage';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import PublicEvents from './pages/PublicEvents';
import { X, Plus } from 'lucide-react';

const API = {
  faculty: 'http://localhost:8082/api/faculty',
  student: 'http://localhost:8082/api/student',
  event:   'http://localhost:8082/api/events'
};

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [role, setRole] = useState('student');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [formData, setFormData] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(null);

  // Clear errors and form data when switching views
  useEffect(() => {
    setError(null);
    setFormData({});
  }, [view, role]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u); setRole(u.type); setView('dashboard');
      fetchData(u);
    }
  }, []);

  const fetchData = async (u) => {
    try {
      if (u.type === 'faculty') {
        const r = await axios.get(`${API.event}/faculty/all`, { headers: { Authorization: `Bearer ${u.token}` } });
        setEvents(r.data);
      } else {
        const r = await axios.get(`${API.student}/events/${u.rollNumber}`, { headers: { Authorization: `Bearer ${u.token}` } });
        setEvents(r.data);
      }
    } catch (e) { 
      console.error('Fetch Error:', e); 
      setError('Could not fetch events. Please ensure services are running.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setError(null);
    try {
      console.log(`Logging in as ${role}...`, formData);
      const r = await axios.post(`${API[role]}/login`, formData);
      const u = { type: role, ...r.data };
      setUser(u); localStorage.setItem('user', JSON.stringify(u));
      setView('dashboard'); fetchData(u);
    } catch (err) { 
      console.error('Login Error:', err);
      setError(err.response?.data || 'Invalid credentials. Check ID/Roll and Password.'); 
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log(`Registering as ${role}...`, formData);
      const response = await axios.post(`${API[role]}/register`, formData);
      console.log('Registration Success:', response.data);
      alert('Success! Redirecting to login...');
      setView('landing');
    } catch (err) {
      console.error('Registration Error:', err);
      const msg = typeof err.response?.data === 'string' 
        ? err.response.data 
        : (err.response?.data?.message || 'Connection failed. Please check if backend services are running.');
      setError(msg);
    }
  };

  const handleLogout = () => { localStorage.removeItem('user'); setUser(null); setRole('student'); setView('landing'); setEvents([]); setError(null); };

  return (
    <div className="min-h-screen">
      {view !== 'landing' && <Navbar user={user} handleLogout={handleLogout} setView={setView} setRole={setRole} />}
      
      {view === 'landing' && (
        <Landing 
          setRole={setRole} 
          setView={setView} 
          setFormData={setFormData} 
          formData={formData} 
          handleLogin={handleLogin} 
          role={role} 
          error={error} 
        />
      )}
      
      {view === 'register' && (
        <RegisterPage 
          role={role} 
          setView={setView} 
          setFormData={setFormData} 
          formData={formData} 
          handleRegister={handleRegister} 
          error={error} 
        />
      )}

      {view === 'public-events' && <PublicEvents setView={setView} user={user} />}
      
      {view === 'dashboard' && role === 'faculty' && (
        <FacultyDashboard 
          events={events} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          fetchByMonth={async ()=>{try{const r=await axios.get(`${API.event}/month/${selectedMonth}`,{headers:{Authorization:`Bearer ${user.token}`}});setEvents(r.data);}catch{setError('Not found');}}} 
          setShowModal={setShowModal} setFormData={setFormData} setSelectedEvent={setSelectedEvent} 
          handleDeleteEvent={async (id)=>{if(!window.confirm('Delete?'))return; try{await axios.delete(`${API.event}/${id}`,{headers:{Authorization:`Bearer ${user.token}`}});fetchData(user);}catch{setError('Error');}}} 
        />
      )}
      
      {view === 'dashboard' && role === 'student' && <StudentDashboard events={events} user={user} setView={setView} />}

      {/* Modal for Faculty crud... */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-10 animate-scale-in">
             <div className="flex justify-between mb-8">
               <h2 className="text-2xl font-black">{showModal === 'add' ? 'New Entry' : 'Update'}</h2>
               <button onClick={()=>setShowModal(null)}><X /></button>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <input className="p-4 bg-slate-50 rounded-xl" placeholder="Name" value={formData.studentName || ''} onChange={e=>setFormData({...formData, studentName:e.target.value})} />
               <input className="p-4 bg-slate-50 rounded-xl" placeholder="Roll No" value={formData.studentRollNumber || ''} onChange={e=>setFormData({...formData, studentRollNumber:e.target.value})} />
               <input className="p-4 bg-slate-50 rounded-xl col-span-2" placeholder="Event" value={formData.eventName || ''} onChange={e=>setFormData({...formData, eventName:e.target.value})} />
               <input className="p-4 bg-slate-50 rounded-xl" placeholder="Location" value={formData.eventLocation || ''} onChange={e=>setFormData({...formData, eventLocation:e.target.value})} />
               <input className="p-4 bg-slate-50 rounded-xl" type="date" value={formData.eventDate || ''} onChange={e=>setFormData({...formData, eventDate:e.target.value})} />
             </div>
             <button onClick={async ()=>{try{if(showModal==='add')await axios.post(API.event,formData,{headers:{Authorization:`Bearer ${user.token}`}});else await axios.put(`${API.event}/${selectedEvent.id}`,formData,{headers:{Authorization:`Bearer ${user.token}`}});setShowModal(null);fetchData(user);}catch{setError('Failed');}}} className="w-full py-4 btn-primary text-white rounded-xl mt-8 font-black">SAVE RECORD</button>
           </div>
        </div>
      )}
    </div>
  );
}


export default App;
