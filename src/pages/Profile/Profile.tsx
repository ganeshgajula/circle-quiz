import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { useAuth, UserData } from "../../context/AuthProvider";

export type UserProfileUpdate = {
  success: boolean;
  updatedUser: UserData;
};

export const Profile = () => {
  const {
    authData: { user, userId },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);

  const updateProfileHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, status } = await axios.post<UserProfileUpdate>(
      `http://localhost:4000/users/${userId}`,
      { firstname, lastname }
    );

    if (status === 201) {
      authDispatch({ type: "UPDATE_USER_DATA", payload: data.updatedUser });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto my-6">
        <span className="flex items-center justify-between">
          <h2>Edit Profile</h2>
          <button
            className="bg-red-500 text-white font-medium px-2 py-1 rounded-md"
            onClick={() => {
              authDispatch({ type: "LOGOUT_USER" });
              localStorage?.removeItem("userInfo");
              navigate("/");
            }}
          >
            Logout
          </button>
        </span>
        <form onSubmit={updateProfileHandler} className="flex flex-col">
          <div>
            <input
              type="text"
              placeholder="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <input type="email" placeholder={user?.email} />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};
