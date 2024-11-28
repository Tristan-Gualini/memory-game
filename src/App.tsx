import React, { useState } from "react";
import Board from "./Components/Board";
import "./App.css";

const App = () => {
  const [numPairs, setNumPairs] = useState<number>(8); // Nombre de paires de cartes

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Board numPairs={numPairs} />
      <button
        className="add-button"
        onClick={() => setNumPairs((prev) => prev + 1)}
      >
        Add Pair
      </button>
    </div>
  );
};

export default App;
