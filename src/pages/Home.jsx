import React from "react";
import { PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-12">
        <div className="text-gray-700 mb-4">
          <PencilLine className="w-10 h-10 mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl sm:text-5xl font-semibold text-center mb-2">
          Sentence Construction
        </h1>
        <p className="text-gray-500 text-center text-xl max-w-full mb-24">
          User has to construct a sentence with random words by placing them in
          the correct order.
        </p>
        {/* Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-16 mb-12 ">
          <div className="text-center">
            <p className="text-lg font-medium">Time per Question</p>
            <p className="text-gray-500">1 minute</p>
          </div>
          <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <p className="text-lg font-medium">Total Questions</p>
            <p className="text-gray-500">10</p>
          </div>
          <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <p className="text-lg font-medium">Coins</p>
            <div className="flex justify-center items-center gap-2">
              <span className="w-3 h-3 rounded-full animate-bounce bg-yellow-400 inline-block"></span>
              <span className="text-gray-500">20 coins</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="px-6 py-3 border border-indigo-500 text-indigo-700 rounded-xl hover:bg-indigo-50 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="
            px-6
            py-3
            border
            border-indigo-500
            text-indigo-600
            rounded-xl
            hover:bg-indigo-700 hover:text-white
            transition"
            onClick={() => navigate("/quiz")}
          >
            Start
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
