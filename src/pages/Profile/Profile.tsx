import React, { useState } from "react";
import { toast } from "react-toastify";
import { Navbar } from "../../components";
import { useAuth } from "../../context/AuthProvider";
import { updateProfile } from "../../services/updateProfile";

export type ModifiedUserData = {
  firstname: string | undefined;
  lastname: string | undefined;
};

export const Profile = () => {
  const {
    authData: { user, userId },
    authDispatch,
    logoutUser,
  } = useAuth();

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);

  const modifiedUserData: ModifiedUserData = {
    firstname,
    lastname,
  };

  const updateProfileHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateProfile(userId, modifiedUserData);

    if ("updatedUser" in response) {
      authDispatch({
        type: "UPDATE_USER_DATA",
        payload: response.updatedUser,
      });
      return toast.success("Profile details updated successfully.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }

    return toast.error(response.message, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto my-6">
        <span className="flex items-center justify-between py-2 mb-10">
          <h1 className="text-3xl">Account Details</h1>
          <button
            className="bg-red-500 text-white font-medium px-2 py-1 rounded-md"
            onClick={() => {
              authDispatch({ type: "LOGOUT_USER" });
              logoutUser();
            }}
          >
            Logout
          </button>
        </span>
        <div className="border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="font-medium text-xl py-3">Edit Profile</h2>
          <form onSubmit={updateProfileHandler}>
            <div className="flex justify-between items-center my-4">
              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="text-left pb-1 font-medium text-gray-700"
                >
                  firstname
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-1 rounded-md"
                  placeholder="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastname"
                  className="text-left pb-1 font-medium text-gray-700"
                >
                  lastname
                </label>
                <input
                  type="text"
                  className="border border-gray-300 p-1 rounded-md"
                  placeholder="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-left pb-1 font-medium text-gray-700"
              >
                email
              </label>
              <div className="p-1 border border-gray-300 rounded-md text-left cursor-not-allowed">
                {user?.email}
              </div>
            </div>
            <button
              type="submit"
              className="my-4 py-1 px-3 rounded-md bg-blue-500 text-white font-semibold text-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
