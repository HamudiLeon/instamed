import { Card, Progress } from "@heroui/react";
import { useSessionStore } from "@/stores/sessionStore";

export const ProgressPage = () => {
  const dailyGoal = useSessionStore((state) => state.dailyGoal);
  const completedToday = useSessionStore((state) => state.completedToday);
  const streakDays = useSessionStore((state) => state.streakDays);
  const weakAreas = useSessionStore((state) => state.weakAreas);
  const masteryByChannel = useSessionStore((state) => state.masteryByChannel);

  return (
    <main className="min-h-screen space-y-4 px-4 pb-32 pt-[calc(var(--safe-top)+1rem)]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Progress</p>
        <h1 className="text-2xl font-semibold">Mastery + Momentum</h1>
      </div>
      <Card className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-none">
        <p className="text-sm text-slate-400">Daily goal</p>
        <p className="mt-1 text-3xl font-semibold text-white">
          {completedToday}/{dailyGoal}
        </p>
        <Progress
          className="mt-4"
          classNames={{ track: "bg-white/10", indicator: "bg-gradient-to-r from-cyan-400 to-emerald-400" }}
          value={(completedToday / dailyGoal) * 100}
        />
      </Card>
      <Card className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-none">
        <p className="text-sm text-slate-400">Streak</p>
        <p className="mt-1 text-3xl font-semibold text-white">{streakDays} days</p>
        <p className="mt-2 text-sm text-slate-300">Weak areas: {weakAreas.join(", ")}</p>
      </Card>
      <div className="space-y-3">
        {Object.entries(masteryByChannel).map(([channel, value]) => (
          <Card key={channel} className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-none">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium capitalize text-white">{channel.replace("-", " ")}</p>
              <span className="text-sm text-slate-400">{value}%</span>
            </div>
            <Progress classNames={{ track: "bg-white/10", indicator: "bg-white" }} size="sm" value={value} />
          </Card>
        ))}
      </div>
    </main>
  );
};
