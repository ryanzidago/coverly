"use client";

import { processFormData } from "@/utils/process-form-data";
import Template1 from "./template1";

const RESUME = require("@/data/resume.json");

export default function Page() {
  const resume = processFormData(RESUME);

  return <Template1 resume={resume} />;
}
