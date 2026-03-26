import dayjs from "dayjs";
import { clamp } from "@/lib/utils";
import type { Reel, ReviewState } from "@/types/domain";

export type ReviewRating = "again" | "hard" | "good" | "easy";

const ratingWeights: Record<ReviewRating, number> = {
  again: 0.2,
  hard: 0.85,
  good: 1.25,
  easy: 1.75,
};

const difficultyWeights: Record<Reel["difficulty"], number> = {
  intro: 0.95,
  moderate: 1,
  high_yield: 1.1,
  challenge: 1.2,
};

export const createInitialReviewState = (reelId: string): ReviewState => {
  const now = dayjs();
  return {
    reelId,
    firstSeenAt: now.toISOString(),
    lastReviewedAt: null,
    easeFactor: 2.3,
    stability: 1,
    intervalDays: 0,
    dueAt: now.add(15, "minute").toISOString(),
    lapseCount: 0,
    successStreak: 0,
    lastRating: null,
    priorityScore: 1,
  };
};

export const applyReviewRating = (
  previous: ReviewState,
  reel: Reel,
  rating: ReviewRating,
  weakAreaMultiplier = 1,
): ReviewState => {
  const now = dayjs();
  const difficultyMultiplier = difficultyWeights[reel.difficulty];

  let easeFactor = previous.easeFactor;
  let intervalDays = previous.intervalDays;
  let stability = previous.stability;
  let lapseCount = previous.lapseCount;
  let successStreak = previous.successStreak;

  if (rating === "again") {
    lapseCount += 1;
    successStreak = 0;
    easeFactor = clamp(previous.easeFactor - 0.25, 1.3, 3.0);
    intervalDays = 0.02;
    stability = Math.max(0.8, previous.stability * 0.6);
  } else if (rating === "hard") {
    successStreak += 1;
    easeFactor = clamp(previous.easeFactor - 0.12, 1.3, 3.0);
    intervalDays = Math.max(0.15, (previous.intervalDays || 0.3) * 1.2);
    stability = previous.stability * 1.08;
  } else if (rating === "good") {
    successStreak += 1;
    easeFactor = clamp(previous.easeFactor + 0.04, 1.3, 3.2);
    intervalDays = Math.max(0.8, (previous.intervalDays || 0.5) * previous.easeFactor * 1.15);
    stability = previous.stability * 1.24;
  } else {
    successStreak += 1;
    easeFactor = clamp(previous.easeFactor + 0.12, 1.3, 3.4);
    intervalDays = Math.max(1.5, (previous.intervalDays || 0.75) * previous.easeFactor * 1.5);
    stability = previous.stability * 1.38;
  }

  intervalDays *= ratingWeights[rating] * difficultyMultiplier;
  const dueAt = now.add(intervalDays, "day");

  const priorityScore = derivePriorityScore({
    dueAt: dueAt.toISOString(),
    difficulty: reel.difficulty,
    lapseCount,
    weakAreaMultiplier,
    lastReviewedAt: now.toISOString(),
  });

  return {
    reelId: previous.reelId,
    firstSeenAt: previous.firstSeenAt,
    lastReviewedAt: now.toISOString(),
    easeFactor,
    stability,
    intervalDays,
    dueAt: dueAt.toISOString(),
    lapseCount,
    successStreak,
    lastRating: rating,
    priorityScore,
  };
};

export const derivePriorityScore = ({
  dueAt,
  difficulty,
  lapseCount,
  weakAreaMultiplier,
  lastReviewedAt,
}: {
  dueAt: string;
  difficulty: Reel["difficulty"];
  lapseCount: number;
  weakAreaMultiplier: number;
  lastReviewedAt?: string | null;
}) => {
  const now = dayjs();
  const overdueAmount = Math.max(0, now.diff(dayjs(dueAt), "hour", true));
  const difficultyBoost = { intro: 0.85, moderate: 1, high_yield: 1.15, challenge: 1.3 }[
    difficulty
  ];
  const recencyPenalty = lastReviewedAt
    ? Math.max(0.65, 1 - Math.min(0.35, now.diff(dayjs(lastReviewedAt), "hour", true) / 48))
    : 1;

  return Number(
    (
      (1 + overdueAmount * 0.08 + lapseCount * 0.18) *
      difficultyBoost *
      weakAreaMultiplier *
      recencyPenalty
    ).toFixed(2),
  );
};
