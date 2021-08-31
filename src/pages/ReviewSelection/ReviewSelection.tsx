import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { useQuiz } from "../../context/QuizProvider";
import { PlayedQuizAndScore } from "../../context/QuizProvider";
import { Options, Questions } from "../../data/quiz.types";

export const ReviewSelection = () => {
  const navigate = useNavigate();

  const {
    data: { currentScore, selectedQuiz, playedQuizScores, selectedOptions },
    dispatch,
  } = useQuiz();

  const isQuizAlreadyPlayed = playedQuizScores.find(
    (quiz: PlayedQuizAndScore) => quiz.quizId === selectedQuiz?._id
  );

  useEffect(() => {
    if (!isQuizAlreadyPlayed) {
      dispatch({
        type: "SAVE_SCORE_AND_QUIZ_DATA",
        payload: { quizId: selectedQuiz?._id, score: currentScore },
      });
    }
  }, [isQuizAlreadyPlayed, currentScore, selectedQuiz?._id, dispatch]);

  console.log(selectedOptions);
  console.log(playedQuizScores);
  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-4">
        <h2>Inside review selection</h2>
        <p>Yay!! Your score is {currentScore}</p>
        <button
          className="bg-blue-400 p-2 mt-4"
          onClick={() => {
            navigate("/", { replace: true });
            dispatch({ type: "RESET_QUIZ" });
          }}
        >
          Go to Home
        </button>
        <div className="my-6">
          <h1>{selectedQuiz?.quizName}</h1>
          {selectedQuiz?.questions.map((question: Questions) => (
            <div className="my-10 pt-2 bg-gray-100" key={question._id}>
              <p className="my-2">{question.question}</p>
              <ul>
                {question.options.map((option: Options) => (
                  <li
                    key={option._id}
                    className={`${option.isCorrect && "bg-green-400"} ${
                      selectedOptions.includes(option._id) &&
                      !option.isCorrect &&
                      "bg-red-500"
                    } py-2 cursor-default`}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
