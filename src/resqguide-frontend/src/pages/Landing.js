import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <Navbar />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">

        <div className="text-6xl mb-6">🛡️</div>

        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          ResQGuide
        </h1>

        <p className="text-xl text-gray-600 max-w-xl mb-10">
          Assess the safety of any building in minutes. Get instant risk scores,
          recommendations, and nearby safe places.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition shadow-lg"
          >
            Register
          </button>
        </div>

      </div>

      {/* Features */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why ResQGuide?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: "📋", title: "Smart Assessments", desc: "Answer building-specific questions to evaluate safety risk." },
            { icon: "📊", title: "Instant Risk Score", desc: "Get a calculated risk score and level in seconds." },
            { icon: "📍", title: "Safe Places Nearby", desc: "See nearby shelters and safe locations on the results page." }
          ].map((f, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Landing;
