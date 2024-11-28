import React from "react";
import Board from "./Components/Board";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Board />
    </div>
  );
};

export default App;
