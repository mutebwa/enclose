import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { MESSAGE_ANIMATION_DURATION } from '../../lib/constants';

interface GameMessageProps {
  message: string;
  className?: string;
}

export const GameMessage = React.memo(({ message, className }: GameMessageProps) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: MESSAGE_ANIMATION_DURATION }}
        className={cn(
          "text-center text-lg font-semibold mt-4 min-h-[2rem]",
          "bg-gray-100 px-4 py-2 rounded-md",
          className
        )}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
});