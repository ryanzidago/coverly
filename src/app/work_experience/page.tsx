"use client";

import TextInput from "@/components/text_input";
import Button from "@/components/button";
import DateIntervalInput from "@/components/date_interval";
import TextAreaInput from "@/components/text_area_input";
import { useState } from "react";

export default function WorkExperience() {
  const [workExperience, setWorkExperience] = useState({});

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const key = event.target.name;
    const value = event.target.value;
    setWorkExperience({ ...workExperience, [key]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(workExperience);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col justify-center items-center gap-8 text-slate-700">
        <h1 className="text-xl">Work Experience</h1>
        <TextInput id="title" label="Title" onChange={handleChange} />
        <TextInput
          id="company_name"
          label="Company name"
          onChange={handleChange}
        />
        <TextInput id="location" label="Location" onChange={handleChange} />
        <DateIntervalInput
          id="start_date"
          label="Start date"
          onChange={handleChange}
        />
        <DateIntervalInput
          id="end_date"
          label="End date"
          onChange={handleChange}
        />
        <TextAreaInput
          id="description"
          label="Description"
          onChange={handleChange}
        />
        <button className="transition duration-200 hover:text-slate-500">
          Add work experience
        </button>
        <div className="flex w-full justify-between">
          <Button href="/contact">{"<"} Previous</Button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
