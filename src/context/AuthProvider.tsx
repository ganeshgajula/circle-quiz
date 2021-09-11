import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import { createContext, useContext } from "react";
import { ServerError } from "../types/serverError.types";
import { NavigateFunction } from "react-router";

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

const setupAuthHeaderForServiceCalls = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

const setupAuthExceptionHandler = (
  logoutUser: () => void,
  navigate: NavigateFunction
) => {
  console.log("exception");
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

const logoutUser = () => {
  localStorage?.removeItem("userInfo");
  setupAuthHeaderForServiceCalls(null);
};

export type AuthContextType = {
  authData: AuthState;
  authDispatch: React.Dispatch<any>;
  setupAuthHeader: (token: string | null) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authData: initialState,
  authDispatch: () => null,
  setupAuthHeader: setupAuthHeaderForServiceCalls,
  logoutUser,
});

export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setupAuthExceptionHandler(logoutUser, navigate);
  }, [navigate]);

  state.token && setupAuthHeaderForServiceCalls(state.token);

  return (
    <AuthContext.Provider
      value={{
        authData: state,
        authDispatch: dispatch,
        setupAuthHeader: setupAuthHeaderForServiceCalls,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
