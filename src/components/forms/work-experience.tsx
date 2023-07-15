"use client";

import TextInput from "@/components/text_input";
import DateIntervalInput from "@/components/date_interval";
import TextAreaInput from "@/components/text_area_input";

export default function WorkExperienceForm({ updateFields }) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 text-slate-700">
      <h1 className="text-xl">Work Experience</h1>
      <TextInput id="title" label="Title" onChange={updateFields} />
      <TextInput
        id="companyName"
        label="Company name"
        onChange={updateFields}
      />
      <TextInput id="location" label="Location" onChange={updateFields} />
      <DateIntervalInput
        id="startDate"
        label="Start date"
        onChange={updateFields}
      />
      <DateIntervalInput
        id="endDate"
        label="End date"
        onChange={updateFields}
      />
      <TextAreaInput
        id="description"
        label="Description"
        onChange={updateFields}
      />
      <button className="transition duration-200 hover:text-slate-500">
        Add work experience
      </button>
    </div>
  );
}
