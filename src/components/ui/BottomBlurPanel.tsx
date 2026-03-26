import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const BottomBlurPanel = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      "rounded-[28px] border border-white/10 bg-[rgba(10,14,20,0.68)] p-4 shadow-soft backdrop-blur-xl",
      className,
    )}
  >
    {children}
  </div>
);
