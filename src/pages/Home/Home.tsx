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
      <div className="my-8 max-w-5xl m-auto grid grid-cols-2 gap-8">
        {status === "loading" && "Loading.."}
        {status === "success" &&
          quizzes?.map((quiz: Quizzes) => (
            <Link
              to={`/quiz/${quiz._id}`}
              key={quiz._id}
              className="p-4 flex flex-col items-center border-2 cursor-pointer"
            >
              <img src={quiz.coverImage} alt="cover" className="w-80 h-52" />
              <p className="p-2">{quiz.quizName}</p>
              <p>{quiz.level}</p>
            </Link>
          ))}
        {status === "error" && error && <p>{error.message}</p>}
      </div>
    </>
  );
};

export { Home };
