import React from "react";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Quizzes } from "../../data/quiz.types";

export const PlayedQuizzes = () => {
  const {
    data: { playedQuizzes },
  } = useQuiz();

  return (
    <>
      <Navbar />
      <div className="flex justify-between max-w-xl mx-auto">
        {playedQuizzes.map((quiz: Quizzes) => (
          <div key={quiz._id} className="flex flex-col items-center my-4">
            <img src={quiz.coverImage} alt="" />
            <p>{quiz.quizName}</p>
            <p>{quiz.level}</p>
          </div>
        ))}
      </div>
    </>
  );
};
