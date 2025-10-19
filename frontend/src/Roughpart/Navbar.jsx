import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">JobWala</Link>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Search jobs..." className="p-1 rounded text-black" />
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">☰</button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white text-black rounded shadow-lg flex flex-col">
          <Link className="p-2 hover:bg-gray-100" to="/about">About Us</Link>
          <Link className="p-2 hover:bg-gray-100" to="/tools">Job Ready Tools</Link>
          <Link className="p-2 hover:bg-gray-100" to="/contact">Contact Us</Link>
          <Link className="p-2 hover:bg-gray-100" to="/admin/login">Admin Login</Link>
        </div>
      )}
    </nav>
  );
}
