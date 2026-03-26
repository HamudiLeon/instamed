import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ReelViewport } from "@/features/feed/ReelViewport";
import type { Reel } from "@/types/domain";

export const ReelStack = memo(
  ({
    reels,
    activeIndex,
    dragY,
  }: {
    reels: Reel[];
    activeIndex: number;
    dragY: number;
  }) => {
    const reduceMotion = useReducedMotion();
    const viewportHeight = typeof window === "undefined" ? 900 : window.innerHeight;

    return (
      <>
        {reels.map((reel, offsetIndex) => {
          const offset = offsetIndex - activeIndex;
          const viewportOffset = offset * viewportHeight + (offset === 0 ? dragY : 0);
          const depth = Math.abs(offset);

          return (
            <motion.div
              key={reel.id}
              animate={{
                opacity: depth > 2 ? 0 : 1,
                scale: offset === 0 ? 1 : 0.96 - Math.min(depth, 2) * 0.015,
                filter: offset === 0 ? "blur(0px)" : "blur(1.5px)",
              }}
              className="absolute inset-0"
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
            >
              <ReelViewport reel={reel} active={offset === 0} y={viewportOffset} />
            </motion.div>
          );
        })}
      </>
    );
  },
);

ReelStack.displayName = "ReelStack";
