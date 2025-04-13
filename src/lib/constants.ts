// Game configuration
export const GRID_SIZE = 32;
export const CELL_SIZE = 8; // In pixels
export const MAX_BOARD_SIZE = 640; // Max width/height in pixels

// Player configuration
export const PLAYERS = [
  { id: 1, name: "Player 1", color: "bg-blue-500", textColor: "text-blue-600" },
  { id: 2, name: "Player 2", color: "bg-red-500", textColor: "text-red-600" }
];

// Game colors
export const SEALED_COLOR = "bg-gray-700";
export const EMPTY_COLOR = "bg-gray-200";

// Game messages
export const INITIAL_MESSAGE = "Player 1's Turn";
export const WIN_MESSAGES = {
  PLAYER_1: "Player 1 Wins!",
  PLAYER_2: "Player 2 Wins!",
  TIE: "It's a Tie!"
};

// Animation constants
export const RESET_DELAY = 700; // In milliseconds
export const MESSAGE_ANIMATION_DURATION = 0.7; // In seconds

// //Design colors
// const RED = '#fc2929'
// const PURPLE = '#c952Ee4'
// const LIGHT_PURPLE = '#ffe7fe'
// const DARK_YELLOW = '#debf11'