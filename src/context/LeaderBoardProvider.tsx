import axios from "axios";
import React, { useContext, createContext, useReducer, useEffect } from "react";
import { leaderBoardReducer } from "../reducer/leaderBoardReducer";

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
};

const initialState: LeaderBoardState = {
  leaderBoard: [],
};

type LeaderBoardContextType = {
  leaderBoardData: LeaderBoardState;
  leaderBoardDispatch: React.Dispatch<any>;
};

type LoadLeaderBoardData = {
  success: boolean;
  leaderBoardToppers: UserAndQuizScore[];
};

export const LeaderBoardContext = createContext<LeaderBoardContextType>({
  leaderBoardData: initialState,
  leaderBoardDispatch: () => null,
});

export const LeaderBoardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(leaderBoardReducer, initialState);

  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get<LoadLeaderBoardData>(
        "http://localhost:4000/leaderboard"
      );

      if (status === 200) {
        dispatch({
          type: "LOAD_LEADERBOARD",
          payload: data.leaderBoardToppers,
        });
      }
    })();
  }, []);

  return (
    <LeaderBoardContext.Provider
      value={{ leaderBoardData: state, leaderBoardDispatch: dispatch }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

export const useLeaderBoard = () => useContext(LeaderBoardContext);
