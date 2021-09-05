import axios, { AxiosError } from "axios";
import { UserSignupData } from "../pages/Signup/Signup";
import { ServerError } from "../types/serverError.types";

export type RegisteredUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  quizzesPlayed: [];
};

export type SignupResponse = {
  success: boolean;
  user: RegisteredUser;
};

export const userSignup = async (
  userCredentials: UserSignupData
): Promise<SignupResponse | ServerError> => {
  try {
    const response = await axios.post<SignupResponse>(
      "http://localhost:4000/users/signup",
      userCredentials
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
      message: "Couldn't register user. Something went wrong.",
    };
  }
};
