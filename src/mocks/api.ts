import dayjs from "dayjs";
import { channels, creators } from "@/mocks/channels";
import { reels } from "@/mocks/reels";
import type { Channel, CreatorProfile, Reel } from "@/types/domain";

const latency = async (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
};

const sortForYou = () => {
  const imported = reels.filter((reel) => reel.tags.includes("studywithme-import"));
  const remainder = reels.filter((reel) => !reel.tags.includes("studywithme-import"));
  const byFreshness = [...remainder].sort(
    (left, right) => dayjs(right.createdAt).valueOf() - dayjs(left.createdAt).valueOf(),
  );
  return [...shuffle(imported), ...shuffle(byFreshness.slice(0, 4)), ...byFreshness.slice(4)];
};

export const fetchChannels = async (): Promise<Channel[]> => {
  await latency(120);
  return channels;
};

export const fetchCreators = async (): Promise<CreatorProfile[]> => {
  await latency(120);
  return creators;
};

export const fetchFeed = async ({
  channelId,
  offset = 0,
  limit = 7,
}: {
  channelId: string;
  offset?: number;
  limit?: number;
}): Promise<Reel[]> => {
  await latency(offset === 0 ? 260 : 180);
  let source: Reel[];
  if (channelId === "for-you") {
    source = sortForYou();
  } else if (channelId === "session:vocab") {
    source = reels.filter((reel) => reel.tags.includes("session:vocab"));
  } else if (channelId === "session:quiz") {
    source = reels.filter((reel) => reel.tags.includes("session:quiz"));
  } else if (channelId === "session:mixed") {
    const vocab = reels.filter((reel) => reel.tags.includes("session:vocab")).slice(0, 18);
    const quiz = reels.filter((reel) => reel.tags.includes("session:quiz")).slice(0, 18);
    source = [...vocab, ...quiz];
  } else {
    source = reels.filter((reel) => reel.channels.includes(channelId));
  }
  return source.slice(offset, offset + limit);
};

export const fetchReelById = async (id: string): Promise<Reel | undefined> => {
  await latency(80);
  return reels.find((reel) => reel.id === id);
};
