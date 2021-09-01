import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { toast } from "react-toastify";

export const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const allFieldsEntered = firstname && lastname && email && password;

  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, status } = await axios.post(
      "http://localhost:4000/users/signup",
      {
        firstname,
        lastname,
        email,
        password,
      }
    );

    if (status === 201) {
      toast.success("Sign up successful, Kindly login!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      navigate("/login", { replace: true });
    }

    if ("message" in data) {
      toast.error(data.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="my-8 text-3xl font-semibold">Sign up</h1>
      <form onSubmit={signupHandler} className="flex flex-col max-w-xs mx-auto">
        <input
          type="text"
          value={firstname}
          placeholder="Enter firstname"
          className="my-4 p-2 border border-gray-200 rounded-md"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          value={lastname}
          placeholder="Enter lastname"
          className="my-4 p-2 border border-gray-200 rounded-md"
          onChange={(e) => setLastname(e.target.value)}
        />
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
            !allFieldsEntered && "cursor-default opacity-60"
          } mt-6 py-2 rounded-md text-xl bg-blue-400 text-white font-semibold`}
          disabled={!allFieldsEntered}
        >
          Sign up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?
        <span
          className="cursor-pointer hover:underline ml-1"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};
