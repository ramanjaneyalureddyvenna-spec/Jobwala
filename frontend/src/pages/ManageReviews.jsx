import { useEffect, useState } from "react";
import API from "../api";

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ author: "", content: "", rating: 5 });

  const load = async () => {
    const { data } = await API.get("/reviews");
    setReviews(data.reviews);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/admin/reviews", form);
    setForm({ author: "", content: "", rating: 5 });
    load();
  };

  const del = async (id) => { await API.delete(`/admin/reviews/${id}`); load(); };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Reviews</h1>
      <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
        <input placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} className="border p-2"/>
        <textarea placeholder="Content" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} className="border p-2"/>
        <input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})} className="border p-2"/>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Post Review</button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {reviews.map(r => (
          <div key={r._id} className="border p-4 rounded">
            <p className="font-semibold">{r.author}</p>
            <p>{r.content}</p>
            <p>⭐ {r.rating}</p>
            <button onClick={()=>del(r._id)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

