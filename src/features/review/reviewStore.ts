import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyReviewRating, createInitialReviewState, type ReviewRating } from "@/features/review/sr";
import type { Reel, ReviewState } from "@/types/domain";

interface ReviewStoreState {
  byId: Record<string, ReviewState>;
  ensureReviewState: (reelId: string) => ReviewState;
  getReviewState: (reelId: string) => ReviewState;
  rateCard: (reel: Reel, rating: ReviewRating, weakAreaMultiplier?: number) => ReviewState;
  dueCount: () => number;
}

export const useReviewStore = create<ReviewStoreState>()(
  persist(
    (set, get) => ({
      byId: {},
      ensureReviewState: (reelId) => {
        const current = get().byId[reelId];
        if (current) return current;
        const fresh = createInitialReviewState(reelId);
        set((state) => ({ byId: { ...state.byId, [reelId]: fresh } }));
        return fresh;
      },
      getReviewState: (reelId) => {
        return get().byId[reelId] ?? createInitialReviewState(reelId);
      },
      rateCard: (reel, rating, weakAreaMultiplier = 1) => {
        const previous = get().ensureReviewState(reel.id);
        const next = applyReviewRating(previous, reel, rating, weakAreaMultiplier);
        set((state) => ({ byId: { ...state.byId, [reel.id]: next } }));
        return next;
      },
      dueCount: () =>
        Object.values(get().byId).filter((item) => new Date(item.dueAt).getTime() <= Date.now()).length,
    }),
    {
      name: "instamed-review-store",
      partialize: (state) => ({ byId: state.byId }),
    },
  ),
);
