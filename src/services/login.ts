import axios, { AxiosError } from "axios";
import { LoginCredentials } from "../pages/Login/Login";
import { ServerError } from "../types/serverError.types";

export type UserDetails = {
  userId: string;
  firstName: string;
  token: string;
};

export type LoginData = {
  success: boolean;
  userDetails: UserDetails;
};

export const userLogin = async (
  loginCredentials: LoginCredentials
): Promise<LoginData | ServerError> => {
  try {
    const response = await axios.post<LoginData>(
      "https://api-circlequiz.herokuapp.com/users/login",
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
