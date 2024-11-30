import React from "react";
import Game from "./components/Game";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Game />
    </div>
  );
};

export default App;
