import axios, { AxiosError } from "axios";
import { Quizzes } from "../types/quiz.types";
import { ServerError } from "../types/serverError.types";

export type LoadData = {
  success: boolean;
  quizzes: Quizzes[];
};

export const getAllQuizzes = async (): Promise<LoadData | ServerError> => {
  try {
    const response = await axios.get<LoadData>("http://localhost:4000/quizzes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }

    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
