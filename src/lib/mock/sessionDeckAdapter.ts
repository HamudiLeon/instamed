import dayjs from "dayjs";
import { learnDeckRepo, type DeckRef, type LoadedDeck } from "@/lib/mock/learnDeckRepo";
import type { Reel } from "@/types/domain";

const createdAtBase = dayjs("2026-03-27T08:00:00.000Z");

const toLearncardReels = (deck: Extract<LoadedDeck, { deckType: "learncard" }>): Reel[] =>
  deck.data.cards.map((card, index) => ({
    id: `${deck.ref.topicFolder}-${card.cardId}`,
    type: "mcq",
    title: deck.data.meta.title.en ?? deck.topicConfig?.title?.en ?? "Imported quiz deck",
    description: deck.data.meta.description.en ?? deck.topicConfig?.description?.en ?? "Imported quiz deck.",
    channels: ["rapid-review"],
    tags: [
      ...deck.data.meta.tags,
      "studywithme-import",
      "quiz-session",
      `deck:${deck.data.deckKey}`,
      `topic:${deck.ref.topicFolder}`,
      "session:quiz",
    ],
    difficulty: "moderate",
    creatorId: "creator-3",
    createdAt: createdAtBase.add(index, "minute").toISOString(),
    updatedAt: createdAtBase.add(index, "minute").toISOString(),
    contentVersion: 1,
    reviewMeta: {
      estimatedSeconds: 18,
      examTags: ["medical-latin", "quiz", deck.data.meta.level],
      learningObjectives: [
        "Strengthen recognition of core Medical Latin phrases",
        "Keep a fast exam-style response loop",
      ],
    },
    card: {
      type: "mcq",
      stem: card.question.en ?? "Select the correct answer.",
      options: card.options.map((option, optionIndex) => {
        const text = option;
        return {
          id: `opt-${optionIndex + 1}`,
          label: String.fromCharCode(65 + optionIndex),
          text,
          explanation:
            text === card.correctAnswer
              ? card.explanation?.en ?? "Correct answer from imported StudyWithMe deck."
              : "Not the keyed answer for this imported quiz item.",
        };
      }),
      correctOptionId: `opt-${Math.max(
        1,
        card.options.findIndex((option) => option === card.correctAnswer) + 1,
      )}`,
      explanation: card.explanation?.en ?? "Imported from StudyWithMe Medical Latin learncards.",
    },
  }));

const toVocabReels = (deck: Extract<LoadedDeck, { deckType: "vocab" }>): Reel[] =>
  deck.data.items.map((item, index) => ({
    id: `${deck.ref.topicFolder}-${deck.ref.fileName}-${index + 1}`,
    type: "vocab",
    title: deck.data.title,
    description: deck.topicConfig?.description?.en ?? "Imported vocabulary trainer item from StudyWithMe deck.",
    channels: ["rapid-review"],
    tags: [
      "vocab",
      "studywithme-import",
      "trainer",
      `deck:${deck.data.bookKey ?? deck.ref.fileName}`,
      `topic:${deck.ref.topicFolder}`,
      "session:vocab",
    ],
    difficulty: "intro",
    creatorId: "creator-3",
    createdAt: createdAtBase.add(200 + index, "minute").toISOString(),
    updatedAt: createdAtBase.add(200 + index, "minute").toISOString(),
    contentVersion: 1,
    reviewMeta: {
      estimatedSeconds: 12,
      examTags: ["medical-latin", "vocab", item.examCue ?? "translation"],
      learningObjectives: ["Recall the term quickly", "Anchor exam cue and translation together"],
    },
    card: {
      type: "vocab",
      term: item.word,
      pronunciation: item.examCue ?? "medical latin",
      simpleDefinition: item.translation,
      advancedDefinition: `${item.translation}${item.hint ? ` ${item.hint}` : ""}`.trim(),
      relatedConcept: item.examCue ?? "medical latin adjective",
      exampleUsage: item.hint
        ? `Clinical usage cue: ${item.hint}`
        : `Translate and recognize "${item.word}" in fast anatomy and terminology prompts.`,
      mnemonic: item.examCue ? `Anchor it to this exam cue: ${item.examCue}.` : "Use the core translation as the recall hook.",
    },
  }));

export const loadSessionReelsForDeck = async (ref: DeckRef): Promise<Reel[]> => {
  const loaded = await learnDeckRepo.loadDeck(ref);
  return loaded.deckType === "vocab" ? toVocabReels(loaded) : toLearncardReels(loaded);
};

export const loadMixedSessionReels = async ({
  topicFolder,
  vocabFileName,
  quizFileName,
}: {
  topicFolder: string;
  vocabFileName: string;
  quizFileName: string;
}): Promise<Reel[]> => {
  const vocabRef = learnDeckRepo.getDeckRef(topicFolder, vocabFileName);
  const quizRef = learnDeckRepo.getDeckRef(topicFolder, quizFileName);
  if (!vocabRef || !quizRef) return [];

  const [vocab, quiz] = await Promise.all([loadSessionReelsForDeck(vocabRef), loadSessionReelsForDeck(quizRef)]);
  return [...vocab, ...quiz];
};
