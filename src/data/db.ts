"use server";

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Adapter, Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { FormData } from "@/types/form-data-type";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const adapter: Adapter<Data> = new JSONFile(file);
const defaultData = { resumes: [] };

type Data = {
  resumes: FormData[];
};

const db = new Low<Data>(adapter, defaultData);

export async function allResumes() {
  await db.read();
  return db.data.resumes;
}

export async function getResume(id: number) {
  await db.read();
  console.log(
    "ID",
    id,
    "FINDING_RESUME",
    db.data.resumes.find((existingResume) => existingResume.id === id),
  );

  return db.data.resumes.find((existingResume) => existingResume.id === id);
}

export async function insertResume(resume: FormData) {
  await db.read();

  const updatedResume = { ...resume, id: db.data.resumes.length + 1 };
  db.data.resumes.push(updatedResume);
  await db.write();
  return updatedResume;
}

export async function updateResume(resume: FormData) {
  await db.read();

  const updatedResumes = db.data.resumes.map((existingResume) => {
    if (existingResume.id === resume.id) {
      return resume;
    } else {
      return existingResume;
    }
  });

  db.data.resumes = updatedResumes;
  await db.write();
  return resume;
}
