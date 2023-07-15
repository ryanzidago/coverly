"use client";

import TextInput from "@/components/text_input";
import { useState } from "react";

export default function ContactForm({ updateFields }) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
      <h1 className="text-xl">Personal Information</h1>
      <TextInput id="firstName" label="First name" onChange={updateFields} />
      <TextInput id="lastName" label="Last name" onChange={updateFields} />
      <TextInput id="email" label="Email" onChange={updateFields} />
    </div>
  );
}
