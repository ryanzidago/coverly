"use client";

import Template1 from "./template1";

const FORM_DATA = require("@/data/db.json");

console.log(FORM_DATA);

export default function Page() {
  return <Template1 formData={FORM_DATA.resumes[0]} />;
}
