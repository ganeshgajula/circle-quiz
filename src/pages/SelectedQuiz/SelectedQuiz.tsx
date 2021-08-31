import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Options, Quizzes } from "../../data/quiz.types";

export const SelectedQuiz = () => {
  const {
    data: {
      quizzes,
      currentQuestionNo,
      currentScore,
      selectedOptionId,
      selectedQuiz,
    },
    dispatch,
  } = useQuiz();
  const { quizId } = useParams();
  const requestedQuiz = quizzes.find((quiz: Quizzes) => quiz._id === quizId);
  const questionToDisplay = requestedQuiz?.questions[currentQuestionNo];
  const navigate = useNavigate();

  useEffect(() => {
    if (requestedQuiz) {
      dispatch({ type: "SET_SELECTED_QUIZ", payload: requestedQuiz });
    }
  }, [requestedQuiz, dispatch]);

  const correctOption = questionToDisplay?.options.find(
    (option) => option.isCorrect
  );

  const setSelectedOptionHandler = (optionId: string) => {
    dispatch({
      type: "SET_SELECTED_OPTION",
      payload: optionId,
    });
  };

  const questionAndScoreHandler = () =>
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

  const finishQuizHandler = () => {
    questionAndScoreHandler();
    navigate("/review");
  };

  console.log(selectedOptionId);
  console.log(correctOption?._id);
  console.log(requestedQuiz);
  console.log(selectedQuiz);
  return (
    <>
      <Navbar />
      {requestedQuiz ? (
        <div className="my-8 m-auto">
          <h1>{requestedQuiz?.quizName}</h1>
          <div className="flex items-center justify-between max-w-xl mx-auto mt-6">
            <span>
              Question:{currentQuestionNo + 1}/{requestedQuiz.questions.length}
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
                    selectedOptionId && option.isCorrect && "bg-green-400"
                  } ${
                    !option.isCorrect &&
                    option._id === selectedOptionId &&
                    "bg-red-500"
                  } ${
                    selectedOptionId && "pointer-events-none"
                  } text-white my-2 p-2 cursor-pointer`}
                  onClick={() => setSelectedOptionHandler(option._id)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="border-2 px-4 py-2 bg-blue-300"
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
        <div>No quiz found with associated id</div>
      )}
    </>
  );
};
