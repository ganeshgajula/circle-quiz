import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizProvider";

export const ReviewSelection = () => {
  const navigate = useNavigate();

  const {
    data: { currentScore },
    dispatch,
  } = useQuiz();
  return (
    <div>
      <h2>Inside review selection</h2>
      <p>Yay!! Your score is {currentScore}</p>
      <button
        className="bg-blue-400 p-2 mt-4"
        onClick={() => {
          navigate("/");
          dispatch({ type: "RESET_QUIZ" });
        }}
      >
        Go to Home
      </button>
    </div>
  );
};
