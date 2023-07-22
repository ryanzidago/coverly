"use client";

import TextInput from "@/components/text-input";
import DateInput from "@/components/date-input";
import TextAreaInput from "@/components/text-area-input";
import { useEffect, useState } from "react";
import URLInput from "../url-input";
import Toggle from "../toggle";

export default function Work({ updateFields }) {
  const [currentWork, setCurrentWork] = useState(false);

  const defaultEntry = {
    title: "",
    companyName: "",
    startDate: null,
    endDate: null,
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
      <div className="flex flex-row w-full gap-8">
        <TextInput
          id="companyName"
          label="Company name"
          onChange={(e) => handleChange("companyName", e.target.value, index)}
        />

        <URLInput
          label="Website"
          id="website"
          onChange={(e) => handleChange("website", e.target.value, index)}
        />
      </div>
      <TextInput
        id="location"
        label="Location"
        onChange={(e) => handleChange("location", e.target.value, index)}
      />
      <DateInput
        id="startDate"
        label="Start date"
        index={index}
        onChange={handleChange}
      />
      <Toggle
        label="Current position"
        checked={currentWork}
        onChange={() => setCurrentWork((currentWork) => !currentWork)}
      />

      <DateInput
        id="endDate"
        label="End date"
        className={`transition duration-200 ease-in-out ${
          currentWork ? "opacity-60" : "opacity-100"
        }`}
        index={index}
        disabled={currentWork}
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