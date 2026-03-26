import { Progress } from "@heroui/react";
import { Flame, Target } from "lucide-react";
import { StatPill } from "@/components/ui/StatPill";
import { useChannelsStore } from "@/stores/channelsStore";
import { useSessionStore } from "@/stores/sessionStore";

export const FeedProgressOverlay = () => {
  const immersiveSession = useChannelsStore((state) => state.immersiveSession);
  const dailyGoal = useSessionStore((state) => state.dailyGoal);
  const completedToday = useSessionStore((state) => state.completedToday);
  const streakDays = useSessionStore((state) => state.streakDays);
  const reviewsDue = useSessionStore((state) => state.reviewsDue);
  const progressValue = Math.min(100, (completedToday / dailyGoal) * 100);

  return (
    <div
      className={
        immersiveSession
          ? "pointer-events-none absolute inset-x-4 top-[calc(var(--safe-top)+3.8rem)] z-20 space-y-3"
          : "pointer-events-none absolute inset-x-4 top-[calc(var(--safe-top)+18.75rem)] z-20 space-y-3"
      }
    >
      <div className="flex items-center justify-between">
        <StatPill label="Due" value={reviewsDue} className="bg-review/10" />
        <div className="flex gap-2">
          <StatPill label="Goal" value={`${completedToday}/${dailyGoal}`} />
          <StatPill label="Streak" value={`${streakDays}d`} className="bg-rose-500/10" />
        </div>
      </div>
      <div className="rounded-full border border-white/10 bg-black/46 px-3 py-2 shadow-soft backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Target className="h-3.5 w-3.5" />
            Session Completion
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-orange-300" />
            +18 XP
          </span>
        </div>
        <Progress
          aria-label="Daily progress"
          classNames={{
            track: "bg-white/10",
            indicator: "bg-gradient-to-r from-cyan-400 to-emerald-400",
          }}
          radius="full"
          size="sm"
          value={progressValue}
        />
      </div>
    </div>
  );
};
