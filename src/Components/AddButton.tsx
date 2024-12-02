import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumPairs } from "../slice/MemorySlice";
import { RootState } from "../redux/Store";
import styles from "../styles/AddButton.module.css";

const AddButton: React.FC = () => {
  const dispatch = useDispatch();
  const numPairs = useSelector((state: RootState) => state.memory.numPairs);

  const increment = () => {
    // Limiter le nombre de paires à 21
    if (numPairs < 21) dispatch(setNumPairs(numPairs + 3));
  };

  const decrement = () => {
    // Limiter le nombre de paires à 3
    if (numPairs > 3) dispatch(setNumPairs(numPairs - 3));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limiter la valeur entre 3 et 21
    const value = Math.max(3, Math.min(21, Number(e.target.value)));
    dispatch(setNumPairs(value));
  };

  return (
    <div className={styles.addPairTitle}>
      <span className={styles.pairLabel}>Number of Pairs</span>
      <div className={styles.addPairContainer}>
        <button className={styles.decrementButton} onClick={decrement}>
          -
        </button>
        <div className={styles.pairInputWrapper}>
          <input
            type="number"
            value={numPairs}
            onChange={handleChange}
            className={styles.pairInputText}
            min="3"
            max="21"
          />
        </div>
        <button className={styles.incrementButton} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default AddButton;
