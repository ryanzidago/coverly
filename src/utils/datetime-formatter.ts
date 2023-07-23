// https://stackoverflow.com/a/34015511/11012584

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

export function formatDate(date: string, options: DateOptions = {}): string {
  const mergedOptions: DateOptions = { ...DEFAULT_OPTIONS, ...options };
  return new Date(date).toLocaleDateString("en-US", mergedOptions);
}
