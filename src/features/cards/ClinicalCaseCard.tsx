import { Button, Card, Chip } from "@heroui/react";
import { Clock3, Microscope, TriangleAlert } from "lucide-react";
import { RevealPanel } from "@/features/cards/RevealPanel";
import type { ClinicalCaseCard as ClinicalCaseCardType, Reel } from "@/types/domain";

export const ClinicalCaseCard = ({
  reel,
  card,
  revealed,
  onRevealToggle,
}: {
  reel: Reel;
  card: ClinicalCaseCardType;
  revealed: boolean;
  onRevealToggle: () => void;
}) => (
  <div className="space-y-4">
    <Card className="space-y-4 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Clinical Vignette</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-white">{reel.title}</h2>
        </div>
        <Chip className="border border-white/10 bg-white/10 text-white" size="sm" variant="flat">
          {reel.difficulty.replace("_", " ")}
        </Chip>
      </div>
      <p className="text-sm leading-6 text-slate-200">{card.stem}</p>
      <Card className="rounded-[24px] border border-cyan-300/20 bg-cyan-400/10 p-4 shadow-none">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
          <Microscope className="h-4 w-4" />
          Mechanism First
        </div>
        <p className="mt-2 text-sm text-cyan-50">{card.mechanism}</p>
      </Card>
      <p className="text-lg font-medium leading-snug text-white">{card.question}</p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          {reel.reviewMeta.estimatedSeconds}s
        </span>
        {card.nextBestStep ? (
          <span className="inline-flex items-center gap-1">
            <TriangleAlert className="h-3.5 w-3.5" />
            Next best step focus
          </span>
        ) : null}
      </div>
      <Button className="bg-white text-black" radius="full" onPress={onRevealToggle}>
        {revealed ? "Hide Answer" : "Reveal Answer"}
      </Button>
    </Card>
    <RevealPanel
      title={card.answer}
      body={card.explanation}
      revealed={revealed}
      onToggle={onRevealToggle}
      extra={
        <div className="grid gap-3">
          <Card className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-none">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Differential</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {card.differentialDiagnosis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-none">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Teaching Points</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {card.teachingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>
        </div>
      }
    />
  </div>
);
