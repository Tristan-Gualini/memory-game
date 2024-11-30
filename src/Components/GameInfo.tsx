import React from "react";
import styles from "../styles/GameInfo.module.css";

interface GameInfoProps {
  matchedPairs: number;
  totalPairs: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ matchedPairs, totalPairs }) => {
  return (
    <div className={styles.infoPanel}>
      <h3>Game Info</h3>
      <p>Matched Pairs: {matchedPairs}</p>
      <p>Remaining Pairs: {totalPairs - matchedPairs}</p>
    </div>
  );
};

export default GameInfo;
