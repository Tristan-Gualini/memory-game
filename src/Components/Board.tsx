import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { flipCard, checkMatchCards, startGame } from "../slice/MemorySlice";
import Card from "./Card";
import styles from "../styles/Board.module.css";

const Board: React.FC = () => {
  const dispatch = useDispatch();

  const { cards, flippedCards, matchedPairs, gameStarted, gameOver } =
    useSelector((state: RootState) => state.memory);

  const cardClickHandler = (cardId: number) => {
    if (!gameStarted && !gameOver) {
      dispatch(startGame());
    }
    dispatch(flipCard(cardId));
    //Lancer le check s'il y avait déjà une carte retournée
    if (flippedCards.length === 1) {
      setTimeout(() => {
        dispatch(checkMatchCards());
      }, 500);
    }
  };

  return (
    <div className={styles.board}>
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          value={card.value}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedPairs.includes(card.id)}
          onClick={cardClickHandler}
        />
      ))}
    </div>
  );
};

export default Board;
