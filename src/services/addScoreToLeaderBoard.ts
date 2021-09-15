import axios, { AxiosError } from "axios";
import { UserAndQuizScore } from "../context/LeaderBoardProvider";
import { PlayedQuizData } from "../pages/ReviewSelection/ReviewSelection";
import { ServerError } from "../types/serverError.types";

export type AddScoreToLeaderBoard = {
  success: boolean;
  leaderBoard: UserAndQuizScore;
};

export const addScoreToLeaderBoard = async (
  userId: string | null,
  playedQuizData: PlayedQuizData
): Promise<AddScoreToLeaderBoard | ServerError> => {
  try {
    const response = await axios.post<AddScoreToLeaderBoard>(
      `https://api-circlequiz.herokuapp.com/leaderboard/${userId}`,
      playedQuizData
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
      message: "Couln't update leaderboard, Something went wrong",
    };
  }
};
