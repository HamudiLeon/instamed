import type { ReactNode } from "react";
import { Button, Card } from "@heroui/react";
import { BookOpen, RotateCcw } from "lucide-react";
import { BottomBlurPanel } from "@/components/ui/BottomBlurPanel";

export const RevealPanel = ({
  title,
  body,
  extra,
  revealed,
  onToggle,
}: {
  title: string;
  body: string;
  extra?: ReactNode;
  revealed: boolean;
  onToggle: () => void;
}) => (
  <BottomBlurPanel className="space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Reveal Sheet</p>
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <Button
        className="border border-white/10 bg-white/6 text-white"
        radius="full"
        startContent={revealed ? <RotateCcw className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
        variant="flat"
        onPress={onToggle}
      >
        {revealed ? "Hide" : "Reveal"}
      </Button>
    </div>
    <Card className="border border-white/10 bg-white/5 p-4 shadow-none">
      <p className="text-sm leading-6 text-slate-200">{revealed ? body : "Interact first, then reveal the explanation."}</p>
    </Card>
    {revealed ? extra : null}
  </BottomBlurPanel>
);
