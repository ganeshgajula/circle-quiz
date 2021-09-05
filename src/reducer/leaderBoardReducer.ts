import {
  LeaderBoardState,
  UserAndQuizScore,
} from "../context/LeaderBoardProvider";
import { ServerError } from "../types/serverError.types";

type LeaderBoardActionType =
  | {
      type: "ADD_SCORE_ONTO_LEADERBOARD";
      payload: UserAndQuizScore;
    }
  | { type: "LOAD_LEADERBOARD"; payload: UserAndQuizScore[] }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_ERROR"; payload: ServerError };

export const leaderBoardReducer = (
  state: LeaderBoardState,
  action: LeaderBoardActionType
) => {
  switch (action.type) {
    case "LOAD_LEADERBOARD":
      return { ...state, leaderBoard: action.payload };

    case "ADD_SCORE_ONTO_LEADERBOARD":
      return {
        ...state,
        leaderBoard: state.leaderBoard.concat(action.payload),
      };

    case "SET_STATUS":
      return { ...state, status: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
