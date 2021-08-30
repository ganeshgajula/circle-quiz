import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Options, Quizzes } from "../../data/quiz.types";

export const SelectedQuiz = () => {
  const {
    data: { quizzes, currentQuestionNo, currentScore, selectedOptionId },
    dispatch,
  } = useQuiz();
  const { quizId } = useParams();

  const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);

  const requestedQuiz = quizzes.find(
    (quiz: Quizzes) => String(quiz._id) === quizId
  );

  const navigate = useNavigate();

  const questionToDisplay = requestedQuiz?.questions[currentQuestionNo];

  const resetQuizHandler = () => {
    navigate("/review");
    dispatch({ type: "RESET_QUIZ" });
  };

  // const incrementOrDecrementScore = (
  //   isCorrect: boolean,
  //   correctPoints: number,
  //   negativePoints: number
  // ) => {
  //   isCorrect
  //     ? dispatch({ type: "INCREMENT_SCORE", payload: correctPoints })
  //     : dispatch({ type: "DECREMENT_SCORE", payload: negativePoints });
  // };

  const setSelectedOptionHandler = (optionId: number, isCorrect: boolean) => {
    console.log(isCorrect);
    isCorrect === true && setCorrectOptionId(optionId);
    dispatch({
      type: "SET_SELECTED_OPTION",
      payload: optionId,
    });
  };

  const questionAndScoreHandler = () =>
    selectedOptionId === correctOptionId
      ? dispatch({
          type: "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION",
          payload: questionToDisplay?.points,
        })
      : dispatch({
          type: "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION",
          payload: questionToDisplay?.negativePoints,
        });

  console.log(selectedOptionId);
  console.log(correctOptionId);
  console.log(requestedQuiz);
  return (
    <>
      <Navbar />
      <div className="my-8 m-auto">
        <h1>{requestedQuiz?.quizName}</h1>
        <div className="flex items-center justify-between max-w-xl mx-auto mt-6">
          <span>
            Question:{currentQuestionNo + 1}/{requestedQuiz?.questions.length}
          </span>
          <span>Score:{currentScore}</span>
        </div>
        <div className="bg-gray-400 my-8 max-w-xl m-auto">
          <p>{questionToDisplay?.question}</p>
          <ul>
            {questionToDisplay?.options.map((option: Options) => (
              <li
                key={option._id}
                className={`${
                  selectedOptionId === option._id
                    ? "bg-green-400"
                    : "bg-red-500"
                } text-white my-2 p-2 cursor-pointer`}
                onClick={() =>
                  setSelectedOptionHandler(option._id, option.isCorrect)
                }
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="border-2 px-4 py-2 bg-blue-300"
          onClick={() => {
            currentQuestionNo < 5
              ? questionAndScoreHandler()
              : resetQuizHandler();
          }}
          disabled={!selectedOptionId}
        >
          {currentQuestionNo < 5 ? "Next" : "Finish"}
        </button>
      </div>
    </>
  );
};
