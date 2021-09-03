import axios from "axios";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { Quizzes } from "../data/quiz.types";
import { quizReducer } from "../reducer/quizReducer";

export type QuizState = {
  quizzes: Quizzes[] | [];
  currentQuestionNo: number;
  currentScore: number;
  selectedQuiz: Quizzes | null;
  selectedOptions: string[];
};

const initialState: QuizState = {
  quizzes: [],
  currentQuestionNo: 0,
  currentScore: 0,
  selectedQuiz: null,
  selectedOptions: [],
};

type LoadData = {
  success: boolean;
  quizzes: Quizzes[];
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
      const quizData = await axios.get<LoadData>(
        "http://localhost:4000/quizzes"
      );
      console.log(quizData);
      dispatch({ type: "LOAD_QUIZZES", payload: quizData.data.quizzes });
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
