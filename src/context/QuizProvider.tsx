import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { Quizzes } from "../types/quiz.types";
import { quizReducer } from "../reducer/quizReducer";
import { getAllQuizzes } from "../services/getAllQuizzes";
import { ServerError } from "../types/serverError.types";

export type QuizState = {
  quizzes: Quizzes[] | [];
  currentQuestionNo: number;
  currentScore: number;
  selectedQuiz: Quizzes | null;
  selectedOptions: string[];
  status: string;
  error: ServerError | null;
};

const initialState: QuizState = {
  quizzes: [],
  currentQuestionNo: 0,
  currentScore: 0,
  selectedQuiz: null,
  selectedOptions: [],
  status: "loading",
  error: null,
};

type QuizContextType = {
  data: QuizState;
  dispatch: React.Dispatch<any>;
};

export const QuizContext = createContext<QuizContextType>({
  data: initialState,
  dispatch: () => null,
});

export const QuizProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

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
  }, []);

  return (
    <QuizContext.Provider
      value={{
        data: state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
