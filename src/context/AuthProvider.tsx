import React from "react";
import { useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import { ServerError } from "../types/serverError.types";

export type AuthState = {
  isUserLoggedIn: boolean;
  userId: string;
  userName: string;
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

const userLoginStatus = JSON.parse(localStorage?.getItem("userInfo")!);

const initialState: AuthState = {
  isUserLoggedIn: userLoginStatus?.isUserLoggedIn,
  userId: "",
  userName: "",
  user: null,
  error: null,
};

export type AuthContextType = {
  authData: AuthState;
  authDispatch: React.Dispatch<any>;
};

export const AuthContext = createContext<AuthContextType>({
  authData: initialState,
  authDispatch: () => null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loginStatus: AuthState = JSON.parse(
      localStorage?.getItem("userInfo")!
    );

    if (loginStatus) {
      dispatch({
        type: "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE",
        payload: {
          loginStatus: loginStatus.isUserLoggedIn,
          userId: loginStatus.userId,
          userName: loginStatus.userName,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData: state,
        authDispatch: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
