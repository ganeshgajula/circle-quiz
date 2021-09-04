import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components";

import {
  Home,
  LeaderBoard,
  Login,
  PlayedQuizzes,
  ReviewSelection,
  SelectedQuiz,
  Signup,
} from "./pages";
import { useEffect } from "react";
import { InitializeUserData, useAuth } from "./context/AuthProvider";
import axios from "axios";

function App() {
  const {
    authData: { userId },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    userId &&
      (async () => {
        const { data } = await axios.get<InitializeUserData>(
          `http://localhost:4000/users/${userId}`
        );

        authDispatch({ type: "INITIALIZE_USER", payload: data.user });
      })();
  }, [userId, authDispatch]);

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
        <PrivateRoute path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default App;
