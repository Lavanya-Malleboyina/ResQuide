import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AddBuildingType() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter a building type name");
      return;
    }
    setLoading(true);
    try {
      await api.post("/building-types", { name: name.trim().toLowerCase() });
      alert("Building type added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Error adding building type. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex items-center justify-center py-20 px-4">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🏗️</div>
            <h2 className="text-2xl font-bold text-gray-800">Add Building Type</h2>
            <p className="text-gray-500 text-sm">e.g. hospital, mall, school</p>
          </div>

          <input
            className="border border-gray-300 w-full p-3 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter building type (e.g. mall, hospital)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AddBuildingType;
