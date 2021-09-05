import axios, { AxiosError } from "axios";
import { LoginCredentials } from "../pages/Login/Login";
import { ServerError } from "../types/serverError.types";

export type LoginData = {
  success: boolean;
  userId: string;
  firstName: string;
};

export const userLogin = async (
  loginCredentials: LoginCredentials
): Promise<LoginData | ServerError> => {
  try {
    const response = await axios.post<LoginData>(
      "http://localhost:4000/users/authenticate",
      {},
      { headers: loginCredentials }
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
    return { success: false, message: "Login failed, Something went wrong" };
  }
};
