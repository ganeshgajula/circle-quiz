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
  Profile,
  ReviewSelection,
  SelectedQuiz,
  Signup,
} from "./pages";
import { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import { initializeUser } from "./services/initializeUser";

function App() {
  const {
    authData: { userId },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    userId &&
      (async () => {
        const response = await initializeUser(userId);

        if ("user" in response) {
          return authDispatch({
            type: "INITIALIZE_USER",
            payload: response.user,
          });
        }

        return authDispatch({ type: "SET_ERROR", payload: response });
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
        <PrivateRoute path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
