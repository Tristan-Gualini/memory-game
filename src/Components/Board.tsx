import React from "react";
import Card from "./Card";
import styles from "../styles/Board.module.css";

interface BoardProps {
  cards: any[];
  flippedCards: number[];
  matchedPairs: number[];
  onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({
  cards,
  flippedCards,
  matchedPairs,
  onCardClick,
}) => {
  return (
    <div className={styles.board}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={
            flippedCards.includes(card.id) || matchedPairs.includes(card.id)
          }
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default Board;
