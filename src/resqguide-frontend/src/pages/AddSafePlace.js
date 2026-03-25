import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AddSafePlace() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "", location: "" });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = () => {
    api.get("/safeplaces").then((res) => setPlaces(res.data)).catch(console.error);
  };

  useEffect(() => { fetchPlaces(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.location) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/safeplaces", form);
      setForm({ name: "", type: "", location: "" });
      fetchPlaces();
      alert("Safe place added!");
    } catch (error) {
      console.error(error);
      alert("Error adding safe place. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this safe place?")) return;
    try {
      await api.delete(`/safeplaces/${id}`);
      fetchPlaces();
    } catch (error) {
      alert("Error deleting safe place.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📍 Manage Safe Places</h1>
            <p className="text-gray-500 mt-1">Add shelters and evacuation centers</p>
          </div>
          <button onClick={() => navigate("/admin")} className="border border-gray-300 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            ← Back
          </button>
        </div>

        {/* Add form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Safe Place</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Name (e.g. City Hospital)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="Hospital">Hospital</option>
              <option value="Shelter">Shelter</option>
              <option value="Evacuation Center">Evacuation Center</option>
              <option value="Relief Camp">Relief Camp</option>
              <option value="Fire Station">Fire Station</option>
              <option value="Emergency Services">Emergency Services</option>
            </select>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Location / Address"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Safe Place"}
          </button>
        </div>

        {/* List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Existing Safe Places ({places.length})
          </h2>
          {places.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No safe places yet. Add one above or run <code className="bg-gray-100 px-1 rounded">npm run seed</code>.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {places.map((place) => (
                <div key={place._id} className="border border-gray-100 p-4 rounded-xl bg-gray-50 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{place.name}</h3>
                    <p className="text-blue-600 text-sm">🏷️ {place.type}</p>
                    <p className="text-gray-500 text-sm">📍 {place.location}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(place._id)}
                    className="text-red-400 hover:text-red-600 text-sm ml-2 mt-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AddSafePlace;
