import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../../components";
import { useAuth } from "../../context/AuthProvider";
import { useLeaderBoard } from "../../context/LeaderBoardProvider";
import { useQuiz } from "../../context/QuizProvider";
import { addScoreToLeaderBoard } from "../../services/addScoreToLeaderBoard";
import { addToPlayedQuizzes } from "../../services/addToPlayedQuizzes";
import { Options, Questions } from "../../types/quiz.types";

export type PlayedQuizData = {
  quizId: string | undefined;
  score: number;
};

export const ReviewSelection = () => {
  const navigate = useNavigate();

  const {
    data: { currentScore, selectedQuiz, selectedOptions },
    dispatch,
  } = useQuiz();

  const {
    authData: { userId },
    authDispatch,
  } = useAuth();

  const { leaderBoardDispatch } = useLeaderBoard();

  const playedQuizData: PlayedQuizData = {
    quizId: selectedQuiz?._id,
    score: currentScore,
  };

  const [playedQuizDetails, setPlayedQuizDetails] =
    useState<PlayedQuizData>(playedQuizData);

  useEffect(() => {}, [setPlayedQuizDetails]);

  useEffect(() => {
    (async () => {
      const response = await addToPlayedQuizzes(userId, playedQuizDetails);

      if ("updatedUser" in response) {
        return authDispatch({
          type: "SAVE_PLAYED_QUIZ_DATA",
          payload: response.updatedUser,
        });
      }

      return toast.error(response.message, {
        position: "bottom-center",
        autoClose: 2000,
      });
    })();
  }, [userId, playedQuizDetails, authDispatch]);

  useEffect(() => {
    (async () => {
      const response = await addScoreToLeaderBoard(userId, playedQuizDetails);

      if ("leaderBoard" in response) {
        return leaderBoardDispatch({
          type: "ADD_SCORE_ONTO_LEADERBOARD",
          payload: response.leaderBoard,
        });
      }

      return toast.error(response.message, {
        position: "bottom-center",
        autoClose: 2000,
      });
    })();
  }, [userId, playedQuizDetails, leaderBoardDispatch]);

  return (
    <>
      <Navbar />
      <div className="w-11/12 sm:max-w-xl mx-auto my-8">
        <h1 className="font-semibold text-xl">
          Yay!! Your total score is {currentScore} 🎊🥳🎉
        </h1>
        <div className="my-6">
          <h2 className="text-lg font-medium">Review you selection</h2>
          {selectedQuiz?.questions.map((question: Questions) => (
            <div
              className="my-10 pt-2 bg-gray-50 shadow-md rounded-lg"
              key={question._id}
            >
              <p className="p-2 font-semibold text-lg ">{question.question}</p>
              <ul>
                {question.options.map((option: Options) => (
                  <li
                    key={option._id}
                    className={`${option.isCorrect && "bg-green-400"} ${
                      selectedOptions.includes(option._id) &&
                      !option.isCorrect &&
                      "bg-red-400"
                    } p-2 cursor-default text-lg border border-gray-200`}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 py-2 px-3 mt-4 text-white font-semibold rounded-md"
          onClick={() => {
            navigate("/", { replace: true });
            dispatch({ type: "RESET_QUIZ" });
          }}
        >
          Go to Home
        </button>
      </div>
    </>
  );
};
