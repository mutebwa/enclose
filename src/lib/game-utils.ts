import type { Grid } from "../types/game";

export const GRID_SIZE = 64;
export const PLAYER_COLORS = ["bg-blue-500", "bg-red-500"];
export const SEALED_COLOR = "bg-gray-700";
export const EMPTY_COLOR = "bg-gray-200";

export const createEmptyGrid = (size: number): Grid => {
  return Array(size)
    .fill(null)
    .map((_, y) =>
      Array(size)
        .fill(null)
        .map((_, x) => ({ x, y, owner: 0, sealed: false }))
    );
};

export const getGridCopy = (grid: Grid): Grid => {
  return grid.map((row) => [...row]);
};

export const countPlayerPoints = (grid: Grid, player: number): number => {
    let count = 0;
    for (const row of grid) {
        for (const point of row) {
            if (point.owner === player) {
                count++;
            }
        }
    }
    return count;
};

export const detectEnclosures = (
  grid: Grid,
  lastX: number,
  lastY: number,
  currentPlayer: number
): { newGrid: Grid; enclosuresFound: boolean } => {
  // Implementation from original code
  const size = grid.length;
  const newGrid = getGridCopy(grid);
  let enclosuresFound = false;

  // Helper function to check if a point is within bounds
  const isValid = (x: number, y: number) =>
    x >= 0 && x < size && y >= 0 && y < size;

  // Helper function to perform a flood fill
  const floodFill = (
    x: number,
    y: number,
    targetPlayer: number,
    fillValue: number,
    visited: boolean[][]
  ): boolean => {
    if (
      !isValid(x, y) ||
      visited[y][x] ||
      newGrid[y][x].owner !== targetPlayer
    ) {
      return false;
    }
    if (newGrid[y][x].sealed) return false;

    visited[y][x] = true;

    // Check neighbors
    const neighbors = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
    ];

    let isEnclosed = true;
    for (const neighbor of neighbors) {
      const nx = x + neighbor.dx;
      const ny = y + neighbor.dy;
      if (!isValid(nx, ny)) {
        isEnclosed = false; // Touches the edge, not enclosed
      } else if (newGrid[ny][nx].owner === 0) {
        isEnclosed = false; // Empty neighbor, not enclosed
      } else if (
        newGrid[ny][nx].owner !== targetPlayer &&
        !newGrid[ny][nx].sealed
      ) {
        //Opponent neighbor.
        continue;
      } else if (!visited[ny][nx]) {
        isEnclosed =
          isEnclosed && floodFill(nx, ny, targetPlayer, fillValue, visited);
      }
    }
    return isEnclosed;
  };

  // Check for enclosure around the last played point
  const visited = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));
  if (floodFill(lastX, lastY, currentPlayer, 3, visited)) {
    // Use 3 as a temporary fill value
    enclosuresFound = true;
    // Mark enclosed area as sealed and count opponent points.
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (visited[y][x]) {
          newGrid[y][x].sealed = true;
        }
      }
    }
  }

  return { newGrid, enclosuresFound };
};

export const calculateScores = (grid: Grid, player: number) => {
  // Implementation from original code
  let score = 0;
  const size = grid.length;

  // 1. Count opponent points within sealed areas
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x].sealed) {
        // Count points of the *other* player.
        if (grid[y][x].owner !== player && grid[y][x].owner !== 0) {
          score++;
        }
      }
    }
  }

  // 2. Add points for sealed tiles
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x].sealed && grid[y][x].owner === player) {
        score++;
      }
    }
  }

  return score;
};

export const checkForGameOver = (grid: Grid): boolean => {
  // Implementation from original code
  // Game is over when there are no more valid moves
  for (const row of grid) {
    for (const point of row) {
      if (point.owner === 0) {
        return false; // Found an empty spot, game is not over
      }
    }
  }
  return true;
};
