import React from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Feedback from "./pages/Feedback";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default App;
