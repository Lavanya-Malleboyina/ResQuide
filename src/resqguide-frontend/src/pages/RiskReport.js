import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RiskReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Risk Report</h1>
          <p className="text-gray-500 mb-6">Your full risk report will appear here after completing an assessment.</p>
          <button
            onClick={() => navigate("/user")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RiskReport;
