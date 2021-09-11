import { AuthState, UserData } from "../context/AuthProvider";
import { ServerError } from "../types/serverError.types";

export type UserCredentails = {
  userId: string;
  userName: string;
  token: string;
};

export type AuthActionType =
  | {
      type: "SET_USER_CREDENTIALS";
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
        userId: action.payload.userId,
        userName: action.payload.userName,
        token: action.payload.token,
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
        token: null,
        userId: null,
        userName: null,
        user: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
