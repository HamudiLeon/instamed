import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Chip, Progress } from "@heroui/react";
import { motion } from "motion/react";
import { RevealPanel } from "@/features/cards/RevealPanel";
import { useReviewStore } from "@/features/review/reviewStore";
import type { Reel, VocabularyCard as VocabularyCardType } from "@/types/domain";

const AUTO_FLIP_MS = 10_000;

export const VocabularyCard = ({
  reel,
  card,
  revealed,
  onRevealToggle,
}: {
  reel: Reel;
  card: VocabularyCardType;
  revealed: boolean;
  onRevealToggle: () => void;
}) => {
  const ensureReviewState = useReviewStore((state) => state.ensureReviewState);
  const review = useReviewStore((state) => state.byId[reel.id]);
  const [progress, setProgress] = useState(0);
  const flipTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    ensureReviewState(reel.id);
  }, [ensureReviewState, reel.id]);

  useEffect(() => {
    if (flipTimeoutRef.current) {
      window.clearTimeout(flipTimeoutRef.current);
    }
    if (tickIntervalRef.current) {
      window.clearInterval(tickIntervalRef.current);
    }

    if (revealed) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const startedAt = Date.now();

    tickIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, (elapsed / AUTO_FLIP_MS) * 100));
    }, 100);

    flipTimeoutRef.current = window.setTimeout(() => {
      onRevealToggle();
    }, AUTO_FLIP_MS);

    return () => {
      if (flipTimeoutRef.current) {
        window.clearTimeout(flipTimeoutRef.current);
      }
      if (tickIntervalRef.current) {
        window.clearInterval(tickIntervalRef.current);
      }
    };
  }, [revealed, reel.id]);

  const frontLabel = useMemo(
    () => Math.max(0, Math.ceil((AUTO_FLIP_MS * (1 - progress / 100)) / 1000)),
    [progress],
  );
  const stopTouchPropagation = (event: React.TouchEvent | React.PointerEvent | React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="space-y-4">
      <div className="perspective-[1800px] relative min-h-[30rem]">
        <motion.div
          animate={{ rotateY: revealed ? 180 : 0 }}
          className="relative min-h-[30rem] w-full"
          style={{ transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          <Card
            className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-soft"
            data-no-swipe="true"
            style={{ backfaceVisibility: "hidden", pointerEvents: revealed ? "none" : "auto" }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Vocabulary Trainer</p>
                  <h2 className="mt-3 max-w-[12rem] break-words text-[2.7rem] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                    {card.term}
                  </h2>
                </div>
                <Chip className="max-w-[7.5rem] border border-white/10 bg-emerald-500/10 text-emerald-100" variant="flat">
                  <span className="truncate">{card.pronunciation}</span>
                </Chip>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  <span>Auto flip</span>
                  <span>{frontLabel}s</span>
                </div>
                <Progress
                  aria-label="Vocabulary auto-flip timer"
                  classNames={{
                    track: "bg-white/10",
                    indicator: "bg-gradient-to-r from-emerald-400 via-cyan-300 to-white",
                  }}
                  radius="full"
                  size="sm"
                  value={progress}
                />
              </div>

              <Card className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-none">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Recall Prompt</p>
                <p className="mt-3 text-xl font-medium text-white">Say the meaning before the card flips.</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{card.relatedConcept}</p>
              </Card>

              <div className="mt-auto">
                <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Ease {review?.easeFactor.toFixed(2) ?? "2.30"}</span>
                  <span>Streak {review?.successStreak ?? 0}</span>
                  <span>Lapses {review?.lapseCount ?? 0}</span>
                </div>
                <button
                  className="h-10 w-full rounded-full bg-white text-sm font-medium text-black"
                  data-no-swipe="true"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRevealToggle();
                  }}
                  onMouseDownCapture={stopTouchPropagation}
                  onPointerDownCapture={stopTouchPropagation}
                  onTouchEnd={(event) => {
                    event.stopPropagation();
                    onRevealToggle();
                  }}
                  onTouchMoveCapture={stopTouchPropagation}
                  onTouchStartCapture={stopTouchPropagation}
                >
                  Flip Now
                </button>
              </div>
            </div>
          </Card>

          <Card
            className="absolute inset-0 overflow-hidden rounded-[30px] border border-emerald-300/20 bg-[linear-gradient(180deg,rgba(22,101,52,0.72),rgba(9,16,14,0.96))] p-5 shadow-soft"
            data-no-swipe="true"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              pointerEvents: revealed ? "auto" : "none",
            }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Answer Side</p>
                  <h2 className="mt-3 max-w-[12rem] break-words text-[2.7rem] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                    {card.term}
                  </h2>
                </div>
                <Chip className="max-w-[7.5rem] border border-emerald-200/15 bg-emerald-500/10 text-emerald-50" variant="flat">
                  <span className="truncate">{card.pronunciation}</span>
                </Chip>
              </div>

              <Card className="mt-5 rounded-[24px] border border-emerald-200/10 bg-emerald-500/10 p-5 shadow-none">
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Simple Definition</p>
                <p className="mt-3 text-[1.35rem] font-medium leading-8 text-white">{card.simpleDefinition}</p>
              </Card>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <Card className="rounded-[22px] border border-white/10 bg-black/18 p-4 shadow-none">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Exam Cue</p>
                  <p className="mt-2 text-sm leading-6 text-white">{card.relatedConcept}</p>
                </Card>
                <Card className="rounded-[22px] border border-white/10 bg-black/18 p-4 shadow-none">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Memory Hook</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">{card.mnemonic}</p>
                </Card>
              </div>

              <div className="mt-auto">
                <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="truncate pr-2">Usage {card.exampleUsage}</span>
                  <span className="shrink-0">{reel.reviewMeta.estimatedSeconds}s</span>
                </div>
                <button
                  className="h-10 w-full rounded-full border border-white/10 bg-white/6 text-sm font-medium text-white"
                  data-no-swipe="true"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRevealToggle();
                  }}
                  onMouseDownCapture={stopTouchPropagation}
                  onPointerDownCapture={stopTouchPropagation}
                  onTouchEnd={(event) => {
                    event.stopPropagation();
                    onRevealToggle();
                  }}
                  onTouchMoveCapture={stopTouchPropagation}
                  onTouchStartCapture={stopTouchPropagation}
                >
                  Flip Back
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      <RevealPanel
        title={card.relatedConcept}
        body={card.advancedDefinition}
        revealed={revealed}
        onToggle={onRevealToggle}
        extra={
          <div className="grid gap-3">
            <Card className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-none">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Usage</p>
              <p className="mt-2 text-sm text-slate-200">{card.exampleUsage}</p>
            </Card>
            <Card className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-none">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mnemonic</p>
              <p className="mt-2 text-sm text-slate-200">{card.mnemonic}</p>
            </Card>
          </div>
        }
      />
    </div>
  );
};
