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
  const setImmersiveSession = useChannelsStore((state) => state.setImmersiveSession);
  const effectiveFeedId = immersiveSession ? `session:${sessionMode}` : activeChannelId;
  const sessionLabel =
    sessionMode === "vocab" ? "Vocabulary Session" : sessionMode === "quiz" ? "Quiz Session" : "Mixed Session";

  return (
    <main className="relative h-screen">
      <TopGradientOverlay />
      {!immersiveSession ? (
        <header className="absolute inset-x-0 top-0 z-20 px-4 pb-3 pt-[calc(var(--safe-top)+0.75rem)]">
          <ActionHub />
          <div className="mt-4 rounded-[22px] border border-white/10 bg-black/28 px-2 py-2 backdrop-blur-2xl">
            <ChannelTabs />
          </div>
        </header>
      ) : (
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
      )}
      <ReelContainer channelId={effectiveFeedId} />
    </main>
  );
};
