import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  PlayedQuizzes,
  ReviewSelection,
  SelectedQuiz,
  Signup,
} from "./pages";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:quizId" element={<SelectedQuiz />} />
        <Route path="/review" element={<ReviewSelection />} />
        <Route path="/playedquizzes" element={<PlayedQuizzes />} />
      </Routes>
    </div>
  );
}

export default App;
