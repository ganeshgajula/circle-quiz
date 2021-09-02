import { AuthState } from "../context/AuthProvider";

export type UserData = {
  loginStatus: boolean;
  userId: string;
  userName: string;
};

export type AuthActionType =
  | {
      type: "SET_USER_CREDENTIALS";
      payload: UserData;
    }
  | { type: "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE"; payload: UserData }
  | { type: "LOGOUT_USER" };

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case "SET_USER_CREDENTIALS":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: state.userId,
        userName: action.payload.userName,
      };

    case "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        isUserLoggedIn: false,
        userId: "",
        userName: "",
      };

    default:
      return state;
  }
};
