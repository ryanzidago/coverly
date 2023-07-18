"use client";

import TextInput from "@/components/text_input";
import DateIntervalInput from "@/components/date_interval";
import TextAreaInput from "@/components/text_area_input";
import { ChangeEvent, Key, useEffect, useState } from "react";

export default function WorkExperienceForm({ updateFields }) {
  const defaultEntry = {
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [entries, setEntries] = useState([defaultEntry]);

  function isFirstWorkExp(index: number) {
    return index == 0;
  }

  function handleChange(key: string, value: string, index: number) {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = { ...prevEntries[index], [key]: value };
      return updatedEntries;
    });
  }

  useEffect(() => {
    updateFields({ workEntries: entries });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return entries.map((workExp, index) => (
    <div
      key={index}
      className="flex flex-col justify-center items-center gap-8 text-slate-700"
    >
      {isFirstWorkExp(index) && <h1 className="text-xl">Work Experience</h1>}
      <TextInput
        id="title"
        label="Title"
        onChange={(e) => handleChange("title", e.target.value, index)}
      />
      <TextInput
        id="companyName"
        label="Company name"
        onChange={(e) => handleChange("companyName", e.target.value, index)}
      />
      <TextInput
        id="location"
        label="Location"
        onChange={(e) => handleChange("location", e.target.value, index)}
      />
      <DateIntervalInput
        id="startDate"
        label="Start date"
        index={index}
        onChange={handleChange}
      />
      <DateIntervalInput
        id="endDate"
        label="End date"
        index={index}
        onChange={handleChange}
      />
      <TextAreaInput
        id="description"
        label="Description"
        onChange={(e) => handleChange("description", e.target.value, index)}
      />
      <button
        type="button"
        onClick={(e) => setEntries([...entries, defaultEntry])}
        className={"transition duration-200 hover:text-slate-500"}
      >
        Add work experience
      </button>
    </div>
  ));
}
