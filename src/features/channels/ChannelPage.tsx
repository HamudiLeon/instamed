import { Button } from "@heroui/react";
import { ChevronDown, Layers3 } from "lucide-react";
import { useChannelsStore } from "@/stores/channelsStore";
import { ChannelTabs } from "@/features/channels/ChannelTabs";
import { ActionHub } from "@/features/feed/ActionHub";
import { ReelContainer } from "@/features/feed/ReelContainer";
import { TopGradientOverlay } from "@/components/ui/TopGradientOverlay";

export const ChannelPage = () => {
  const activeChannelId = useChannelsStore((state) => state.activeChannelId);
  const immersiveSession = useChannelsStore((state) => state.immersiveSession);
  const sessionMode = useChannelsStore((state) => state.sessionMode);
  const sessionTopicFolder = useChannelsStore((state) => state.sessionTopicFolder);
  const vocabDeckFileName = useChannelsStore((state) => state.vocabDeckFileName);
  const quizDeckFileName = useChannelsStore((state) => state.quizDeckFileName);
  const setImmersiveSession = useChannelsStore((state) => state.setImmersiveSession);
  const effectiveFeedId = immersiveSession ? `session:${sessionMode}` : activeChannelId;
  const sessionLabel =
    sessionMode === "vocab" ? "Vocabulary Session" : sessionMode === "quiz" ? "Quiz Session" : "Mixed Session";

  if (!immersiveSession) {
    return (
      <main className="relative min-h-screen overflow-y-auto px-4 pb-32 pt-[calc(var(--safe-top)+0.75rem)]">
        <TopGradientOverlay />
        <div className="relative z-10">
          <ActionHub />
          <div className="mt-4 rounded-[22px] border border-white/10 bg-black/28 px-2 py-2 backdrop-blur-2xl">
            <ChannelTabs />
          </div>
          <div className="mt-4 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-soft backdrop-blur-2xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Browse Mode</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Choose decks, then start the session</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Browse is now a launcher surface only. It previews the selected JSON deck pair instead of rendering a
              live reel feed underneath the UI.
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Topic</p>
                <p className="mt-2 text-base font-medium text-white">{sessionTopicFolder}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Vocabulary deck</p>
                <p className="mt-2 text-base font-medium text-white">{vocabDeckFileName.replace(".json", "")}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Quiz deck</p>
                <p className="mt-2 text-base font-medium text-white">{quizDeckFileName.replace(".json", "")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen">
      <TopGradientOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-[calc(var(--safe-top)+0.75rem)]">
        <div className="pointer-events-auto flex items-center justify-between">
          <Button
            className="h-10 rounded-full border border-white/10 bg-black/38 px-4 text-white backdrop-blur-2xl"
            radius="full"
            startContent={<ChevronDown className="h-4 w-4" />}
            variant="flat"
            onPress={() => setImmersiveSession(false)}
          >
            Browse
          </Button>
          <div className="rounded-full border border-white/10 bg-black/38 px-4 py-2 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-2xl">
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-3.5 w-3.5" />
              {sessionLabel}
            </span>
          </div>
        </div>
      </div>
      <ReelContainer channelId={effectiveFeedId} />
    </main>
  );
};
