import { memo } from "react";
import { Card } from "@heroui/react";
import { motion } from "motion/react";
import { ReelCard } from "@/features/feed/ReelCard";
import { cn } from "@/lib/utils";
import type { Reel } from "@/types/domain";

export const ReelViewport = memo(
  ({
    reel,
    active,
    y,
  }: {
    reel: Reel;
    active: boolean;
    y?: number;
  }) => (
    <motion.div
      animate={{
        scale: active ? 1 : 0.985,
        opacity: active ? 1 : 0.55,
      }}
      className={cn("absolute inset-0 will-change-transform", !active && "pointer-events-none")}
      style={{ y }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
    >
      <Card className="h-full rounded-none bg-transparent shadow-none">
        <ReelCard reel={reel} />
      </Card>
    </motion.div>
  ),
);

ReelViewport.displayName = "ReelViewport";
