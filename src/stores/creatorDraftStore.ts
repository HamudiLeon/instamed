import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CreatorDraft {
  id: string;
  type: string;
  title: string;
  payload: Record<string, unknown>;
  updatedAt: string;
}

interface CreatorDraftStore {
  drafts: CreatorDraft[];
  saveDraft: (draft: CreatorDraft) => void;
  removeDraft: (id: string) => void;
}

export const useCreatorDraftStore = create<CreatorDraftStore>()(
  persist(
    (set) => ({
      drafts: [],
      saveDraft: (draft) =>
        set((state) => ({
          drafts: [...state.drafts.filter((item) => item.id !== draft.id), draft],
        })),
      removeDraft: (id) => set((state) => ({ drafts: state.drafts.filter((item) => item.id !== id) })),
    }),
    {
      name: "instamed-creator-drafts",
    },
  ),
);
