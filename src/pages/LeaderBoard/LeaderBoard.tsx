import React, { useEffect } from "react";
import { initializeLeaderBoard } from "../../services/initializeLeaderBoard";
import { Navbar } from "../../components";
import { useLeaderBoard } from "../../context/LeaderBoardProvider";

export const LeaderBoard = () => {
  const {
    leaderBoardData: { leaderBoard, status, error },
    leaderBoardDispatch,
  } = useLeaderBoard();

  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);

  const leaderBoardToppers = sortedLeaderBoard.slice(0, 5);

  useEffect(() => {
    (async () => {
      const response = await initializeLeaderBoard();

      if ("leaderBoardToppers" in response) {
        leaderBoardDispatch({ type: "SET_STATUS", payload: "success" });
        return leaderBoardDispatch({
          type: "LOAD_LEADERBOARD",
          payload: response.leaderBoardToppers,
        });
      }

      leaderBoardDispatch({ type: "SET_STATUS", payload: "error" });
      return leaderBoardDispatch({ type: "SET_ERROR", payload: response });
    })();
  }, [leaderBoardDispatch]);

  return (
    <>
      <Navbar />
      <div className="my-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold">LeaderBoard</h1>
        <div className="flex items-center justify-between mt-8 mb-1 px-2 font-semibold text-lg">
          <span>Sr.No</span>
          <span>Name</span>
          <span>Quiz Name</span>
          <span>Score</span>
        </div>
        <ul className="mb-4">
          {status === "loading" && <p>Loading...</p>}
          {status === "success" &&
            leaderBoardToppers.map((leaderBoard, index) => (
              <li
                key={leaderBoard._id}
                className="border border-gray-200 flex items-center justify-between p-3"
              >
                <span>{index + 1}</span>
                <span>
                  {leaderBoard.userId.firstname} {leaderBoard.userId.lastname}
                </span>
                <span>{leaderBoard.quizId.quizName}</span>
                <span>{leaderBoard.score}</span>
              </li>
            ))}
          {status === "error" && error && <p>{error.message}</p>}
        </ul>
      </div>
    </>
  );
};
