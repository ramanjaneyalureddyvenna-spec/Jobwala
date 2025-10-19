import { useEffect, useState } from 'react';
import API from '../api';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', company: '', location: '', applyUrl: '', image: null });

  const loadJobs = async () => {
    const { data } = await API.get('/jobs');
    setJobs(data.jobs);
  };

  useEffect(() => { loadJobs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
    await API.post('/admin/jobs', fd);
    setForm({ title: '', description: '', company: '', location: '', applyUrl: '', image: null });
    loadJobs();
  };

  const del = async (id) => { await API.delete(`/admin/jobs/${id}`); loadJobs(); };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Jobs</h1>
      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="border p-2"/>
        <input placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="border p-2"/>
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="border p-2"/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="border p-2"/>
        <input placeholder="Apply URL" value={form.applyUrl} onChange={e=>setForm({...form,applyUrl:e.target.value})} className="border p-2"/>
        <input type="file" onChange={e=>setForm({...form,image:e.target.files[0]})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {jobs.map(j => (
          <div key={j._id} className="border p-4 rounded">
            <h2 className="font-bold">{j.title}</h2>
            <p className="text-sm">{j.company}</p>
            <button onClick={()=>del(j._id)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
