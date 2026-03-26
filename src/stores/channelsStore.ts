import { create } from "zustand";

interface ChannelsStore {
  activeChannelId: string;
  followedCreatorIds: string[];
  immersiveSession: boolean;
  sessionMode: "vocab" | "quiz" | "mixed";
  sessionTopicFolder: string;
  vocabDeckFileName: string;
  quizDeckFileName: string;
  setActiveChannel: (channelId: string) => void;
  setImmersiveSession: (value: boolean) => void;
  setSessionMode: (value: "vocab" | "quiz" | "mixed") => void;
  setSessionTopicFolder: (value: string) => void;
  setSessionDeckFile: (mode: "vocab" | "quiz", value: string) => void;
  toggleFollowCreator: (creatorId: string) => void;
}

export const useChannelsStore = create<ChannelsStore>((set) => ({
  activeChannelId: "for-you",
  followedCreatorIds: ["creator-1", "creator-2"],
  immersiveSession: false,
  sessionMode: "vocab",
  sessionTopicFolder: "med-latin",
  vocabDeckFileName: "deck-voc-01.json",
  quizDeckFileName: "deck-03.json",
  setActiveChannel: (channelId) =>
    set((state) => (state.activeChannelId === channelId ? state : { activeChannelId: channelId })),
  setImmersiveSession: (value) =>
    set((state) => (state.immersiveSession === value ? state : { immersiveSession: value })),
  setSessionMode: (value) =>
    set((state) => (state.sessionMode === value ? state : { sessionMode: value })),
  setSessionTopicFolder: (value) =>
    set((state) => (state.sessionTopicFolder === value ? state : { sessionTopicFolder: value })),
  setSessionDeckFile: (mode, value) =>
    set((state) =>
      mode === "vocab"
        ? state.vocabDeckFileName === value
          ? state
          : { vocabDeckFileName: value }
        : state.quizDeckFileName === value
          ? state
          : { quizDeckFileName: value },
    ),
  toggleFollowCreator: (creatorId) =>
    set((state) => ({
      followedCreatorIds: state.followedCreatorIds.includes(creatorId)
        ? state.followedCreatorIds.filter((id) => id !== creatorId)
        : [...state.followedCreatorIds, creatorId],
    })),
}));
