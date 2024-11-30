import React, { useState, useEffect } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import AddButton from "./AddButton";
import { generatePairs, calculateTimeLimit } from "../utils/cardUtils";
import styles from "../styles/Game.module.css";

const Game: React.FC = () => {
  const [numPairs, setNumPairs] = useState<number>(9);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | number | null>(
    null
  ); // Référence au setInterval pour l'annuler
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    setCards(generatePairs(numPairs));
  }, [numPairs]);

  useEffect(() => {
    if (matchedPairs.length / 2 === numPairs) {
      // Arrêter le timer si le jeu est terminé avant la fin
      if (typeof intervalId === "number") {
        clearInterval(intervalId);
      }
      setGameOver(true);
    }
  }, [matchedPairs, numPairs, intervalId]);

  const startGame = () => {
    setGameStarted(true);
    const initialTime = calculateTimeLimit(numPairs);
    setTimeLeft(initialTime);
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id); // Arrêter le timer lorsque le temps est écoulé
          setGameOver(true);
          setFlippedCards([]);
          return 0;
        }
        return prevTime - 1; // Décrémenter le temps à chaque seconde
      });
    }, 1000);
    setIntervalId(id);
  };

  const handleCardClick = (id: number) => {
    if (!gameStarted) startGame();
    if (gameOver) return;

    // Ignorer si la carte est déjà trouvée ou si elle est déjà sélectionnée
    if (matchedPairs.includes(id) || flippedCards.includes(id)) return;

    // Ajouter si moins de 2 cartes sont sélectionnées
    if (flippedCards.length < 2) setFlippedCards((prev) => [...prev, id]);

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

  const restartGame = () => {
    setCards(generatePairs(numPairs));
    setGameStarted(false);
    setMatchedPairs([]);
    setGameOver(false);
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
        {gameStarted && (
          <div className={styles.timer}>Time Left: {timeLeft}s</div>
        )}
      </div>
      {!gameStarted && (
        <AddButton
          label="Number of Pairs"
          number={numPairs}
          setNumber={setNumPairs}
        />
      )}
      {gameOver && (
        <button className={styles.restartButton} onClick={restartGame}>
          Restart ?
        </button>
      )}
    </div>
  );
};

export default Game;
