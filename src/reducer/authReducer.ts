import { AuthState } from "../context/AuthProvider";

export type UserData = {
  loginStatus: boolean;
  userId: string;
  username: string;
};

export type AuthActionType =
  | {
      type: "SET_USER_CREDENTIALS";
      payload: UserData;
    }
  | { type: "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE"; payload: UserData };

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case "SET_USER_CREDENTIALS":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: state.userId,
        username: action.payload.username,
      };

    case "SET_USER_CREDENTIALS_FROM_LOCAL_STORAGE":
      return {
        ...state,
        isUserLoggedIn: action.payload.loginStatus,
        userId: action.payload.userId,
        username: action.payload.username,
      };

    default:
      return state;
  }
};
