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
      <div>
        <h2>Inside leaderboard</h2>
        <ul>
          {status === "loading" && <p>Loading...</p>}
          {status === "success" &&
            leaderBoardToppers.map((leaderBoard) => (
              <li key={leaderBoard._id}>
                <span>{leaderBoard.quizId.quizName}</span>
                <span>
                  {leaderBoard.userId.firstname} {leaderBoard.userId.lastname}
                </span>
                <span>{leaderBoard.score}</span>
              </li>
            ))}
          {status === "error" && error && <p>{error.message}</p>}
        </ul>
      </div>
    </>
  );
};
