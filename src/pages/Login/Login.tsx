import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { userLogin } from "../../services/login";

type LocationState = {
  from: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestLogin, setGuestLogin] = useState(false);
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;

  const { setupAuthHeader } = useAuth();

  const allFieldsEntered = email && password;

  const normalLoginCredentials: LoginCredentials = {
    email,
    password,
  };

  const guestLoginCredentials: LoginCredentials = {
    email: "test@gmail.com",
    password: "test",
  };

  const loginCredentials = !guestLogin
    ? normalLoginCredentials
    : guestLoginCredentials;

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Loggin in...", {
      position: "bottom-center",
      autoClose: 2000,
    });

    const response = await userLogin(loginCredentials);

    if ("userDetails" in response) {
      authDispatch({
        type: "SET_USER_CREDENTIALS",
        payload: {
          userId: response.userDetails.userId,
          userName: response.userDetails.firstName,
          token: response.userDetails.token,
        },
      });
      localStorage?.setItem(
        "userInfo",
        JSON.stringify({
          token: response.userDetails.token,
          userId: response.userDetails.userId,
          userName: response.userDetails.firstName,
        })
      );
      setupAuthHeader(response.userDetails.token);
      navigate(state?.from ? state.from : "/");
      return toast.success("Login Successful", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }

    return toast.error(response.message, {
      position: "bottom-center",
      autoClose: 4000,
    });
  };

  return (
    <div>
      <h1 className="my-8 text-3xl font-semibold">Log in to Circle Quiz</h1>
      <form onSubmit={loginHandler} className="flex flex-col max-w-xs mx-auto">
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          className="my-4 p-2 border border-gray-200 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          className="my-4 p-2 border border-gray-200 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`${
            !allFieldsEntered && "opacity-60 cursor-default"
          } mt-6 py-2 rounded-md text-xl bg-blue-400 text-white font-semibold`}
          disabled={!allFieldsEntered}
        >
          Login
        </button>
        <button
          type="submit"
          className="mt-6 py-2 rounded-md text-xl bg-blue-400 text-white font-semibold"
          onClick={() => setGuestLogin(true)}
        >
          Login as Guest
        </button>
      </form>
      <p className="mt-4">
        Don't have an account yet?
        <span
          className="cursor-pointer hover:underline ml-1"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
};
