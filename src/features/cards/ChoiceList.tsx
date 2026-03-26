import { cn } from "@/lib/utils";
import type { MCQCard } from "@/types/domain";

export const ChoiceList = ({
  options,
  selectedId,
  revealed,
  correctOptionId,
  onSelect,
}: {
  options: MCQCard["options"];
  selectedId?: string;
  revealed: boolean;
  correctOptionId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="space-y-2" data-no-swipe="true">
    {options.map((option) => {
      const isCorrect = option.id === correctOptionId;
      const isSelected = option.id === selectedId;
      return (
        <button
          key={option.id}
          data-no-swipe="true"
          className={cn(
            "block h-auto w-full rounded-[22px] border px-4 py-4 text-left text-sm",
            "border-white/10 bg-white/5 text-white",
            revealed && isCorrect && "border-emerald-400/40 bg-emerald-500/10",
            revealed && isSelected && !isCorrect && "border-rose-400/40 bg-rose-500/10",
          )}
          type="button"
          onClick={() => onSelect(option.id)}
        >
          <span className="mr-3 text-slate-400">{option.label}</span>
          <span className="whitespace-normal">{option.text}</span>
        </button>
      );
    })}
  </div>
);
