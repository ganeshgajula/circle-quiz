import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { Quizzes } from "../data/quiz.types";

export type QuizState = {
  quizzes: Quizzes[] | [];
};

const initialState: QuizState = {
  quizzes: [],
};

type LoadData = {
  success: boolean;
  quizzes: Quizzes[];
};

export const QuizContext = createContext({ quizzes: initialState.quizzes });

export const QuizProvider: React.FC = ({ children }) => {
  const [quizArray, setQuizArray] = useState<Quizzes[] | []>([]);
  useEffect(() => {
    (async () => {
      const quizData = await axios.get<LoadData>(
        "http://localhost:4000/quizzes"
      );
      console.log(quizData);
      setQuizArray(quizData.data.quizzes);
    })();
  }, []);

  return (
    <QuizContext.Provider value={{ quizzes: quizArray }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
