import { studyWithMeLearncardSchema, studyWithMeVocabSchema } from "@/types/studyDeck";
import type { StudyWithMeLearncardDeck, StudyWithMeVocabDeck } from "@/types/studyDeck";

export type LocalizedText = Partial<Record<string, string>>;
export type DeckType = "learncard" | "vocab";

export interface TopicConfig {
  topicKey?: string;
  title?: LocalizedText;
  description?: LocalizedText;
  level?: string;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  deckOrder?: Array<string | number>;
  decks?: Record<
    string,
    {
      title?: LocalizedText;
      description?: LocalizedText;
      estimatedMinutes?: number;
      difficulty?: "beginner" | "intermediate" | "advanced";
      tags?: string[];
      visible?: boolean;
      badge?: string;
    }
  >;
}

export interface DeckRef {
  topicFolder: string;
  topicKey: string;
  fileName: string;
  deckType: DeckType;
  index: number;
}

export interface TopicSummary {
  topicFolder: string;
  topicKey: string;
  title: string;
  description: string;
  deckCount: number;
}

export type LoadedDeck =
  | {
      deckType: "learncard";
      ref: DeckRef;
      data: StudyWithMeLearncardDeck;
      topicConfig?: TopicConfig | null;
    }
  | {
      deckType: "vocab";
      ref: DeckRef;
      data: StudyWithMeVocabDeck;
      topicConfig?: TopicConfig | null;
    };

const deckModules = import.meta.glob("/src/lib/mock/learncards/*/*.json");
const configModules = import.meta.glob("/src/lib/mock/learncards/*/config.json", { eager: true });

const parsePath = (path: string) => {
  const match = path.match(/\/src\/lib\/mock\/learncards\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  return { topicFolder: match[1], fileName: match[2] };
};

const parseIndex = (fileName: string) => {
  const match = fileName.match(/^deck(?:-voc)?-(\d+)\.json$/);
  return match ? Number.parseInt(match[1], 10) : 0;
};

const inferDeckType = (fileName: string): DeckType => (fileName.startsWith("deck-voc-") ? "vocab" : "learncard");

const unwrapModule = async (loader: () => Promise<unknown>) => {
  const loaded = (await loader()) as { default?: unknown };
  return loaded?.default ?? loaded;
};

const topicConfigs = new Map<string, TopicConfig | null>(
  Object.entries(configModules).map(([path, mod]) => {
    const parsed = parsePath(path);
    const value = ((mod as { default?: unknown })?.default ?? mod) as TopicConfig | null;
    return [parsed?.topicFolder ?? path, value];
  }),
);

const deckRefs: DeckRef[] = Object.keys(deckModules)
  .map((path) => {
    const parsed = parsePath(path);
    if (!parsed || parsed.fileName === "config.json") return null;
    const topicConfig = topicConfigs.get(parsed.topicFolder);
    return {
      topicFolder: parsed.topicFolder,
      topicKey: topicConfig?.topicKey ?? parsed.topicFolder,
      fileName: parsed.fileName,
      deckType: inferDeckType(parsed.fileName),
      index: parseIndex(parsed.fileName),
    } satisfies DeckRef;
  })
  .filter((value): value is DeckRef => value !== null)
  .sort((left, right) => left.index - right.index);

export const learnDeckRepo = {
  listTopics(): TopicSummary[] {
    const byFolder = new Map<string, TopicSummary>();

    for (const ref of deckRefs) {
      if (!byFolder.has(ref.topicFolder)) {
        const config = topicConfigs.get(ref.topicFolder);
        byFolder.set(ref.topicFolder, {
          topicFolder: ref.topicFolder,
          topicKey: config?.topicKey ?? ref.topicFolder,
          title: config?.title?.en ?? ref.topicFolder,
          description: config?.description?.en ?? "",
          deckCount: 0,
        });
      }

      byFolder.get(ref.topicFolder)!.deckCount += 1;
    }

    return [...byFolder.values()];
  },

  listDecks(topicFolder: string): DeckRef[] {
    return deckRefs.filter((ref) => ref.topicFolder === topicFolder);
  },

  getDeckRef(topicFolder: string, fileName: string): DeckRef | null {
    return deckRefs.find((ref) => ref.topicFolder === topicFolder && ref.fileName === fileName) ?? null;
  },

  getDefaultDeckRef(topicFolder: string, deckType: DeckType): DeckRef | null {
    return deckRefs.find((ref) => ref.topicFolder === topicFolder && ref.deckType === deckType) ?? null;
  },

  async loadDeck(ref: DeckRef): Promise<LoadedDeck> {
    const path = `/src/lib/mock/learncards/${ref.topicFolder}/${ref.fileName}`;
    const loader = deckModules[path];
    if (!loader) {
      throw new Error(`Deck not found: ${path}`);
    }

    const topicConfig = topicConfigs.get(ref.topicFolder);
    const raw = await unwrapModule(loader);

    if (ref.deckType === "vocab") {
      return {
        deckType: "vocab",
        ref,
        data: studyWithMeVocabSchema.parse(raw),
        topicConfig,
      };
    }

    return {
      deckType: "learncard",
      ref,
      data: studyWithMeLearncardSchema.parse(raw),
      topicConfig,
    };
  },
};
