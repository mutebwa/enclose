import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "../../lib/utils";
import { GRID_SIZE, PLAYER_COLORS, SEALED_COLOR, EMPTY_COLOR } from "../../lib/game-utils";
import { Grid } from '../../types/game';

interface GameBoardProps {
  grid: Grid;
  onCellClick: (x: number, y: number) => void;
  isInteractive: boolean;
}

export const GameBoard = React.memo(({ grid, onCellClick, isInteractive }: GameBoardProps) => {
  // Implementation from original code
  return (
    <div
        className="grid select-none"
        style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            aspectRatio: '1 / 1',
            maxWidth: '600px', // Limit the size of the board.
            width: '100%'
        }}
    >
        {grid.map((row, y) =>
            row.map((point, x) => {
                let cellColor = EMPTY_COLOR;
                if (point.sealed) {
                    cellColor = SEALED_COLOR;
                } else if (point.owner === 1) {
                    cellColor = PLAYER_COLORS[0];
                } else if (point.owner === 2) {
                    cellColor = PLAYER_COLORS[1];
                }

                return (
                    <motion.div
                        key={`${x}-${y}`}
                        className={cn(
                            'border border-gray-300 rounded',
                            'transition-colors duration-200',
                            cellColor,
                            isInteractive && 'hover:bg-gray-300/50 cursor-pointer',
                            'relative' // For absolute positioning of the dot
                        )}
                        onClick={() => isInteractive && onCellClick(x, y)}
                        style={{
                            // Prevent the cells from collapsing when empty
                            minHeight: '0',
                            minWidth: '0'
                        }}
                        whileHover={isInteractive ? { scale: 1.05 } : {}}
                        whileTap={isInteractive ? { scale: 0.95 } : {}}
                    >
                        {/* Dot for visual representation */}
                        {(point.owner !== 0 || point.sealed) && (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div
                                    className={cn(
                                        'rounded-full',
                                        point.sealed ? 'w-full h-full' : 'w-2/3 h-2/3', // Adjust size as needed
                                        cellColor
                                    )}
                                />
                            </div>
                        )}
                    </motion.div>
                );
            })
        )}
    </div>
);
});