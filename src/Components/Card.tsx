import React from 'react';
import styles from '../styles/Card.module.css';

interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, value, isFlipped, onClick }) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={() => onClick(id)}
    >
      {isFlipped ? value : '❓'}
    </div>
  );
};

export default Card;