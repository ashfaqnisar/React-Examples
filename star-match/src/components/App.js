import React, { useState } from 'react';
import GameComponent from './GameComponent';


const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <GameComponent key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export function App() {
  return <StarMatch />;
}
