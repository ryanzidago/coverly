// https://stackoverflow.com/a/34015511/11012584

import { DateSimple } from "@/types/date-simple-type";

type DateOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "short" | "long";
  separator?: string;
};

const DEFAULT_OPTIONS: DateOptions = {
  year: "numeric",
  month: "short",
  separator: "-",
};

export function formatDate(
  dateSimple: DateSimple,
  options: DateOptions = {},
): string | null {
  if (dateSimple.year && dateSimple.month) {
    const year = parseInt(dateSimple.year);
    const month = parseInt(dateSimple.month);
    const mergedOptions: DateOptions = { ...DEFAULT_OPTIONS, ...options };

    return new Date(year, month).toLocaleDateString("en-US", mergedOptions);
  }

  return null;
}
