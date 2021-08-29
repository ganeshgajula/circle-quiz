import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, SelectedQuiz } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<SelectedQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
