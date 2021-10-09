import React from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../components";
import { QuizAndScoreData, useAuth } from "../../context/AuthProvider";
import { useQuiz } from "../../context/QuizProvider";

export const PlayedQuizzes = () => {
  const {
    authData: { user },
  } = useAuth();

  const { dispatch } = useQuiz();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8 w-11/12 sm:max-w-xl mx-auto my-6">
        {user?.quizzesPlayed.map((quiz: QuizAndScoreData) => (
          <div
            key={quiz._id}
            className="flex flex-col items-center my-4 border border-gray-200"
          >
            <img
              src={quiz.quizId.coverImage}
              alt="cover"
              className="w-full h-48 sm:h-40"
            />
            <div className="py-4">
              <p className="font-medium text-lg">{quiz.quizId.quizName}</p>
              <p>{quiz.quizId.level}</p>
              <p>Score {quiz.score}</p>
              <button
                className="px-3 py-1 my-2 bg-blue-500 text-white font-semibold rounded-md"
                onClick={() => {
                  dispatch({ type: "RESET_QUIZ" });
                  navigate(`/quiz/${quiz.quizId._id}`);
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
