import axios, { AxiosError } from "axios";
import { UserData } from "../context/AuthProvider";
import { ServerError } from "../types/serverError.types";

export type InitializeUserData = {
  success: boolean;
  user: UserData;
};

export const initializeUser = async (
  userId: string
): Promise<InitializeUserData | ServerError> => {
  try {
    const response = await axios.get<InitializeUserData>(
      `http://localhost:4000/users/${userId}`
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
    return { success: false, message: "Couldn't initialize user data" };
  }
};
