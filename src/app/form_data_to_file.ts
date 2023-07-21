"use server";

import fs from "fs";

export default async function FormDataToFile(formData) {
  const filePath = "resume.json";
  const jsonString = JSON.stringify(formData, null, 2);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log("JSON data written to file successfully.");
    }
  });
}
