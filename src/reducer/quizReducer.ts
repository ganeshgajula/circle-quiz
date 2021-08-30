import { QuizState } from "../context/QuizProvider";
import { Quizzes } from "../data/quiz.types";

export type ActionType =
  | { type: "LOAD_QUIZZES"; payload: Quizzes[] }
  | { type: "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION"; payload: number }
  | { type: "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION"; payload: number }
  | { type: "SET_SELECTED_OPTION"; payload: number }
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
        selectedOptionId: null,
      };

    case "SET_SELECTED_OPTION":
      return { ...state, selectedOptionId: action.payload };

    case "INCREMENT_SCORE_AND_LOAD_NEXT_QUESTION":
      return {
        ...state,
        currentScore: state.currentScore + action.payload,
        currentQuestionNo: state.currentQuestionNo + 1,
        selectedOptionId: null,
      };

    case "DECREMENT_SCORE_AND_LOAD_NEXT_QUESTION":
      return {
        ...state,
        currentScore: state.currentScore - action.payload,
        currentQuestionNo: state.currentQuestionNo + 1,
        selectedOptionId: null,
      };

    default:
      return state;
  }
};
