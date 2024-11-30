export function generatePairs(totalPairs: number) {
  const cards: any[] = [];
  for (let i = 0; i < totalPairs; i++) {
    const card = { id: i, value: `Card ${i}`, isFlipped: false };
    cards.push(card); // Carte 1 de la paire
    cards.push({ ...card, id: i + totalPairs }); // Carte 2 de la paire
  }

  return shuffleArray(cards);
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex,
    tempValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
}

// Calculer le temps en fonction du nombre de paires
export function calculateTimeLimit(numPairs: number) {
  return numPairs * 5;
}
