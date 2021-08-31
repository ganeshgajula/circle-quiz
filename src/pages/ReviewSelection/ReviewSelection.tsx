import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizProvider";
import { PlayedQuizAndScore } from "../../context/QuizProvider";

export const ReviewSelection = () => {
  const navigate = useNavigate();

  const {
    data: { currentScore, selectedQuiz, playedQuizScores },
    dispatch,
  } = useQuiz();

  const isQuizAlreadyPlayed = playedQuizScores.find(
    (quiz: PlayedQuizAndScore) => quiz.quizId === selectedQuiz?._id
  );

  useEffect(() => {
    if (!isQuizAlreadyPlayed) {
      dispatch({
        type: "SAVE_SCORE_AND_QUIZ_DATA",
        payload: { quizId: selectedQuiz?._id, score: currentScore },
      });
    }
  }, [isQuizAlreadyPlayed, currentScore, selectedQuiz?._id, dispatch]);

  console.log(playedQuizScores);
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
