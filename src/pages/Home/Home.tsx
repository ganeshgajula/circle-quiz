import React from "react";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Quizzes } from "../../types/quiz.types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const {
    data: { quizzes, currentQuestionNo, status, error },
    dispatch,
  } = useQuiz();

  useEffect(() => {
    if (currentQuestionNo !== 0) {
      dispatch({ type: "RESET_QUIZ" });
    }
  }, [currentQuestionNo, dispatch]);

  console.log(quizzes);
  return (
    <>
      <Navbar />
      <div className="my-8 max-w-3xl mx-auto grid grid-cols-2 gap-12">
        {status === "loading" && "Loading.."}
        {status === "success" &&
          quizzes?.map((quiz: Quizzes) => (
            <Link
              to={`/quiz/${quiz._id}`}
              key={quiz._id}
              className="pb-4 flex flex-col items-center cursor-pointer shadow-lg"
            >
              <img src={quiz.coverImage} alt="cover" className="w-full h-52" />
              <p className="my-2 text-lg font-semibold">{quiz.quizName}</p>
              <p className="font-medium">{quiz.level}</p>
            </Link>
          ))}
        {status === "error" && error && <p>{error.message}</p>}
      </div>
    </>
  );
};

export { Home };
