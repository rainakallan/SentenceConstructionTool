import React from "react";
import { useSentence } from "../Context/SentenceContext";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const { results, setResults } = useSentence();
  const navigate = useNavigate();

  const handleGoHome = () => {
    setResults([]);
    navigate("/");
  };

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <p className="text-2xl mb-4">No results available</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 border border-indigo-500 text-indigo-700 rounded-xl hover:bg-indigo-500 hover:text-white transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const score = results.filter((result) => result.isCorrect).length;

  return (
    <div className="feedback-container">
      <h2 className="text-3xl font-bold text-center mb-4"> 🎉Feedback 🎉 </h2>
      <p className="text-xl text-center mb-6">
        Your Score: <span className="font-semibold">{score}</span> /{" "}
        {results.length}
      </p>

      <div className="space-y-6">
        {results.map((result, index) => {
          const questionParts = result.question.split("_____________");

          return (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lh shadow-md bg-white"
            >
              <p className="font-semibold mb-2">
                <strong>Question {index + 1}:</strong>
              </p>
              <p className="mb-2">
                {questionParts.map((part, idx) => {
                  const option = result.userAnswer[idx] || "";
                  return (
                    <span key={idx}>
                      {part}
                      {option && (
                        <strong className="text-blue-600">{` [${option}]`}</strong>
                      )}{" "}
                    </span>
                  );
                })}
              </p>

              {result.isCorrect ? (
                <p className="text-green-600 font-semibold">✔️ Correct</p>
              ) : (
                <>
                  <p className="text-red-600 font-semibold">❌ Incorrect</p>
                  <p className="font-medium mt-2 mb-1">
                    <strong>Correct Answers:</strong>
                  </p>

                  <ul className="list disc list-inside text-sm">
                    {result.correctAnswer.map((answer, idx) => (
                      <li key={idx}>
                        <strong>Blank {idx + 1}: </strong>
                        {answer}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
        <div className="flex justify-center items-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 border border-indigo-500 text-indigo-700 rounded-xl hover:bg-indigo-500 hover:text-white transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
