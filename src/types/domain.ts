import { z } from "zod";

export const reelTypeSchema = z.enum([
  "clinical_case",
  "anatomy_image",
  "mcq",
  "vocab",
  "social_post",
]);

export const difficultySchema = z.enum(["intro", "moderate", "high_yield", "challenge"]);

export const creatorProfileSchema = z.object({
  id: z.string(),
  handle: z.string(),
  displayName: z.string(),
  avatarUrl: z.string().url(),
  role: z.string(),
  specialty: z.string().optional(),
  followerCount: z.number().int().nonnegative(),
});

export const channelSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  accent: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const reviewStateSchema = z.object({
  reelId: z.string(),
  firstSeenAt: z.string(),
  lastReviewedAt: z.string().nullable(),
  easeFactor: z.number(),
  stability: z.number(),
  intervalDays: z.number(),
  dueAt: z.string(),
  lapseCount: z.number().int(),
  successStreak: z.number().int(),
  lastRating: z.enum(["again", "hard", "good", "easy"]).nullable(),
  priorityScore: z.number(),
});

export const sessionStatsSchema = z.object({
  xp: z.number().int().nonnegative(),
  streakDays: z.number().int().nonnegative(),
  dailyGoal: z.number().int().positive(),
  completedToday: z.number().int().nonnegative(),
  reviewsDue: z.number().int().nonnegative(),
  weakAreas: z.array(z.string()),
  masteryByChannel: z.record(z.number()),
});

export const socialMetricsSchema = z.object({
  likes: z.number().int().nonnegative(),
  bookmarks: z.number().int().nonnegative(),
  shares: z.number().int().nonnegative(),
});

export const reviewMetaSchema = z.object({
  estimatedSeconds: z.number().int().positive(),
  examTags: z.array(z.string()),
  learningObjectives: z.array(z.string()),
});

export const clinicalCaseCardSchema = z.object({
  type: z.literal("clinical_case"),
  stem: z.string(),
  question: z.string(),
  answer: z.string(),
  explanation: z.string(),
  differentialDiagnosis: z.array(z.string()),
  teachingPoints: z.array(z.string()),
  hint: z.string().optional(),
  nextBestStep: z.string().optional(),
  mechanism: z.string(),
});

export const anatomyHotspotSchema = z.object({
  id: z.string(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  radius: z.number(),
  explanation: z.string(),
});

export const anatomyImageCardSchema = z.object({
  type: z.literal("anatomy_image"),
  imageUrl: z.string().url(),
  prompt: z.string(),
  hint: z.string().optional(),
  hotspots: z.array(anatomyHotspotSchema),
  revealMode: z.enum(["tap", "guided"]),
  answerExplanation: z.string(),
});

export const mcqOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  text: z.string(),
  explanation: z.string(),
});

export const mcqCardSchema = z.object({
  type: z.literal("mcq"),
  stem: z.string(),
  options: z.array(mcqOptionSchema),
  correctOptionId: z.string(),
  explanation: z.string(),
});

export const vocabularyCardSchema = z.object({
  type: z.literal("vocab"),
  term: z.string(),
  pronunciation: z.string(),
  simpleDefinition: z.string(),
  advancedDefinition: z.string(),
  relatedConcept: z.string(),
  exampleUsage: z.string(),
  mnemonic: z.string(),
});

export const socialPostCardSchema = z.object({
  type: z.literal("social_post"),
  caption: z.string(),
  mediaUrl: z.string().url(),
  cta: z.string(),
  educationalTakeaway: z.string(),
  metrics: socialMetricsSchema,
});

export const studyCardSchema = z.discriminatedUnion("type", [
  clinicalCaseCardSchema,
  anatomyImageCardSchema,
  mcqCardSchema,
  vocabularyCardSchema,
  socialPostCardSchema,
]);

export const reelSchema = z.object({
  id: z.string(),
  type: reelTypeSchema,
  title: z.string(),
  description: z.string(),
  channels: z.array(z.string()),
  tags: z.array(z.string()),
  difficulty: difficultySchema,
  creatorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  contentVersion: z.number().int().positive(),
  coverImageUrl: z.string().url().optional(),
  reviewMeta: reviewMetaSchema,
  socialMetrics: socialMetricsSchema.optional(),
  card: studyCardSchema,
});

export type CreatorProfile = z.infer<typeof creatorProfileSchema>;
export type Channel = z.infer<typeof channelSchema>;
export type ReviewState = z.infer<typeof reviewStateSchema>;
export type SessionStats = z.infer<typeof sessionStatsSchema>;
export type ClinicalCaseCard = z.infer<typeof clinicalCaseCardSchema>;
export type AnatomyImageCard = z.infer<typeof anatomyImageCardSchema>;
export type MCQCard = z.infer<typeof mcqCardSchema>;
export type VocabularyCard = z.infer<typeof vocabularyCardSchema>;
export type SocialPostCard = z.infer<typeof socialPostCardSchema>;
export type StudyCard = z.infer<typeof studyCardSchema>;
export type Reel = z.infer<typeof reelSchema>;

export interface FeedState {
  channelId: string;
  ids: string[];
  currentIndex: number;
  hasMore: boolean;
  prefetchedUntil: number;
}
