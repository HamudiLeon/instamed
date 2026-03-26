import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
