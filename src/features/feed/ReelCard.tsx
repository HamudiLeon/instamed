import { useMemo, useState } from "react";
import { Avatar, Button, Chip } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Clock3, Heart, Share2, Sparkles } from "lucide-react";
import { AnatomyImageCard } from "@/features/cards/AnatomyImageCard";
import { ClinicalCaseCard } from "@/features/cards/ClinicalCaseCard";
import { MCQCard } from "@/features/cards/MCQCard";
import { SocialStudyPostCard } from "@/features/cards/SocialStudyPostCard";
import { VocabularyCard } from "@/features/cards/VocabularyCard";
import { useReviewStore } from "@/features/review/reviewStore";
import { fetchCreators } from "@/mocks/api";
import { useChannelsStore } from "@/stores/channelsStore";
import { useSavedStore } from "@/stores/savedStore";
import { useSessionStore } from "@/stores/sessionStore";
import type { Reel } from "@/types/domain";

export const ReelCard = ({ reel }: { reel: Reel }) => {
  const [revealed, setRevealed] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string>();
  const [activeHotspotId, setActiveHotspotId] = useState<string>();
  const [expandedDescription, setExpandedDescription] = useState(false);
  const { data: creators = [] } = useQuery({
    queryKey: ["creators"],
    queryFn: fetchCreators,
  });
  const creator = useMemo(() => creators.find((item) => item.id === reel.creatorId), [creators, reel.creatorId]);
  const immersiveSession = useChannelsStore((state) => state.immersiveSession);
  const toggleSaved = useSavedStore((state) => state.toggleSaved);
  const saved = useSavedStore((state) => state.savedIds.includes(reel.id));
  const rateCard = useReviewStore((state) => state.rateCard);
  const incrementXP = useSessionStore((state) => state.incrementXP);
  const incrementCompleted = useSessionStore((state) => state.incrementCompleted);

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    rateCard(reel, rating, reel.tags.some((tag) => ["renal", "acid-base"].includes(tag)) ? 1.15 : 1);
    incrementXP(rating === "easy" ? 18 : rating === "good" ? 12 : rating === "hard" ? 8 : 4, reel.channels[0]);
    incrementCompleted();
    setRevealed(false);
  };

  return (
    <div
      className={
        immersiveSession
          ? "flex h-full flex-col justify-between px-4 pb-32 pt-[calc(var(--safe-top)+8.5rem)]"
          : "flex h-full flex-col justify-between px-4 pb-32 pt-[calc(var(--safe-top)+22rem)]"
      }
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="rounded-[24px] border border-white/10 bg-black/36 px-3 py-3 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white/8" src={creator?.avatarUrl} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{creator?.displayName ?? "Study Creator"}</p>
                <Chip className="border border-white/10 bg-white/8 text-white" size="sm" variant="flat">
                  {creator?.handle ?? "@instamed"}
                </Chip>
              </div>
              <p
                className={
                  expandedDescription
                    ? "mt-1 max-w-[14rem] text-xs leading-5 text-slate-300"
                    : "mt-1 max-w-[14rem] line-clamp-2 text-xs leading-5 text-slate-300"
                }
              >
                {reel.description}
              </p>
              {reel.description.length > 88 ? (
                <button
                  className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500"
                  data-no-swipe="true"
                  type="button"
                  onClick={() => setExpandedDescription((value) => !value)}
                >
                  {expandedDescription ? "Less" : "More"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button isIconOnly className="bg-black/36 text-white backdrop-blur-xl" radius="full" variant="flat">
            <Heart className="h-4 w-4" />
          </Button>
          <Button isIconOnly className="bg-black/36 text-white backdrop-blur-xl" radius="full" variant="flat" onPress={() => toggleSaved(reel.id)}>
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button isIconOnly className="bg-black/36 text-white backdrop-blur-xl" radius="full" variant="flat">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 py-3">
        {reel.card.type === "clinical_case" ? (
          <ClinicalCaseCard reel={reel} card={reel.card} revealed={revealed} onRevealToggle={() => setRevealed((value) => !value)} />
        ) : null}
        {reel.card.type === "anatomy_image" ? (
          <AnatomyImageCard
            activeHotspotId={activeHotspotId}
            card={reel.card}
            reel={reel}
            revealed={revealed}
            onHotspotSelect={(id) => {
              setActiveHotspotId(id);
              setRevealed(true);
            }}
            onRevealToggle={() => setRevealed((value) => !value)}
          />
        ) : null}
        {reel.card.type === "mcq" ? (
          <MCQCard
            card={reel.card}
            reel={reel}
            revealed={revealed}
            selectedId={selectedChoice}
            onRevealToggle={() => setRevealed((value) => !value)}
            onSelect={(id) => {
              setSelectedChoice(id);
              setRevealed(true);
            }}
          />
        ) : null}
        {reel.card.type === "vocab" ? (
          <VocabularyCard reel={reel} card={reel.card} revealed={revealed} onRevealToggle={() => setRevealed((value) => !value)} />
        ) : null}
        {reel.card.type === "social_post" ? (
          <SocialStudyPostCard card={reel.card} creator={creator} reel={reel} saved={saved} onToggleSaved={() => toggleSaved(reel.id)} />
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="rounded-[22px] border border-white/10 bg-black/34 px-3 py-3 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {reel.reviewMeta.estimatedSeconds}s
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {reel.reviewMeta.examTags.join(" · ")}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {(["again", "hard", "good", "easy"] as const).map((rating) => (
              <Button
                key={rating}
                className="h-11 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] text-sm capitalize text-white backdrop-blur-xl"
                variant="flat"
                onPress={() => handleRate(rating)}
              >
                {rating}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
