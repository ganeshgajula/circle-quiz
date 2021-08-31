import { QuizState } from "../context/QuizProvider";
import { Quizzes } from "../data/quiz.types";

type PointsAndQuestions = {
  points: number;
  noOfQuestions: number;
};

type QuizIdAndScore = {
  quizId: string;
  score: number;
};

export type ActionType =
  | { type: "LOAD_QUIZZES"; payload: Quizzes[] }
  | {
      type: "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION";
      payload: PointsAndQuestions;
    }
  | {
      type: "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION";
      payload: PointsAndQuestions;
    }
  | { type: "SET_SELECTED_QUIZ"; payload: Quizzes }
  | { type: "SET_SELECTED_OPTION"; payload: string }
  | { type: "ADD_TO_PLAYED_QUIZZES"; payload: Quizzes }
  | { type: "SAVE_SCORE_AND_QUIZ_DATA"; payload: QuizIdAndScore }
  | { type: "RESET_QUIZ" };

export const quizReducer = (state: QuizState, action: ActionType) => {
  switch (action.type) {
    case "LOAD_QUIZZES":
      return { ...state, quizzes: action.payload };

    case "RESET_QUIZ":
      return {
        ...state,
        currentQuestionNo: 0,
        currentScore: 0,
      };

    case "SET_SELECTED_QUIZ":
      return { ...state, selectedQuiz: action.payload };

    case "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION":
      return {
        ...state,
        currentScore: state.currentScore + action.payload.points,
        currentQuestionNo:
          state.currentQuestionNo < action.payload.noOfQuestions - 1
            ? state.currentQuestionNo + 1
            : state.currentQuestionNo,
      };

    case "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION":
      return {
        ...state,
        currentScore: state.currentScore - action.payload.points,
        currentQuestionNo:
          state.currentQuestionNo < action.payload.noOfQuestions - 1
            ? state.currentQuestionNo + 1
            : state.currentQuestionNo,
      };

    case "ADD_TO_PLAYED_QUIZZES":
      return {
        ...state,
        playedQuizzes: [...state.playedQuizzes, action.payload],
      };

    case "SAVE_SCORE_AND_QUIZ_DATA":
      return {
        ...state,
        playedQuizScores: [
          ...state.playedQuizScores,
          { quizId: action.payload.quizId, score: action.payload.score },
        ],
      };

    default:
      return state;
  }
};
