import { z } from "zod";

const localizedTextSchema = z.object({
  en: z.string().optional(),
  de: z.string().optional(),
  la: z.string().optional(),
});

export const studyWithMeLearncardSchema = z.object({
  schemaId: z.literal("studywithme-bg.learncard.v1"),
  deckKey: z.string(),
  meta: z.object({
    title: localizedTextSchema,
    description: localizedTextSchema,
    level: z.string(),
    tags: z.array(z.string()),
    difficulty: z.string(),
    estimatedMinutes: z.number(),
    cardCount: z.number(),
    languages: z.object({
      source: z.string(),
      target: z.string(),
    }),
    source: z
      .object({
        file: z.string().optional(),
        exam: z.string().optional(),
      })
      .optional(),
  }),
  cards: z.array(
    z.object({
      cardId: z.string(),
      type: z.literal("mcq"),
      question: localizedTextSchema,
      correctAnswer: z.string(),
      options: z.array(z.string()),
      explanation: localizedTextSchema.optional(),
    }),
  ),
});

export const studyWithMeVocabSchema = z.object({
  schemaId: z.union([z.literal("studywithme-bg.vocab.v1"), z.literal("studywithme-bg.vocab.v2")]),
  bookKey: z.string().optional(),
  chapterKey: z.string().optional(),
  title: z.string(),
  items: z.array(
    z.object({
      word: z.string(),
      translation: z.string(),
      hint: z.string().optional(),
      examCue: z.string().optional(),
    }),
  ),
});

export type StudyWithMeLearncardDeck = z.infer<typeof studyWithMeLearncardSchema>;
export type StudyWithMeVocabDeck = z.infer<typeof studyWithMeVocabSchema>;
