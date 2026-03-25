import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

function RiskResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};
  const riskScore = data.riskScore ?? 0;
  const riskLevel = data.riskLevel || "Low";
  const recommendations = data.recommendations || [];
  const buildingType = data.buildingType || "";

  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);

  useEffect(() => {
    // If no state (e.g. page refresh), redirect back
    if (!location.state) {
      navigate("/user");
      return;
    }
    api
      .get("/safeplaces")
      .then((res) => { setPlaces(res.data); setPlacesLoading(false); })
      .catch((err) => { console.error(err); setPlacesLoading(false); });
  }, [location.state, navigate]);

  const getLevelColor = () => {
    if (riskLevel === "High") return "bg-red-500";
    if (riskLevel === "Medium") return "bg-yellow-400";
    return "bg-green-500";
  };

  const getLevelBg = () => {
    if (riskLevel === "High") return "bg-red-50 border-red-200";
    if (riskLevel === "Medium") return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getLevelIcon = () => {
    if (riskLevel === "High") return "🔴";
    if (riskLevel === "Medium") return "🟡";
    return "🟢";
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Risk Assessment Result</h1>
          {buildingType && (
            <p className="text-gray-500 mt-1 capitalize">Building type: <strong>{buildingType}</strong></p>
          )}
        </div>

        {/* Score Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center mb-6">
          <div className="flex justify-center gap-6 flex-wrap">

            <div className="bg-blue-50 border border-blue-200 px-10 py-6 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1 font-medium">Risk Score</p>
              <p className="text-5xl font-extrabold text-blue-700">{riskScore}</p>
              <p className="text-xs text-gray-400 mt-1">out of 50</p>
            </div>

            <div className={`${getLevelColor()} text-white px-10 py-6 rounded-2xl`}>
              <p className="text-sm opacity-80 mb-1 font-medium">Risk Level</p>
              <p className="text-5xl font-extrabold">{getLevelIcon()}</p>
              <p className="text-xl font-bold mt-1">{riskLevel}</p>
            </div>

          </div>

          {/* Score bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${getLevelColor()} h-3 rounded-full transition-all duration-700`}
                style={{ width: `${Math.min((riskScore / 50) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Safe</span>
              <span>Dangerous</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={`border p-6 rounded-2xl shadow-sm mb-6 ${getLevelBg()}`}>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🛡️ Safety Recommendations
          </h2>
          {recommendations.length > 0 ? (
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="bg-white border border-gray-100 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="text-green-500 text-lg mt-0.5">✅</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-700 font-medium text-lg">
              🎉 No major risks detected. Your building is safe!
            </p>
          )}
        </div>

        {/* Safe Places */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📍 Nearby Safe Places
          </h2>

          {placesLoading ? (
            <p className="text-gray-400">Loading safe places...</p>
          ) : places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {places.map((place) => (
                <div
                  key={place._id}
                  className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition bg-gray-50"
                >
                  <h3 className="font-bold text-gray-800">{place.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">🏷️ {place.type}</p>
                  <p className="text-gray-500 text-sm mt-1">📍 {place.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p>No safe places in the database yet.</p>
              <p className="text-sm mt-1">Run <code className="bg-gray-100 px-1 rounded">npm run seed</code> in the backend to add sample data.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/user")}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => navigate(`/assessment/${buildingType || "residential"}`)}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Retake Assessment
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default RiskResult;
