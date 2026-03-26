import { Chip } from "@heroui/react";
import { cn } from "@/lib/utils";

export const StatPill = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) => (
  <Chip
    classNames={{
      base: cn("border border-white/10 bg-white/5 text-white", className),
      content: "font-medium tracking-wide",
    }}
    radius="full"
    variant="flat"
  >
    {label} {value}
  </Chip>
);
