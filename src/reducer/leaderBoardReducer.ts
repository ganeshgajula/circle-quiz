import {
  LeaderBoardState,
  UserAndQuizScore,
} from "../context/LeaderBoardProvider";

type LeaderBoardActionType =
  | {
      type: "ADD_SCORE_ONTO_LEADERBOARD";
      payload: UserAndQuizScore;
    }
  | { type: "LOAD_LEADERBOARD"; payload: UserAndQuizScore[] };

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

    default:
      return state;
  }
};
