import React from "react";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Quizzes } from "../../data/quiz.types";
import { Link } from "react-router-dom";

const Home = () => {
  const { quizzes } = useQuiz();

  console.log(quizzes);
  return (
    <>
      <Navbar />
      <div className="my-8 max-w-5xl m-auto grid grid-cols-2 gap-8">
        {quizzes?.map((quiz: Quizzes) => (
          <Link
            to={`/quiz/${quiz._id}`}
            key={quiz.quizName}
            className="p-4 flex flex-col items-center border-2 cursor-pointer"
          >
            <img src={quiz.coverImage} alt="cover" className="w-80" />
            <p className="p-2">{quiz.quizName}</p>
            <p>{quiz.level}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export { Home };
