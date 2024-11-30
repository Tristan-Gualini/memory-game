import React from "react";
import styles from "../styles/AddButton.module.css";

interface AddButtonProps {
  label: string;
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}

const AddButton: React.FC<AddButtonProps> = ({ label, number, setNumber }) => {
  return (
    <div className={styles.addPairTitle}>
      <span className={styles.pairLabel}>{label}</span>
      <div className={styles.addPairContainer}>
        <button
          className={styles.decrementButton}
          onClick={() => setNumber((prev) => Math.max(prev - 3, 3))}
        >
          -
        </button>
        <div className={styles.pairInputWrapper}>
          <input
            type="number"
            value={number}
            onChange={(e) =>
              setNumber(Math.max(3, Math.min(21, Number(e.target.value))))
            }
            className={styles.pairInputText}
            min="3"
            max="21"
          />
        </div>
        <button
          className={styles.incrementButton}
          onClick={() => setNumber((prev) => Math.min(prev + 3, 21))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddButton;
