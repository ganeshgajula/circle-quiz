import axios, { AxiosError } from "axios";
import { UserAndQuizScore } from "../context/LeaderBoardProvider";
import { ServerError } from "../types/serverError.types";

type LoadLeaderBoardData = {
  success: boolean;
  leaderBoardToppers: UserAndQuizScore[];
};

export const initializeLeaderBoard = async () => {
  try {
    const response = await axios.get<LoadLeaderBoardData>(
      "https://api-circlequiz.herokuapp.com/leaderboard"
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }

    console.log(error);
    return {
      success: false,
      message: "Couldn't get leaderBoard data, Something went wrong",
    };
  }
};
