import { cn } from "@/lib/utils";
import type { AnatomyImageCard } from "@/types/domain";

export const HotspotImage = ({
  imageUrl,
  hotspots,
  activeHotspotId,
  revealed,
  onHotspotSelect,
}: {
  imageUrl: string;
  hotspots: AnatomyImageCard["hotspots"];
  activeHotspotId?: string;
  revealed: boolean;
  onHotspotSelect: (id: string) => void;
}) => (
  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
    <img alt="Anatomy prompt" className="h-[36vh] w-full object-cover" src={imageUrl} />
    {hotspots.map((hotspot) => (
      <button
        key={hotspot.id}
        aria-label={`Reveal ${hotspot.label}`}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all",
          activeHotspotId === hotspot.id || revealed
            ? "border-cyan-300 bg-cyan-400/25"
            : "border-white/50 bg-black/25",
        )}
        style={{
          left: `${hotspot.x}%`,
          top: `${hotspot.y}%`,
          width: `${hotspot.radius * 2}px`,
          height: `${hotspot.radius * 2}px`,
        }}
        type="button"
        onClick={() => onHotspotSelect(hotspot.id)}
      />
    ))}
  </div>
);
