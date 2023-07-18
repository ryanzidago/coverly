"use client";

import TextInput from "@/components/text_input";

export default function ContactForm({ updateFields }) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
      <h1 className="text-xl">Personal Information</h1>
      <TextInput
        id="firstName"
        label="First name"
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <TextInput
        id="lastName"
        label="Last name"
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <TextInput
        id="email"
        label="Email"
        onChange={(e) => updateFields({ email: e.target.value })}
      />
    </div>
  );
}
