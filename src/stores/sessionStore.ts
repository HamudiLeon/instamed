import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionStats } from "@/types/domain";

interface SessionStore extends SessionStats {
  incrementXP: (amount: number, channelId?: string) => void;
  incrementCompleted: () => void;
  setDueCount: (count: number) => void;
}

const initialStats: SessionStats = {
  xp: 320,
  streakDays: 12,
  dailyGoal: 18,
  completedToday: 6,
  reviewsDue: 4,
  weakAreas: ["renal", "acid-base"],
  masteryByChannel: {
    "step1": 62,
    "step2": 54,
    "anatomy": 71,
    "vocabulary": 80,
  },
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      ...initialStats,
      incrementXP: (amount, channelId) =>
        set((state) => ({
          xp: state.xp + amount,
          masteryByChannel: channelId
            ? {
                ...state.masteryByChannel,
                [channelId]: Math.min(100, (state.masteryByChannel[channelId] ?? 0) + 1),
              }
            : state.masteryByChannel,
        })),
      incrementCompleted: () => set((state) => ({ completedToday: state.completedToday + 1 })),
      setDueCount: (count) => set(() => ({ reviewsDue: count })),
    }),
    {
      name: "instamed-session-store",
    },
  ),
);
