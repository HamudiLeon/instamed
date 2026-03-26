import dayjs from "dayjs";
import quizDeckRaw from "@/data/studywithme/med-latin/deck-03.json";
import vocabDeckRaw from "@/data/studywithme/med-latin/deck-voc-01.json";
import { studyWithMeLearncardSchema, studyWithMeVocabSchema } from "@/types/studyDeck";
import type { Reel } from "@/types/domain";

const quizDeck = studyWithMeLearncardSchema.parse(quizDeckRaw);
const vocabDeck = studyWithMeVocabSchema.parse(vocabDeckRaw);

const createdAtBase = dayjs("2026-03-27T08:00:00.000Z");

export const studyDeckQuizReels: Reel[] = quizDeck.cards.map((card, index) => ({
  id: `studydeck-quiz-${card.cardId}`,
  type: "mcq",
  title: quizDeck.meta.title.en ?? "Medical Latin Quiz",
  description: quizDeck.meta.description.en ?? "Imported quiz deck from StudyWithMe.",
  channels: ["for-you", "rapid-review", "vocabulary", "step1"],
  tags: [
    ...quizDeck.meta.tags,
    "studywithme-import",
    "quiz-session",
    `deck:${quizDeck.deckKey}`,
    "session:quiz",
  ],
  difficulty: "moderate",
  creatorId: "creator-3",
  createdAt: createdAtBase.add(index, "minute").toISOString(),
  updatedAt: createdAtBase.add(index, "minute").toISOString(),
  contentVersion: 1,
  reviewMeta: {
    estimatedSeconds: 18,
    examTags: ["medical-latin", "quiz", quizDeck.meta.level],
    learningObjectives: ["Strengthen recognition of core Medical Latin phrases", "Keep a fast exam-style response loop"],
  },
  card: {
    type: "mcq",
    stem: card.question.en ?? "Select the correct answer.",
    options: card.options.map((option, optionIndex) => ({
      id: `opt-${optionIndex + 1}`,
      label: String.fromCharCode(65 + optionIndex),
      text: option,
      explanation:
        option === card.correctAnswer
          ? card.explanation?.en ?? "Correct answer from imported StudyWithMe deck."
          : "Not the keyed answer for this imported quiz item.",
    })),
    correctOptionId: `opt-${Math.max(1, card.options.findIndex((option) => option === card.correctAnswer) + 1)}`,
    explanation: card.explanation?.en ?? "Imported from StudyWithMe Medical Latin learncards.",
  },
}));

export const studyDeckVocabReels: Reel[] = vocabDeck.items.map((item, index) => ({
  id: `studydeck-vocab-${index + 1}`,
  type: "vocab",
  title: vocabDeck.title,
  description: "Imported vocabulary trainer item from StudyWithMe Medical Latin deck.",
  channels: ["for-you", "vocabulary", "rapid-review"],
  tags: [
    "vocab",
    "medical-latin",
    "studywithme-import",
    "trainer",
    `deck:${vocabDeck.bookKey ?? "la-adjectiva-medica-core"}`,
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

export const studyDeckSessionReels: Reel[] = [
  ...studyDeckVocabReels.slice(0, 18),
  ...studyDeckQuizReels.slice(0, 18),
];

export const studyDeckSessionMeta = {
  vocab: {
    key: vocabDeck.bookKey ?? "la-adjectiva-medica-core",
    title: vocabDeck.title,
    count: studyDeckVocabReels.length,
  },
  quiz: {
    key: quizDeck.deckKey,
    title: quizDeck.meta.title.en ?? "Medical Latin Quiz",
    count: studyDeckQuizReels.length,
  },
};
