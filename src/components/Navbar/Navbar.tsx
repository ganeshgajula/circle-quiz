import React from "react";
import logo from "../../assets/transparent-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { User } from "react-feather";

const Navbar = () => {
  const {
    authData: { token, userName },
  } = useAuth();

  return (
    <nav className="flex justify-between items-center max-w-full px-10 py-2 shadow-md sticky top-0 z-10 bg-white">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="brand-logo" className="h-14 w-44" />
        </Link>
        <Link to="/" className="ml-8 font-semibold">
          Home
        </Link>
        <Link to="/playedquizzes" className="ml-4 font-semibold">
          Played Quizzes
        </Link>
        <Link to="/leaderboard" className="ml-4 font-semibold">
          Leaderboard
        </Link>
      </div>
      {token && (
        <div className="flex items-center">
          <Link
            to="/profile"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <User size={22} />
            <span className="font-medium">Hi {userName}</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export { Navbar };
