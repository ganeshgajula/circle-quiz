import React from "react";
import logo from "../../assets/transparent-logo.png";
import { CloseIcon } from "../../assets/svgs";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export const SideDrawer = ({
  setShowSideDrawer,
}: {
  setShowSideDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { authDispatch, logoutUser } = useAuth();

  return (
    <div className="flex items-center justify-center fixed h-full w-full top-0 left-0 z-10 modal-bg">
      <div className="fixed top-0 left-0 w-6/12 h-full bg-white z-10 px-2 py-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="brand-logo" className="h-10 w-32" />
          </Link>
          <span onClick={() => setShowSideDrawer(false)}>
            <CloseIcon />
          </span>
        </div>

        <div className="flex flex-col items-start gap-3 mt-4">
          <Link to="/" className="p-2">
            Home
          </Link>
          <Link to="/playedquizzes" className="p-2">
            Played Quizzes
          </Link>
          <Link to="/leaderboard" className="p-2">
            Leaderboard
          </Link>
          <Link to="/profile" className="p-2">
            Account
          </Link>
          <p
            className="p-2"
            onClick={() => {
              authDispatch({ type: "LOGOUT_USER" });
              logoutUser();
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};
