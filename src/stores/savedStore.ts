import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedStore {
  savedIds: string[];
  reviewLaterIds: string[];
  toggleSaved: (reelId: string) => void;
  toggleReviewLater: (reelId: string) => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      savedIds: [],
      reviewLaterIds: [],
      toggleSaved: (reelId) =>
        set((state) => ({
          savedIds: state.savedIds.includes(reelId)
            ? state.savedIds.filter((id) => id !== reelId)
            : [...state.savedIds, reelId],
        })),
      toggleReviewLater: (reelId) =>
        set((state) => ({
          reviewLaterIds: state.reviewLaterIds.includes(reelId)
            ? state.reviewLaterIds.filter((id) => id !== reelId)
            : [...state.reviewLaterIds, reelId],
        })),
    }),
    {
      name: "instamed-saved-store",
    },
  ),
);
