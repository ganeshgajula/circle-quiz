import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:quizId" element={<SelectedQuiz />} />
        <PrivateRoute path="/review" element={<ReviewSelection />} />
        <PrivateRoute path="/playedquizzes" element={<PlayedQuizzes />} />
      </Routes>
    </div>
  );
}

export default App;
