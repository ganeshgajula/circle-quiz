import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Options, Questions, Quizzes } from "../../data/quiz.types";

export const SelectedQuiz = () => {
  const { quizzes } = useQuiz();
  const { quizId } = useParams();

  const requestedQuiz = quizzes.find(
    (quiz: Quizzes) => String(quiz._id) === quizId
  );

  console.log(requestedQuiz);
  return (
    <>
      <Navbar />
      <div className="my-8 max-w-full m-auto">
        <h1>{requestedQuiz?.quizName}</h1>
        {requestedQuiz?.questions.map((question: Questions) => (
          <div key={question._id} className="bg-gray-400 my-8 max-w-xl m-auto">
            <p>{question.question}</p>
            <ul>
              {question.options.map((option: Options) => (
                <li key={option._id}>{option.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
