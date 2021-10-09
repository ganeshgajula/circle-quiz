import React from "react";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { Quizzes } from "../../types/quiz.types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllQuizzes } from "../../services/getAllQuizzes";

const Home = () => {
  const {
    data: { quizzes, currentQuestionNo, status, error },
    dispatch,
  } = useQuiz();

  useEffect(() => {
    (async () => {
      const response = await getAllQuizzes();

      if ("quizzes" in response) {
        dispatch({ type: "SET_STATUS", payload: "success" });
        return dispatch({ type: "LOAD_QUIZZES", payload: response.quizzes });
      }

      dispatch({ type: "SET_STATUS", payload: "error" });
      return dispatch({ type: "SET_ERROR", payload: response });
    })();
  }, [dispatch]);

  useEffect(() => {
    if (currentQuestionNo !== 0) {
      dispatch({ type: "RESET_QUIZ" });
    }
  }, [currentQuestionNo, dispatch]);

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
