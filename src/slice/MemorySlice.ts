import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generatePairs, calculateTimeLimit } from "../utils/cardUtils";

interface MemoryState {
  numPairs: number;
  cards: Array<{ id: number; value: string }>;
  flippedCards: number[];
  matchedPairs: number[];
  gameStarted: boolean;
  timeLeft: number;
  gameOver: boolean;
}

const initialState: MemoryState = {
  numPairs: 9,
  cards: generatePairs(9),
  flippedCards: [],
  matchedPairs: [],
  gameStarted: false,
  timeLeft: 0,
  gameOver: false,
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    setNumPairs(state, action: PayloadAction<number>) {
      state.numPairs = action.payload;
      // Regénérer les cartes et les mélanger
      state.cards = generatePairs(action.payload);
    },
    startGame(state) {
      const initialTime = calculateTimeLimit(state.numPairs);
      state.timeLeft = initialTime;
      state.gameStarted = true;
      state.gameOver = false;
      state.flippedCards = [];
      state.matchedPairs = [];
    },
    decrementTime(state) {
      if (state.timeLeft > 0 && !state.gameOver) {
        state.timeLeft -= 1;
      }
      if (state.timeLeft === 0 || state.gameOver) {
        state.gameOver = true;
        state.flippedCards = [];
      }
    },
    flipCard(state, action: PayloadAction<number>) {
      const cardId = action.payload;
      if (
        state.gameOver ||
        state.matchedPairs.includes(cardId) ||
        state.flippedCards.includes(cardId)
      )
        return;

      if (state.flippedCards.length < 2) state.flippedCards.push(cardId);
    },
    checkMatchCards(state) {
      const [firstCardId, secondCardId] = state.flippedCards;

      const firstCard = state.cards.find((card) => card.id === firstCardId);
      const secondCard = state.cards.find((card) => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        state.matchedPairs.push(firstCardId, secondCardId);
      }

      state.flippedCards = [];

      // Vérification de fin de jeu
      if (state.matchedPairs.length / 2 === state.numPairs) {
        state.gameOver = true;
      }
    },
    restartGame(state) {
      state.cards = generatePairs(state.numPairs);
      state.matchedPairs = [];
      state.flippedCards = [];
      state.gameStarted = false;
      state.gameOver = false;
    },
  },
});

export const {
  setNumPairs,
  startGame,
  decrementTime,
  flipCard,
  checkMatchCards,
  restartGame,
} = memorySlice.actions;

export default memorySlice.reducer;
