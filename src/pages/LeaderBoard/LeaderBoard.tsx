import React from "react";
import { Navbar } from "../../components";
import { useLeaderBoard } from "../../context/LeaderBoardProvider";

export const LeaderBoard = () => {
  const {
    leaderBoardData: { leaderBoard },
  } = useLeaderBoard();

  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);

  const leaderBoardToppers = sortedLeaderBoard.slice(0, 5);

  return (
    <>
      <Navbar />
      <div>
        <h2>Inside leaderboard</h2>
        <ul>
          {leaderBoardToppers.map((leaderBoard) => (
            <li key={leaderBoard._id}>
              <span>{leaderBoard.quizId.quizName}</span>
              <span>
                {leaderBoard.userId.firstname} {leaderBoard.userId.lastname}
              </span>
              <span>{leaderBoard.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
