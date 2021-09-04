import { AuthState, UserData } from "../context/AuthProvider";
import { ServerError } from "../types/serverError.types";

export type UserCredentails = {
  loginStatus: boolean;
  userId: string;
  userName: string;
};

export type AuthActionType =
  | {
      type: "SET_USER_CREDENTIALS";
      payload: UserCredentails;
    }
  | {
      type: "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE";
      payload: UserCredentails;
    }
  | { type: "INITIALIZE_USER"; payload: UserData }
  | { type: "SAVE_PLAYED_QUIZ_DATA"; payload: UserData }
  | { type: "UPDATE_USER_DATA"; payload: UserData }
  | { type: "SET_ERROR"; payload: ServerError }
  | { type: "LOGOUT_USER" };

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case "SET_USER_CREDENTIALS":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };

    case "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };

    case "INITIALIZE_USER":
      return {
        ...state,
        user: action.payload,
        userName: action.payload.firstname,
      };

    case "SAVE_PLAYED_QUIZ_DATA":
      return {
        ...state,
        user: action.payload,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: action.payload,
        userName: action.payload.firstname,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        isUserLoggedIn: false,
        userId: "",
        userName: "",
        user: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
