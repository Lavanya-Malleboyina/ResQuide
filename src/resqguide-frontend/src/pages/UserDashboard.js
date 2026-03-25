import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BuildingCard from "../components/BuildingCard";

const FALLBACK_TYPES = [
  { name: "residential" },
  { name: "commercial" },
  { name: "hospital" },
  { name: "school" },
  { name: "warehouse" }
];

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    api
      .get("/building-types")
      .then((res) => {
        setTypes(res.data.length > 0 ? res.data : FALLBACK_TYPES);
      })
      .catch(() => {
        setTypes(FALLBACK_TYPES);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      <div className="flex-1 p-8 max-w-6xl mx-auto w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Select a building type to start your safety assessment
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Building Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <BuildingCard key={index} type={type} index={index} />
          ))}
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default UserDashboard;
