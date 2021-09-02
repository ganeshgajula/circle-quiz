import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "../../components";
import { useAuth } from "../../context/AuthProvider";

export type LoginData = {
  success: boolean;
  userId?: string;
  firstName?: string;
  message?: string;
};

type LocationState = {
  from: string;
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;

  const allFieldsEntered = email && password;

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post<LoginData>(
      "http://localhost:4000/users/authenticate",
      {},
      { headers: { email, password } }
    );

    if ("userId" in data) {
      toast.success("Login Successful", {
        position: "bottom-center",
        autoClose: 2000,
      });
      localStorage?.setItem(
        "userInfo",
        JSON.stringify({
          isUserLoggedIn: true,
          userId: data.userId,
          userName: data.firstName,
        })
      );
      authDispatch({
        type: "SET_USER_CREDENTIALS",
        payload: {
          loginStatus: true,
          userId: data.userId,
          userName: data.firstName,
        },
      });
      navigate(state?.from ? state.from : "/");
    }

    if ("message" in data) {
      toast.error(data.message, {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="my-8 text-3xl font-semibold">Login</h1>
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
