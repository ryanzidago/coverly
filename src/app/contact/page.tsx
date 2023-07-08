"use client";

import TextInput from "@/components/text_input";
import { useState } from "react";

export default function Contact() {
  const [contact, setContact] = useState({});

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const key = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [key]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(contact);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
        <h1 className="text-xl">Personal Information</h1>
        <TextInput id="first_name" label="First name" onChange={handleChange} />
        <TextInput id="last_name" label="Last name" onChange={handleChange} />
        <TextInput id="email" label="Email" onChange={handleChange} />
        <div className="flex w-full justify-end">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}