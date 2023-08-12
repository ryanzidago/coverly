"use server";

import fs from "fs";

export default async function FormDataToFile(formData: FormData) {
  const filePath = `./src/data/db.json`;

  const jsonString = JSON.stringify(formData, null, 2);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    }
  });
}
