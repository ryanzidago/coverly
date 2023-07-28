import { FormData } from "@/types/form-data-type";

export function processFormData(formData: FormData) {
  return {
    ...formData,
    workEntries: formData.workEntries.map((entry) => ({
      ...entry,
      descriptions: parseDescriptions(entry.descriptions),
    })),
    educationEntries: formData.educationEntries.map((entry) => ({
      ...entry,
      descriptions: parseDescriptions(entry.descriptions),
    })),
  };
}

export function parseDescriptions(descriptions: string) {
  return descriptions.split("\n").filter((str) => str.trim() !== "");
}
