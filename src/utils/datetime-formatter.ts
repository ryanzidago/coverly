export function formattedDateTime(date: Date) {
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
}
