import type { ComponentProps } from "react";
import { Input, Textarea } from "@heroui/react";

export const FormInput = ({
  label,
  errorMessage,
  ...props
}: ComponentProps<typeof Input>) => (
  <Input
    classNames={{
      inputWrapper: "border border-white/10 bg-white/5",
      label: "text-slate-400",
      input: "text-white",
    }}
    errorMessage={errorMessage}
    label={label}
    {...props}
  />
);

export const FormTextarea = ({
  label,
  errorMessage,
  ...props
}: ComponentProps<typeof Textarea>) => (
  <Textarea
    classNames={{
      inputWrapper: "border border-white/10 bg-white/5",
      label: "text-slate-400",
      input: "text-white",
    }}
    errorMessage={errorMessage}
    label={label}
    {...props}
  />
);
