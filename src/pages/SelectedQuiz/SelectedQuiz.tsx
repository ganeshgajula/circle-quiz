import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Options, Quizzes } from "../../data/quiz.types";

export const SelectedQuiz = () => {
  const {
    data: { quizzes, currentQuestionNo, currentScore },
    dispatch,
  } = useQuiz();
  const { quizId } = useParams();

  const requestedQuiz = quizzes.find(
    (quiz: Quizzes) => String(quiz._id) === quizId
  );

  const questionToDisplay = requestedQuiz?.questions[currentQuestionNo];

  console.log(requestedQuiz);
  return (
    <>
      <Navbar />
      <div className="my-8 m-auto">
        <h1>{requestedQuiz?.quizName}</h1>
        <div className="flex items-center justify-between max-w-xl mx-auto mt-6">
          <span>
            Question:{currentQuestionNo}/{requestedQuiz?.questions.length}
          </span>
          <span>Score:{currentScore}</span>
        </div>
        <div className="bg-gray-400 my-8 max-w-xl m-auto">
          <p>{questionToDisplay?.question}</p>
          <ul>
            {questionToDisplay?.options.map((option: Options) => (
              <li key={option._id}>{option.text}</li>
            ))}
          </ul>
        </div>
        <button
          className="border-2 px-4 py-2 bg-blue-300"
          onClick={() => dispatch({ type: "LOAD_NEXT_QUESTION" })}
        >
          Next
        </button>
      </div>
    </>
  );
};
