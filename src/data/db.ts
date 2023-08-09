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

console.log("LOWDB", __dirname, file, adapter, defaultData);

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
  return db.data.resumes[id];
}

export async function insertResume(resume: FormData) {
  await db.read();
  db.data.resumes.push(resume);
  await db.write();
  return getResume(resume.id);
}
