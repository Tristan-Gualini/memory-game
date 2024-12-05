import reducer, { startGame, flipCard, restartGame } from "./MemorySlice";

describe("MemorySlice Reducer", () => {
  const initialState = {
    numPairs: 9,
    cards: [],
    flippedCards: [],
    matchedPairs: [],
    gameStarted: false,
    timeLeft: 0,
    gameOver: false,
  };

  test("should handle startGame action", () => {
    const newState = reducer(initialState, startGame());
    expect(newState.gameStarted).toBe(true);
    expect(newState.timeLeft).toBeGreaterThan(0); // Time limit is set
  });

  test("should handle flipCard action", () => {
    const stateWithCards = {
      ...initialState,
      cards: [
        { id: 1, value: "A" },
        { id: 2, value: "A" },
      ],
    };
    const newState = reducer(stateWithCards, flipCard(1));
    expect(newState.flippedCards).toContain(1);
  });

  test("should handle restartGame action", () => {
    const modifiedState = {
      ...initialState,
      gameStarted: true,
      matchedPairs: [1, 2],
    };
    const newState = reducer(modifiedState, restartGame());
    expect(newState.matchedPairs).toHaveLength(0);
    expect(newState.gameStarted).toBe(false);
  });
});
