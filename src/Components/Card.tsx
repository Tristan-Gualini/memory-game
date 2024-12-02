import React from "react";
import styles from "../styles/Card.module.css";

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  value,
  isFlipped,
  isMatched,
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""} ${
        isMatched ? styles.matched : ""
      }`}
      onClick={() => onClick(id)}
    >
      <div>{isFlipped || isMatched ? `${value}` : "❓"}</div>
    </div>
  );
};

export default Card;
