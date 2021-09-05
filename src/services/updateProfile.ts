import axios, { AxiosError } from "axios";
import { UserData } from "../context/AuthProvider";
import { ModifiedUserData } from "../pages/Profile/Profile";
import { ServerError } from "../types/serverError.types";

export type UserProfileUpdate = {
  success: boolean;
  updatedUser: UserData;
};

export const updateProfile = async (
  userId: string,
  modifiedUserData: ModifiedUserData
): Promise<UserProfileUpdate | ServerError> => {
  try {
    const response = await axios.post<UserProfileUpdate>(
      `http://localhost:4000/users/${userId}`,
      modifiedUserData
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
      message: "Couldn't update user data. Something went wrong",
    };
  }
};
