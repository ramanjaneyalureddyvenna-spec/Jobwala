import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input value={username} onChange={e=>setUser(e.target.value)} placeholder="Username" className="border p-2 w-full mb-3" />
        <input value={password} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full mb-3" />
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">Login</button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
