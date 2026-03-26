import rawReels from "@/data/sample-reels.json";
import { reelSchema, type Reel } from "@/types/domain";

const scaffoldReels = reelSchema.array().parse(rawReels) as Reel[];

export const reels = scaffoldReels;
