import { create } from "zustand";
import type { FeedState } from "@/types/domain";

interface FeedStore {
  feeds: Record<string, FeedState>;
  ensureFeed: (channelId: string) => void;
  setFeedIds: (channelId: string, ids: string[], hasMore: boolean) => void;
  appendFeedIds: (channelId: string, ids: string[], hasMore: boolean) => void;
  setCurrentIndex: (channelId: string, index: number) => void;
  setPrefetchedUntil: (channelId: string, index: number) => void;
}

const makeFeed = (channelId: string): FeedState => ({
  channelId,
  ids: [],
  currentIndex: 0,
  hasMore: true,
  prefetchedUntil: 0,
});

export const useFeedStore = create<FeedStore>((set) => ({
  feeds: {},
  ensureFeed: (channelId) =>
    set((state) =>
      state.feeds[channelId]
        ? state
        : {
            feeds: { ...state.feeds, [channelId]: makeFeed(channelId) },
          },
    ),
  setFeedIds: (channelId, ids, hasMore) =>
    set((state) => {
      const current = state.feeds[channelId] ?? makeFeed(channelId);
      const sameIds =
        current.ids.length === ids.length && current.ids.every((value, index) => value === ids[index]);
      if (sameIds && current.hasMore === hasMore) return state;

      return {
        feeds: {
          ...state.feeds,
          [channelId]: {
            ...current,
            ids,
            hasMore,
          },
        },
      };
    }),
  appendFeedIds: (channelId, ids, hasMore) =>
    set((state) => {
      const current = state.feeds[channelId] ?? makeFeed(channelId);
      const merged = [...new Set([...current.ids, ...ids])];
      const sameIds =
        current.ids.length === merged.length && current.ids.every((value, index) => value === merged[index]);
      if (sameIds && current.hasMore === hasMore) return state;

      return {
        feeds: {
          ...state.feeds,
          [channelId]: { ...current, ids: merged, hasMore },
        },
      };
    }),
  setCurrentIndex: (channelId, index) =>
    set((state) => {
      const current = state.feeds[channelId] ?? makeFeed(channelId);
      if (current.currentIndex === index) return state;

      return {
        feeds: {
          ...state.feeds,
          [channelId]: { ...current, currentIndex: index },
        },
      };
    }),
  setPrefetchedUntil: (channelId, index) =>
    set((state) => {
      const current = state.feeds[channelId] ?? makeFeed(channelId);
      if (current.prefetchedUntil === index) return state;

      return {
        feeds: {
          ...state.feeds,
          [channelId]: { ...current, prefetchedUntil: index },
        },
      };
    }),
}));
