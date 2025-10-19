import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { logout, admin } = useAuth();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome, {admin?.name || admin?.username}</h1>
      <div className="flex gap-4 mt-4">
        <Link to="/admin/manage-jobs" className="bg-blue-600 text-white px-4 py-2 rounded">Manage Jobs</Link>
        <Link to="/admin/manage-reviews" className="bg-green-600 text-white px-4 py-2 rounded">Manage Reviews</Link>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}
