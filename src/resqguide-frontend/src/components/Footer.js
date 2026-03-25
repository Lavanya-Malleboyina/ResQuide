function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-6 text-center text-gray-500 text-sm">
      <p>🛡️ <span className="font-semibold text-blue-600">ResQGuide</span> — Building Safety Assessment System</p>
      <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}

export default Footer;
