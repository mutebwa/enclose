export interface Point {
    x: number;
    y: number;
    owner: number;
    sealed: boolean;
  }
  
  export type Grid = Point[][];
  
  export interface GameState {
    grid: Grid;
    scores: number[];
    currentPlayer: number;
    gameOver: boolean;
    message: string;
  }