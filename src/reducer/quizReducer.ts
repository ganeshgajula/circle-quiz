import { QuizState } from "../context/QuizProvider";
import { Quizzes } from "../types/quiz.types";
import { ServerError } from "../types/serverError.types";

type PointsAndQuestions = {
  points: number;
  noOfQuestions: number;
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
  | { type: "SET_SELECTED_OPTIONS"; payload: string }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_ERROR"; payload: ServerError }
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
        selectedQuiz: null,
        selectedOptions: [],
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

    case "SET_SELECTED_OPTIONS":
      return {
        ...state,
        selectedOptions: [...state.selectedOptions, action.payload],
      };

    case "SET_STATUS":
      return { ...state, status: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
