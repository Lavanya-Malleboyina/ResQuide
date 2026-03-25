import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📝</div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Join ResQGuide today</p>
        </div>

        <input
          className="border border-gray-300 w-full p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border border-gray-300 w-full p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border border-gray-300 w-full p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="border border-gray-300 w-full p-3 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-green-600 w-full text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
