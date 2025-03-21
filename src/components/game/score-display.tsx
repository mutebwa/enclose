import React from 'react';
import { cn } from '../../lib/utils';
import { PLAYERS } from '../../lib/constants';
import { motion } from 'framer-motion';

interface ScoreDisplayProps {
  scores: number[];
  className?: string;
}

export const ScoreDisplay = React.memo(({ scores, className }: ScoreDisplayProps) => {
  return (
    <div className={cn("flex justify-center gap-8 text-lg font-bold", className)}>
      {PLAYERS.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ scale: 1 }}
          animate={{ scale: scores[index] > 0 ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className={cn(
            "px-4 py-2 rounded-md flex items-center gap-2",
            player.color,
            "text-white shadow-md"
          )}
        >
          <span>{player.name}</span>
          <span className="bg-white/20 px-2 rounded-full">{scores[index]}</span>
        </motion.div>
      ))}
    </div>
  );
});