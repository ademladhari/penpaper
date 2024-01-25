import { createContext, useContext } from 'react';

// Create a context for currentPlayer
const CurrentPlayerContext = createContext();

export function useCurrentPlayer() {
  const context = useContext(CurrentPlayerContext);
  if (!context) {
    throw new Error('useCurrentPlayer must be used within a CurrentPlayerProvider');
  }
  return context;
}

export { CurrentPlayerContext };