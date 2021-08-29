import React from "react";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Quizzes } from "../../data/quiz.types";

const Home = () => {
  const { quizzes } = useQuiz();

  console.log(quizzes);
  return (
    <>
      <Navbar />
      <div className="m-8">
        {quizzes?.map((quiz: Quizzes) => (
          <div key={quiz.quizName} className="flex items-center max-w-sm p-4">
            <img src={quiz.coverImage} alt="" />
            <h3 className="p-2">{quiz.quizName}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export { Home };
