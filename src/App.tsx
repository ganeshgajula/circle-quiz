import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, PlayedQuizzes, ReviewSelection, SelectedQuiz } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<SelectedQuiz />} />
        <Route path="/review" element={<ReviewSelection />} />
        <Route path="/playedquizzes" element={<PlayedQuizzes />} />
      </Routes>
    </div>
  );
}

export default App;
