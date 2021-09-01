import React from "react";
import logo from "../../assets/transparent-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const {
    authData: { isUserLoggedIn },
    authDispatch,
  } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center max-w-full px-10 py-2 shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="brand-logo" className="h-14 w-44" />
        </Link>
        <Link to="/" className="ml-8 font-semibold">
          All Quizzes
        </Link>
        <Link to="/playedquizzes" className="ml-4 font-semibold">
          Played Quizzes
        </Link>
      </div>
      <button
        className="font-semibold px-5 py-2 bg-blue-500 text-white text-xl hover:bg-blue-700"
        onClick={() => {
          localStorage?.removeItem("userInfo");
          authDispatch({ type: "LOGOUT_USER" });
          navigate("/");
        }}
      >
        {!isUserLoggedIn ? "Login" : "Logout"}
      </button>
    </nav>
  );
};

export { Navbar };
