import React, { useState, useEffect } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import AddButton from "./AddButton";
import { generatePairs } from "../utils/cardUtils";
import styles from "../styles/Game.module.css";

const Game: React.FC = () => {
  const [numPairs, setNumPairs] = useState<number>(9);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    setCards(generatePairs(numPairs));
  }, [numPairs]);

  // Fonction pour gérer le retournement des cartes
  const handleCardClick = (id: number) => {
    // Ignorer si la carte est déjà trouvée ou si elle est déjà sélectionnée
    if (matchedPairs.includes(id) || flippedCards.includes(id)) {
      return;
    }

    // Ajouter si moins de 2 cartes sont sélectionnées
    if (flippedCards.length < 2) {
      setFlippedCards((prev) => [...prev, id]);
    }

    // Si deux cartes sont déjà sélectionnées
    if (flippedCards.length === 1) {
      const [firstCardId] = flippedCards;

      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === id);

      setTimeout(() => {
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          setMatchedPairs((prev) => [...prev, firstCardId, id]);
        }
        setFlippedCards([]);
      }, 500);
    }
  };

  return (
    <div className={styles.gameContainer}>
      <h1>Memory Game</h1>
      <div>
        <Board
          cards={cards}
          flippedCards={flippedCards}
          matchedPairs={matchedPairs}
          onCardClick={handleCardClick}
        />
      </div>

      <div className={styles.gameInfoWrapper}>
        <GameInfo
          matchedPairs={matchedPairs.length / 2}
          totalPairs={numPairs}
        />
      </div>
      <AddButton
        label="Number of Pairs"
        numPairs={numPairs}
        setNumPairs={setNumPairs}
      />
    </div>
  );
};

export default Game;
