import axios, { AxiosError } from "axios";
import { UserData } from "../context/AuthProvider";
import { PlayedQuizData } from "../pages/ReviewSelection/ReviewSelection";
import { ServerError } from "../types/serverError.types";

export type AppendPlayedQuizzes = {
  success: boolean;
  updatedUser: UserData;
};

export const addToPlayedQuizzes = async (
  userId: string | null,
  playedQuizData: PlayedQuizData
): Promise<AppendPlayedQuizzes | ServerError> => {
  try {
    const response = await axios.post<AppendPlayedQuizzes>(
      `http://localhost:4000/users/${userId}/playedquizzes`,
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
    return { success: false, message: "Couldn't update played quizzes data" };
  }
};
