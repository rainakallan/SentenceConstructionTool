import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSentence } from "../Context/SentenceContext";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timeleft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedwords, setSelectedWords] = useState([]);
  const { setResults } = useSentence();
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (timeleft === 0) {
      handleNext();
    }
  }, [timeleft]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5001/jsondb-9110d/us-central1/getQuestions"
        );
        const data = await response.json();

        console.log("fetched data", data);

        if (Array.isArray(data) && data.length > 0 && data[0].question) {
          const first = data[0];
          setQuestions(data);
          const blankMatches = first.question.match(/_{3,}/g) || [];
          const blankCount = blankMatches.length;
          setCurrentQuestion({ ...first, blank: blankCount });
          console.log("Current Question:", first);
        } else {
          console.warn("No questions found in the response.");
        }
      } catch (err) {
        console.log("failed to load data", err);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const nextq = questions[currentIndex];
      const blankMatches = nextq.question.match(/_{3,}/g) || [];
      const blankCount = blankMatches.length;
      setCurrentQuestion({ ...nextq, blank: blankCount });
    }
  }, [currentIndex, questions]);

  const handleWordClick = (word) => {
    if (
      selectedwords.length < currentQuestion.blank &&
      !selectedwords.includes(word)
    ) {
      setSelectedWords([...selectedwords, word]);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selectedwords];
    updated.splice(index, 1);
    setSelectedWords(updated);
  };

  const handleNext = () => {
    const currentQ = questions[currentIndex];
    const correct =
      JSON.stringify(selectedwords) === JSON.stringify(currentQ.correctAnswer);

    const answerRecord = {
      questionId: currentQ.questionId,
      question: currentQ.question,
      userAnswer: selectedwords,
      correctAnswer: currentQ.correctAnswer,
      isCorrect: correct,
    };
    const newAnswers = [...userAnswers, answerRecord];

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswers(newAnswers);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      setResults(newAnswers);
      navigate("/feedback");
    }
  };
  const renderSentence = () => {
    const parts = currentQuestion.question.split(/_{3,}/g);
    const sentence = [];

    for (let i = 0; i < parts.length; i++) {
      sentence.push(
        <span key={`text-${i}`} className="whitespace-pre-wrap">
          {parts[i]}
        </span>
      );
      if (i < parts.length - 1) {
        sentence.push(
          <span
            key={`blank-${i}`}
            onClick={() => handleBlankClick(i)}
            className="inline-block w-auto min-w-[6rem] px-2 py-1 border-b border-black mx-1 text-center cursor-pointer rounded-md"
          >
            {selectedwords[i] || ""}
          </span>
        );
      }
    }

    return sentence;
  };

  const isNextEnabled =
    currentQuestion && selectedwords.length === currentQuestion.blank;

  if (!questions.length) {
    return <div>Loading....</div>;
  }
  console.log("Current Question", currentQuestion);

  return (
    <main className="p-6 max-w-3xl mx-auto w-auto mt-10 min-h-screen">
      <div className="flex justify-between items-center  mb-10">
        <div className="text-xl font-bold mb-4">Time left: {timeleft}s</div>
        <button
          onClick={() => {
            setResults(userAnswers);
            navigate("/feedback");
          }}
          className="px-4 py-2 text-black border border-blue-500 rounded hover:bg-red-500 transition hover:text-white"
        >
          Quit
        </button>
      </div>
      {currentQuestion && (
        <>
          <div className="text-2xl mb-6 flex flex-wrap gap-3">
            {renderSentence()}
          </div>
          <div className=" text-lg flex gap-4 flex-wrap mb-6">
            {currentQuestion.options.map((word, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedwords.includes(word)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-100 hover:bg-blue-300"
                }
          `}
                disabled={selectedwords.includes(word)}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`px-6 py-2 text-white text-lg font-semibold rounded-lg transition ${
              isNextEnabled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } `}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      )}
    </main>
  );
};

export default Quiz;
