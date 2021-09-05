import React, { useContext, createContext, useReducer } from "react";
import { leaderBoardReducer } from "../reducer/leaderBoardReducer";
import { ServerError } from "../types/serverError.types";

export type QuizInfo = {
  _id: string;
  quizName: string;
};

export type UserInfo = {
  _id: string;
  firstname: string;
  lastname: string;
};

export type UserAndQuizScore = {
  _id: string;
  userId: UserInfo;
  quizId: QuizInfo;
  score: number;
};

export type LeaderBoardState = {
  leaderBoard: UserAndQuizScore[];
  status: string;
  error: ServerError | null;
};

const initialState: LeaderBoardState = {
  leaderBoard: [],
  status: "loading",
  error: null,
};

type LeaderBoardContextType = {
  leaderBoardData: LeaderBoardState;
  leaderBoardDispatch: React.Dispatch<any>;
};

export const LeaderBoardContext = createContext<LeaderBoardContextType>({
  leaderBoardData: initialState,
  leaderBoardDispatch: () => null,
});

export const LeaderBoardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(leaderBoardReducer, initialState);

  return (
    <LeaderBoardContext.Provider
      value={{ leaderBoardData: state, leaderBoardDispatch: dispatch }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

export const useLeaderBoard = () => useContext(LeaderBoardContext);
