"use client";

import Template1 from "./template1";

const FORM_DATA = require("@/data/resume.json");

export default function Page() {
  return <Template1 formData={FORM_DATA} />;
}
