import React, { useReducer } from "react";

// 初期の状態
const initialState = {
  teamAScore: 0,
  teamBScore: 0,
  goalScorer: "",
  isGameOver: false,
};

// 状態を変更するルール（reducer関数）
function gameReducer(state, action) {
  switch (action.type) {
    case "SCORE_GOAL":
      console.log(state);
      return {
        ...state,
        [action.team]: state[action.team] + 1,
        goalScorer: action.scorer,
      };
    case "END_GAME":
      return {
        ...state,
        isGameOver: true,
      };
    default:
      return state;
  }
}

// コンポーネント
const UseReducerTest = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div>
      <h1>サッカーの試合</h1>
      <p>チームA: {state.teamAScore} 点</p>
      <p>チームB: {state.teamBScore} 点</p>
      <p>ゴールを決めた選手: {state.goalScorer}</p>
      <p>{state.isGameOver ? "試合終了！" : "試合中..."}</p>

      <button
        onClick={() => dispatch({ type: "SCORE_GOAL", team: "teamAScore", scorer: "田中" })}
      >
        チームAがゴール！
      </button>
      <button
        onClick={() => dispatch({ type: "SCORE_GOAL", team: "teamBScore", scorer: "佐藤" })}
      >
        チームBがゴール！
      </button>
      <button onClick={() => dispatch({ type: "END_GAME" })}>試合終了</button>
    </div>
  );
};

export default UseReducerTest