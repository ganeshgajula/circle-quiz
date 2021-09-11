import React from "react";
import axios from "axios";
import { useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import { createContext, useContext } from "react";
import { ServerError } from "../types/serverError.types";

export type AuthState = {
  token: string | null;
  userId: string | null;
  userName: string | null;
  user: UserData | null;
  error: ServerError | null;
};

export type QuizData = {
  _id: string;
  quizName: string;
  level: string;
  coverImage: string;
};

export type QuizAndScoreData = {
  _id: string;
  score: number;
  quizId: QuizData;
};

export type UserData = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  quizzesPlayed: QuizAndScoreData[];
};

const {
  token: savedToken,
  userId: savedUserId,
  userName: savedUserName,
} = JSON.parse(localStorage?.getItem("userInfo")!) || {
  token: null,
  userId: null,
  userName: null,
};

const initialState: AuthState = {
  token: savedToken,
  userId: savedUserId,
  userName: savedUserName,
  user: null,
  error: null,
};

export type AuthContextType = {
  authData: AuthState;
  authDispatch: React.Dispatch<any>;
  loginUser: (token: string | null) => void;
};

const loginUser = (token: string | any) => {
  setupAuthHeaderForServiceCalls(token);
};

export const AuthContext = createContext<AuthContextType>({
  authData: initialState,
  authDispatch: () => null,
  loginUser,
});

const setupAuthHeaderForServiceCalls = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  state.token && setupAuthHeaderForServiceCalls(state.token);

  return (
    <AuthContext.Provider
      value={{
        authData: state,
        authDispatch: dispatch,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
