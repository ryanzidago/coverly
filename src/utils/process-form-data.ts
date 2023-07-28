export function parseDescriptions(descriptions: string) {
  return descriptions.split("\n").filter((str) => str.trim() !== "");
}
