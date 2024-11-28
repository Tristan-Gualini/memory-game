import React, { useState, useEffect } from "react";
import Card from "./Card";

// Fonction génératrice de paires
function* createPairs(totalPairs: number) {
  for (let i = 0; i < totalPairs; i++) {
    const card = { id: i, value: `Card ${i}`, isFlipped: false };
    yield card; // Carte 1 de la paire
    yield { ...card, id: i + totalPairs }; // Carte 2 de la paire
  }
}

interface BoardProps {
  numPairs: number;
}

const Board: React.FC<BoardProps> = ({ numPairs }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    const generatedCards = Array.from(createPairs(numPairs));
    console.log("generatedCards : ", generatedCards);
    setCards(generatedCards);
  }, [numPairs]);

  // Fonction pour gérer le retournement des cartes
  const handleCardClick = (id: number) => {
    // Si moins de 2 cartes sont sélectionnées et que la carte n'a pas déjà été sélectionnée
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards((prev) => [...prev, id]);
      console.log("Carte ajoutée");
    }

    // Si deux cartes sont déjà sélectionnées
    if (flippedCards.length === 1) {
      const [firstCardId] = flippedCards;
      console.log("Les cartes sont vérifiées");

      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === id);

      setTimeout(() => {
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Si les valeurs sont identiques, laisser les cartes retournées
          console.log("Les cartes correspondent");
        } else {
          // Si les cartes ne correspondent pas, les retourner après un délai
          console.log("Les cartes ne correspondent pas");
          setFlippedCards([]);
        }
      }, 500);
    }
  };

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          value={card.value}
          isFlipped={flippedCards.includes(card.id)}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default Board;
