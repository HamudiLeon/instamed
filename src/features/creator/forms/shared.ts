import { z } from "zod";

export const clinicalCaseFormSchema = z.object({
  title: z.string().min(6),
  stem: z.string().min(20),
  question: z.string().min(10),
  answer: z.string().min(10),
  explanation: z.string().min(20),
  mechanism: z.string().min(10),
});

export const vocabularyFormSchema = z.object({
  title: z.string().min(4),
  term: z.string().min(2),
  simpleDefinition: z.string().min(6),
  advancedDefinition: z.string().min(12),
  mnemonic: z.string().min(6),
});

export const anatomyFormSchema = z.object({
  title: z.string().min(4),
  prompt: z.string().min(8),
  imageUrl: z.string().url(),
  answerExplanation: z.string().min(12),
});

export const quizFormSchema = z.object({
  title: z.string().min(4),
  stem: z.string().min(12),
  optionA: z.string().min(2),
  optionB: z.string().min(2),
  optionC: z.string().min(2),
  optionD: z.string().min(2),
  correctOptionId: z.enum(["a", "b", "c", "d"]),
});

export type ClinicalCaseFormValues = z.infer<typeof clinicalCaseFormSchema>;
export type VocabularyFormValues = z.infer<typeof vocabularyFormSchema>;
export type AnatomyFormValues = z.infer<typeof anatomyFormSchema>;
export type QuizFormValues = z.infer<typeof quizFormSchema>;
