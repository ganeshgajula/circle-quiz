import { QuizState } from "../context/QuizProvider";
import { Quizzes } from "../data/quiz.types";

export type ActionType = {
  type: string;
  payload: Quizzes[];
};

export const quizReducer = (state: QuizState, action: ActionType) => {
  switch (action.type) {
    case "LOAD_QUIZZES":
      return { ...state, quizzes: action.payload };

    case "LOAD_NEXT_QUESTION":
      return { ...state, currentQuestionNo: state.currentQuestionNo + 1 };

    default:
      return state;
  }
};
