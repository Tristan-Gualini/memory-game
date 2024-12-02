import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import Board from "./Board";
import GameInfo from "./GameInfo";
import AddButton from "./AddButton";
import { restartGame, decrementTime } from "../slice/MemorySlice";
import styles from "../styles/Game.module.css";

const Game: React.FC = () => {
  const dispatch = useDispatch();

  const { gameStarted, timeLeft, gameOver } = useSelector(
    (state: RootState) => state.memory
  );

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, timeLeft, dispatch]);

  const restartGameHandler = () => {
    dispatch(restartGame());
  };

  return (
    <div className={styles.gameContainer}>
      <h1>Memory Game</h1>
      <div>
        <Board />
      </div>
      <div className={styles.gameInfoWrapper}>
        <GameInfo />
        {gameStarted && (
          <div className={styles.timer}>Time Left: {timeLeft}s</div>
        )}
      </div>
      {!gameStarted && <AddButton />}
      {gameOver && (
        <button className={styles.restartButton} onClick={restartGameHandler}>
          Restart ?
        </button>
      )}
    </div>
  );
};

export default Game;
