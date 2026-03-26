import { create } from "zustand";

interface ChannelsStore {
  activeChannelId: string;
  followedCreatorIds: string[];
  immersiveSession: boolean;
  sessionMode: "vocab" | "quiz" | "mixed";
  setActiveChannel: (channelId: string) => void;
  setImmersiveSession: (value: boolean) => void;
  setSessionMode: (value: "vocab" | "quiz" | "mixed") => void;
  toggleFollowCreator: (creatorId: string) => void;
}

export const useChannelsStore = create<ChannelsStore>((set) => ({
  activeChannelId: "for-you",
  followedCreatorIds: ["creator-1", "creator-2"],
  immersiveSession: false,
  sessionMode: "vocab",
  setActiveChannel: (channelId) =>
    set((state) => (state.activeChannelId === channelId ? state : { activeChannelId: channelId })),
  setImmersiveSession: (value) =>
    set((state) => (state.immersiveSession === value ? state : { immersiveSession: value })),
  setSessionMode: (value) =>
    set((state) => (state.sessionMode === value ? state : { sessionMode: value })),
  toggleFollowCreator: (creatorId) =>
    set((state) => ({
      followedCreatorIds: state.followedCreatorIds.includes(creatorId)
        ? state.followedCreatorIds.filter((id) => id !== creatorId)
        : [...state.followedCreatorIds, creatorId],
    })),
}));
