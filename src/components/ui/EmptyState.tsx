import { Button } from "@heroui/react";

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-white/5 px-6 text-center">
    <p className="text-xl font-semibold text-white">{title}</p>
    <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>
    {actionLabel && onAction ? (
      <Button className="mt-5 bg-white text-black" onPress={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
);
