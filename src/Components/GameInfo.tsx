import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import styles from "../styles/GameInfo.module.css";

const GameInfo: React.FC = () => {
  const { matchedPairs, numPairs } = useSelector(
    (state: RootState) => state.memory
  );

  return (
    <div className={styles.infoPanel}>
      <h3>Game Info</h3>
      <p>Matched Pairs: {matchedPairs.length / 2}</p>
      <p>Remaining Pairs: {numPairs - matchedPairs.length / 2}</p>
    </div>
  );
};

export default GameInfo;
