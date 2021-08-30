import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, ReviewSelection, SelectedQuiz } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<SelectedQuiz />} />
        <Route path="/review" element={<ReviewSelection />} />
      </Routes>
    </div>
  );
}

export default App;
