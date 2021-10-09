import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Options, Quizzes } from "../../types/quiz.types";

export const SelectedQuiz = () => {
  const {
    data: { quizzes, currentQuestionNo, currentScore, selectedQuiz },
    dispatch,
  } = useQuiz();
  const { quizId } = useParams();
  const requestedQuiz = quizzes.find((quiz: Quizzes) => quiz._id === quizId);
  const questionToDisplay = requestedQuiz?.questions[currentQuestionNo];
  const navigate = useNavigate();

  const [isRulesRead, setIsRulesRead] = useState(false);

  useEffect(() => {
    if (requestedQuiz) {
      dispatch({ type: "SET_SELECTED_QUIZ", payload: requestedQuiz });
    }
  }, [requestedQuiz, dispatch]);

  const correctOption = questionToDisplay?.options.find(
    (option) => option.isCorrect
  );

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const questionAndScoreHandler = () => {
    setSelectedOptionId(null);
    selectedOptionId === correctOption?._id
      ? dispatch({
          type: "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION",
          payload: {
            points: questionToDisplay?.points,
            noOfQuestions: requestedQuiz?.questions.length,
          },
        })
      : dispatch({
          type: "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION",
          payload: {
            points: questionToDisplay?.negativePoints,
            noOfQuestions: requestedQuiz?.questions.length,
          },
        });
  };

  const finishQuizHandler = () => {
    questionAndScoreHandler();
    navigate("/review", { replace: true });
  };

  console.log(selectedOptionId);
  console.log(correctOption?._id);
  console.log(requestedQuiz);
  console.log(selectedQuiz);

  return (
    <>
      <Navbar />
      {!isRulesRead && (
        <div className="flex flex-col justify-center items-center mt-14 py-8 max-w-xl mx-auto rounded-lg shadow-lg">
          <h1 className="font-bold text-4xl">Quiz Rules</h1>
          <ul className="text-left py-5">
            <li className="py-1 text-lg">
              👉 There are total 6 questions in a quiz.
            </li>
            <li className="py-1 text-lg">
              👉 Each correct answer will give you 5 points.
            </li>
            <li className="py-1 text-lg">
              👉 Each wrong answer will deduct 2 points.
            </li>
            <li className="py-1 text-lg">
              👉 You need to select only one correct answer.
            </li>
            <li className="py-1 text-lg">
              👉 High scorers will be featured on the leaderboard.
            </li>
          </ul>
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-md text-lg font-semibold"
            onClick={() => setIsRulesRead(true)}
          >
            Let's Play
          </button>
        </div>
      )}
      {isRulesRead && requestedQuiz ? (
        <div className="my-8 max-w-xl mx-auto">
          <h1 className="text-2xl font-medium">{requestedQuiz?.quizName}</h1>
          <div className="flex items-center justify-between mt-6 text-lg font-medium">
            <span>
              Question:{currentQuestionNo + 1}/{requestedQuiz.questions.length}
            </span>
            <span>Score:{currentScore}</span>
          </div>
          <div className="my-8 shadow-xl bg-gray-50 rounded-lg">
            <p className="text-xl font-medium p-4">
              {questionToDisplay?.question}
            </p>
            <ul>
              {questionToDisplay?.options.map((option: Options) => (
                <li
                  key={option._id}
                  className={`${
                    selectedOptionId && option.isCorrect && "bg-green-400"
                  } ${
                    !option.isCorrect &&
                    option._id === selectedOptionId &&
                    "bg-red-400"
                  } ${
                    selectedOptionId && "pointer-events-none"
                  } border border-gray-200  py-3 px-5 cursor-pointer text-lg`}
                  onClick={() => {
                    setSelectedOptionId(option._id);
                    dispatch({
                      type: "SET_SELECTED_OPTIONS",
                      payload: option._id,
                    });
                  }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
          <button
            className={`${
              !selectedOptionId && "opacity-60 cursor-not-allowed"
            } px-4 py-2 bg-blue-500 text-white font-semibold text-lg rounded-sm`}
            onClick={() => {
              currentQuestionNo < requestedQuiz.questions.length - 1
                ? questionAndScoreHandler()
                : finishQuizHandler();
            }}
            disabled={!selectedOptionId}
          >
            {currentQuestionNo < requestedQuiz.questions.length - 1
              ? "Next"
              : "Finish"}
          </button>
        </div>
      ) : (
        isRulesRead && <div>No quiz found with associated id</div>
      )}
    </>
  );
};
