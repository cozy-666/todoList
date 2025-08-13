import React, { useState } from "react";

export const ScoreCounter = () => {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>スコア: {score}</h1>
      <button onClick={() => setScore(score + 1)}>1点追加！</button>
    </div>
  );
};