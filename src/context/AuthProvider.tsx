import React from "react";
import { useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import { createContext, useContext } from "react";
import { useEffect } from "react";

export type AuthState = {
  isUserLoggedIn: boolean;
  userId: string;
  userName: string;
};

const { isUserLoggedIn } = JSON.parse(localStorage?.getItem("userInfo")!);

const initialState: AuthState = {
  isUserLoggedIn,
  userId: "",
  userName: "",
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
          username: loginStatus.userName,
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
