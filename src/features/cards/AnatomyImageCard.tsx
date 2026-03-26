import { Card, Chip } from "@heroui/react";
import { HotspotImage } from "@/features/cards/HotspotImage";
import { RevealPanel } from "@/features/cards/RevealPanel";
import type { AnatomyImageCard as AnatomyImageCardType, Reel } from "@/types/domain";

export const AnatomyImageCard = ({
  reel,
  card,
  revealed,
  activeHotspotId,
  onHotspotSelect,
  onRevealToggle,
}: {
  reel: Reel;
  card: AnatomyImageCardType;
  revealed: boolean;
  activeHotspotId?: string;
  onHotspotSelect: (id: string) => void;
  onRevealToggle: () => void;
}) => {
  const selectedHotspot = card.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? card.hotspots[0];

  return (
    <div className="space-y-4">
      <Card className="space-y-4 rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Anatomy Label Drill</p>
            <h2 className="mt-2 text-2xl font-semibold">{reel.title}</h2>
          </div>
          <Chip className="border border-white/10 bg-white/10 text-white" variant="flat">
            Tap to label
          </Chip>
        </div>
        <p className="text-sm text-slate-300">{card.prompt}</p>
        <HotspotImage
          activeHotspotId={activeHotspotId}
          hotspots={card.hotspots}
          imageUrl={card.imageUrl}
          revealed={revealed}
          onHotspotSelect={onHotspotSelect}
        />
        <p className="text-sm text-slate-400">{card.hint}</p>
      </Card>
      <RevealPanel
        title={selectedHotspot.label}
        body={selectedHotspot.explanation}
        revealed={revealed}
        onToggle={onRevealToggle}
        extra={
          <Card className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-none">
            <p className="text-sm leading-6 text-slate-200">{card.answerExplanation}</p>
          </Card>
        }
      />
    </div>
  );
};
