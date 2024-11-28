// Board.tsx
import React, { useState } from "react";
import Card from "./Card";

const Board: React.FC = () => {
  // Créer un tableau initial avec 16 cartes
  const initialCards = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    value: `${index}`, // Pour tester, chaque carte peut avoir une valeur unique
    isFlipped: false, // Toutes les cartes sont cachées au départ
  }));

  const [cards, setCards] = useState(initialCards);

  const handleCardClick = (id: number) => {
    console.log(`Card clicked: ${id}`); // Vérification du clic

    // Mettre à jour l'état de la carte cliquée
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default Board;
