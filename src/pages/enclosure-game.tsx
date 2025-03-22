import { useState, useCallback } from "react";
import { GameBoard } from "../components/game/game-board";
import { ScoreDisplay } from "../components/game/score-display";
import { GameMessage } from "../components/game/game-message";
import { ResetButton } from "../components/game/reset-button";
import {
  createEmptyGrid,
  detectEnclosures,
  calculateScores,
  checkForGameOver,
  getGridCopy,
  countPlayerPoints,
} from "../lib/game-utils";
import type { GameState } from "../types/game";
import { GRID_SIZE } from "../lib/constants";

const EnclosureGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(GRID_SIZE),
    scores: [0, 0],
    currentPlayer: 1,
    gameOver: false,
    message: "Player 1's Turn",
  });

  const [isResetting, setIsResetting] = useState(false);

  // Update the detectEnclosures call in handleCellClick
  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (gameState.gameOver) return;

      const { grid, currentPlayer } = gameState;
      if (grid[y][x].owner !== 0) return;

      let newGrid = getGridCopy(grid);
      newGrid[y][x].owner = currentPlayer;

      // Updated detection call (remove x/y parameters)
      const { newGrid: updatedGrid, enclosuresFound } = detectEnclosures(
        newGrid,
        currentPlayer
      );

      // Rest of the logic remains the same
      let newScores = [...gameState.scores];
      if (enclosuresFound) {
        newScores[currentPlayer - 1] = calculateScores(
          updatedGrid,
          currentPlayer
        );
      }

      const gameOver = checkForGameOver(updatedGrid);
      let nextPlayer = currentPlayer === 1 ? 2 : 1;
      if (enclosuresFound) {
        nextPlayer = currentPlayer;
      }

      let message = "";
      if (gameOver) {
        const player1Points = countPlayerPoints(updatedGrid, 1);
        const player2Points = countPlayerPoints(updatedGrid, 2);
        message =
          player1Points > player2Points
            ? "Player 1 Wins!"
            : player2Points > player1Points
            ? "Player 2 Wins!"
            : "It's a Tie!";
      } else {
        message = `Player ${nextPlayer}'s Turn`;
      }

      setGameState({
        grid: updatedGrid,
        scores: newScores,
        currentPlayer: nextPlayer,
        gameOver,
        message,
      });
    },
    [gameState]
  );

  const resetGame = () => {
    // Reset implementation
    setIsResetting(true);
    // Use a short delay before resetting the game state.
    setTimeout(() => {
      setGameState({
        grid: createEmptyGrid(GRID_SIZE),
        scores: [0, 0],
        currentPlayer: 1,
        gameOver: false,
        message: "Player 1's Turn",
      });
      setIsResetting(false);
    }, 300); // 300ms delay (adjust as needed)
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Enclosure Game</h1>
      <ScoreDisplay className="pb-3" scores={gameState.scores} />
      <GameBoard
        grid={gameState.grid}
        onCellClick={handleCellClick}
        isInteractive={!gameState.gameOver && !isResetting}
      />
      <GameMessage message={gameState.message} />
      <ResetButton isResetting={isResetting} onClick={resetGame} />
    </div>
  );
};

export default EnclosureGame;
