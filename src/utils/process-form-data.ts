export function processFormData(formData) {
  const processedFormData = {
    workEntries: formData.workEntries.map((entry) => ({
      ...entry,
      description: entry.description
        .split("\n")
        .filter((str) => str.trim() !== ""),
    })),
    educationEntries: formData.educationEntries.map((entry) => ({
      ...entry,
      description: entry.description
        .split("\n")
        .filter((str) => str.trim() !== ""),
    })),
  };

  return processedFormData;
}
