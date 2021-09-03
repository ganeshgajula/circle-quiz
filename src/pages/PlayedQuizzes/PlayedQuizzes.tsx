import React from "react";
import { Navbar } from "../../components";
import { QuizAndScoreData, useAuth } from "../../context/AuthProvider";

export const PlayedQuizzes = () => {
  const {
    authData: { user },
  } = useAuth();

  return (
    <>
      <Navbar />
      <h2>Inside played quizzes</h2>
      <div className="flex justify-between max-w-xl mx-auto">
        {user?.quizzesPlayed.map((quiz: QuizAndScoreData) => (
          <div key={quiz._id} className="flex flex-col items-center my-4">
            <img src={quiz.quizId.coverImage} alt="" />
            <p>{quiz.quizId.quizName}</p>
            <p>{quiz.quizId.level}</p>
            <p>{quiz.score}</p>
          </div>
        ))}
      </div>
    </>
  );
};
