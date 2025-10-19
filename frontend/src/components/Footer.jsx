export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-10">
      <p>📞 Contact: +91 98765 43210 | ✉️ support@jobsite.com</p>
      <p className="text-sm mt-2">© {new Date().getFullYear()} JobSite</p>
    </footer>
  );
}

