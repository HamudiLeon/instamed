import { useMemo } from "react";
import { Card, Chip } from "@heroui/react";
import { EmptyState } from "@/components/ui/EmptyState";
import { reels } from "@/mocks/reels";
import { useSavedStore } from "@/stores/savedStore";

export const LibraryPage = () => {
  const savedIds = useSavedStore((state) => state.savedIds);
  const reviewLaterIds = useSavedStore((state) => state.reviewLaterIds);
  const savedReels = useMemo(() => reels.filter((reel) => savedIds.includes(reel.id)), [savedIds]);

  return (
    <main className="min-h-screen px-4 pb-32 pt-[calc(var(--safe-top)+1rem)]">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Library</p>
        <h1 className="text-2xl font-semibold">Saved Study Decks</h1>
      </div>
      <div className="mb-4 flex gap-2">
        <Chip className="border border-white/10 bg-white/5 text-white" variant="flat">
          Saved {savedReels.length}
        </Chip>
        <Chip className="border border-white/10 bg-white/5 text-white" variant="flat">
          Review later {reviewLaterIds.length}
        </Chip>
      </div>
      {savedReels.length === 0 ? (
        <EmptyState
          title="No saved reels yet"
          description="Bookmark clinical cases, anatomy drills, and creator pearls to build a personalized review deck."
        />
      ) : (
        <div className="space-y-3">
          {savedReels.map((reel) => (
            <Card key={reel.id} className="rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-none">
              <p className="text-sm text-slate-400">{reel.channels.join(" · ")}</p>
              <p className="mt-1 text-lg font-semibold text-white">{reel.title}</p>
              <p className="mt-2 text-sm text-slate-300">{reel.description}</p>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};
