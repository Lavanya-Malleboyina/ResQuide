import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AddQuestion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    questionText: "",
    buildingType: "",
    options: "None,Basic,Adequate,Advanced",
    weight: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.questionText || !form.buildingType) {
      alert("Please fill in question text and building type");
      return;
    }
    setLoading(true);
    try {
      const optionsArray = form.options
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);

      await api.post("/questions", {
        questionText: form.questionText,
        buildingType: form.buildingType.toLowerCase(),
        options: optionsArray,
        weight: Number(form.weight)
      });

      alert("Question added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Error adding question. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex items-center justify-center py-16 px-4">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">📋</div>
            <h2 className="text-2xl font-bold text-gray-800">Add Question</h2>
            <p className="text-gray-500 text-sm">Add an assessment question for a building type</p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
          <textarea
            className="border border-gray-300 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. What type of fire suppression system is installed?"
            rows={3}
            value={form.questionText}
            onChange={(e) => setForm({ ...form, questionText: e.target.value })}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Building Type</label>
          <input
            className="border border-gray-300 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. residential, hospital, school"
            value={form.buildingType}
            onChange={(e) => setForm({ ...form, buildingType: e.target.value })}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <input
            className="border border-gray-300 w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="None,Basic,Adequate,Advanced"
            value={form.options}
            onChange={(e) => setForm({ ...form, options: e.target.value })}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
          <input
            type="number"
            className="border border-gray-300 w-full p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={form.weight}
            min={1}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
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
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Question"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AddQuestion;
