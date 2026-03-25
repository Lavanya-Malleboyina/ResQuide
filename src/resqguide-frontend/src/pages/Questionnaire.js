import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import api from "../services/api";

function Questionnaire() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { navigate("/login"); return; }

    api
      .get(`/questions?buildingType=${type.toLowerCase()}`)
      .then((res) => { setQuestions(res.data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [type, navigate]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const unanswered = questions.filter((q) => !answers[q._id]);
    if (unanswered.length > 0) {
      alert(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }
    setSubmitting(true);
    try {
      const response = await api.post("/risk/calculate", { answers });
      navigate("/result", {
        state: {
          riskScore: response.data.riskScore,
          riskLevel: response.data.riskLevel,
          recommendations: response.data.recommendations,
          buildingType: type
        }
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please make sure you are logged in and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {type} Safety Assessment
          </h1>
          <p className="text-gray-500 mt-1">Answer all questions to get your building's risk score.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Loading questions...</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-600 text-lg font-medium">No questions found for <strong className="capitalize">{type}</strong>.</p>
            <p className="text-gray-400 text-sm mt-2 mb-6">Run the seed script to populate questions, or ask your admin to add them.</p>
            <button onClick={() => navigate("/user")} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{answeredCount} of {questions.length} answered</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {questions.map((q, index) => (
              <QuestionCard
                key={q._id}
                question={q}
                index={index}
                value={answers[q._id]}
                onChange={handleChange}
              />
            ))}

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => navigate("/user")}
                className="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                ← Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {submitting ? "Calculating..." : "Submit Assessment →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Questionnaire;
