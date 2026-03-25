import { useNavigate } from "react-router-dom";

const gradients = [
  "linear-gradient(135deg, #3b82f6, #1e40af)",
  "linear-gradient(135deg, #10b981, #065f46)",
  "linear-gradient(135deg, #8b5cf6, #4c1d95)",
  "linear-gradient(135deg, #f59e0b, #b45309)",
  "linear-gradient(135deg, #ef4444, #991b1b)",
  "linear-gradient(135deg, #06b6d4, #0e7490)"
];

const icons = ["🏠", "🏢", "🏥", "🏫", "🏭", "🏗️"];

function BuildingCard({ type, index }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/assessment/${type.name.toLowerCase()}`)}
      className="cursor-pointer rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300"
      style={{ background: gradients[index % gradients.length] }}
    >
      <div className="text-4xl mb-3">{icons[index % icons.length]}</div>
      <h2 className="text-2xl font-semibold mb-1 capitalize">{type.name}</h2>
      <p className="text-sm opacity-80">Start safety assessment</p>
      <div className="mt-4 text-right text-xl">➜</div>
    </div>
  );
}

export default BuildingCard;
