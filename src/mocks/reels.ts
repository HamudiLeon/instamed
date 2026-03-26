import rawReels from "@/data/sample-reels.json";
import { studyDeckSessionReels } from "@/mocks/studyDeckReels";
import { reelSchema, type Reel } from "@/types/domain";

const scaffoldReels = reelSchema.array().parse(rawReels) as Reel[];

export const reels = [...studyDeckSessionReels, ...scaffoldReels];
