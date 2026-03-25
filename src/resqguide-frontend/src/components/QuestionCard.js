function QuestionCard({ question, index, value, onChange }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4">

      <p className="font-semibold text-gray-800 mb-3">
        <span className="text-blue-600 mr-2">Q{index + 1}.</span>
        {question.questionText}
      </p>

      <select
        className="border border-gray-300 p-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value || ""}
        onChange={(e) => onChange(question._id, e.target.value)}
      >
        <option value="">-- Select an answer --</option>
        {question.options && question.options.length > 0 ? (
          question.options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))
        ) : (
          <>
            <option value="None">None</option>
            <option value="Basic">Basic</option>
            <option value="Adequate">Adequate</option>
            <option value="Advanced">Advanced</option>
          </>
        )}
      </select>

    </div>
  );
}

export default QuestionCard;
