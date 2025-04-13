import type { Grid } from "../types/game";

// export const GRID_SIZE = 64;
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
    currentPlayer: number
  ): { newGrid: Grid; enclosuresFound: boolean } => {
    const size = grid.length;
    const newGrid = getGridCopy(grid);
    let enclosuresFound = false;
  
    // 1. Create visited matrix and queue for BFS
    const visited = Array.from({ length: size }, () => 
      new Array(size).fill(false));
    const queue: [number, number][] = [];
  
    // 2. Initialize BFS from all edge cells
    const edgeCells = getEdgeCells(size);
    for (const [x, y] of edgeCells) {
      if (shouldVisit(newGrid, x, y, currentPlayer)) {
        visited[y][x] = true;
        queue.push([x, y]);
      }
    }
  
    // 3. Perform BFS to find all reachable areas from edges
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (isValid(nx, ny, size) && 
            !visited[ny][nx] && 
            shouldVisit(newGrid, nx, ny, currentPlayer)) {
          visited[ny][nx] = true;
          queue.push([nx, ny]);
        }
      }
    }
  
    // 4. Seal unreachable areas and count enclosures
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!visited[y][x] && 
            newGrid[y][x].owner !== currentPlayer && 
            !newGrid[y][x].sealed) {
          newGrid[y][x].sealed = true;
          enclosuresFound = true;
        }
      }
    }
  
    return { newGrid, enclosuresFound };
  };
  
  // Helper functions
  const isValid = (x: number, y: number, size: number) => 
    x >= 0 && x < size && y >= 0 && y < size;
  
  const shouldVisit = (grid: Grid, x: number, y: number, currentPlayer: number) => 
    grid[y][x].owner !== currentPlayer && !grid[y][x].sealed;
  
  const getEdgeCells = (size: number): [number, number][] => {
    const cells: [number, number][] = [];
    for (let i = 0; i < size; i++) {
      cells.push([0, i], [size-1, i], [i, 0], [i, size-1]);
    }
    return cells;
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
