import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "./context/QuizProvider";
import { AuthProvider } from "./context/AuthProvider";
import { LeaderBoardProvider } from "./context/LeaderBoardProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <QuizProvider>
          <LeaderBoardProvider>
            <App />
          </LeaderBoardProvider>
        </QuizProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
