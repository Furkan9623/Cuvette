import React, { useState, useEffect } from "react";

const ReturnJourney = ({ difficulty }) => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(
    difficulty === "easy" ? 40 : difficulty === "medium" ? 30 : 20
  );
  const [boxColor, setBoxColor] = useState("red");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoxColor(Math.random() < 0.5 ? "green" : "red");
    }, Math.floor(Math.random() * 1000) + 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setGameOver(true);
    }, timer * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [timer]);

  const handleClick = () => {
    if (boxColor === "green" && !gameOver) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    if (
      score >= (difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 25)
    ) {
      setGameOver(true);
    }
  }, [score, difficulty]);

  return (
    <div>
      {gameOver ? (
        <div>
          {score >=
          (difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 25) ? (
            <div>You win!</div>
          ) : (
            <div>Game Over!</div>
          )}
        </div>
      ) : (
        <div>
          <div>Score: {score}</div>
          <div>Time remaining: {timer} seconds</div>
          <div className={`box ${boxColor}`} onClick={handleClick}></div>
        </div>
      )}
    </div>
  );
};

export default ReturnJourney;
