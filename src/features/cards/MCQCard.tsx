import { Card } from "@heroui/react";
import { ChoiceList } from "@/features/cards/ChoiceList";
import { RevealPanel } from "@/features/cards/RevealPanel";
import type { MCQCard as MCQCardType, Reel } from "@/types/domain";

export const MCQCard = ({
  reel,
  card,
  selectedId,
  revealed,
  onSelect,
  onRevealToggle,
}: {
  reel: Reel;
  card: MCQCardType;
  selectedId?: string;
  revealed: boolean;
  onSelect: (id: string) => void;
  onRevealToggle: () => void;
}) => {
  const selectedOption = card.options.find((option) => option.id === selectedId);

  return (
    <div className="space-y-4">
      <Card className="space-y-4 rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-soft" data-no-swipe="true">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Rapid MCQ</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{reel.title}</h2>
        </div>
        <p className="text-base leading-7 text-slate-100">{card.stem}</p>
        <ChoiceList
          correctOptionId={card.correctOptionId}
          options={card.options}
          revealed={revealed}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </Card>
      <RevealPanel
        title={selectedOption ? `${selectedOption.label}. ${selectedOption.text}` : "Choose an answer"}
        body={selectedOption ? selectedOption.explanation : card.explanation}
        revealed={revealed}
        onToggle={onRevealToggle}
      />
    </div>
  );
};
