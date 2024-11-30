import React from "react";
import styles from "../styles/AddButton.module.css";

interface AddButtonProps {
  label: string;
  numPairs: number;
  setNumPairs: React.Dispatch<React.SetStateAction<number>>;
}

const AddButton: React.FC<AddButtonProps> = ({
  label,
  numPairs,
  setNumPairs,
}) => {
  return (
    <div className={styles.addPairTitle}>
      <span className={styles.pairLabel}>{label}</span>
      <div className={styles.addPairContainer}>
        <button
          className={styles.decrementButton}
          onClick={() => setNumPairs((prev) => Math.max(prev - 3, 3))}
        >
          -
        </button>
        <div className={styles.pairInputWrapper}>
          <input
            type="number"
            value={numPairs}
            onChange={(e) =>
              setNumPairs(Math.max(3, Math.min(21, Number(e.target.value))))
            }
            className={styles.pairInputText}
            min="3"
            max="21"
          />
        </div>
        <button
          className={styles.incrementButton}
          onClick={() => setNumPairs((prev) => Math.min(prev + 3, 21))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddButton;
