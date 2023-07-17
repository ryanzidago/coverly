"use client";

import TextInput from "../text_input";
import DateIntervalInput from "../date_interval";
import TextAreaInput from "../text_area_input";
import { useEffect, useState } from "react";

export default function EducationEntries({ updateFields }) {
  const defaultEntry = {
    degree: "",
    institutionName: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [entries, setEntries] = useState([defaultEntry]);

  function isFirstEntry(index: number) {
    return index == 0;
  }

  function handleChange(event, index: number) {
    const { name: key, value } = event.target;
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = { ...prevEntries[index], [key]: value };
      return updatedEntries;
    });
  }

  useEffect(() => {
    updateFields({ educationEntries: entries });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return entries.map((entry, index) => (
    <div
      key={index}
      className="flex flex-col justify-center items-center gap-8 text-slate-700"
    >
      {isFirstEntry(index) && <h1 className="text-xl">Education</h1>}
      <TextInput
        id="degree"
        label="Degree"
        onChange={(e) => handleChange(e, index)}
      />
      <TextInput
        id="institutionName"
        label="Institution Name"
        onChange={(e) => handleChange(e, index)}
      />
      <TextInput
        id="location"
        label="Location"
        onChange={(e) => handleChange(e, index)}
      />
      <DateIntervalInput
        id="startDate"
        label="Start date"
        onChange={(e) => handleChange(e, index)}
      />
      <DateIntervalInput
        id="endDate"
        label="End date"
        onChange={(e) => handleChange(e, index)}
      />
      <TextAreaInput
        id="description"
        label="Description"
        onChange={(e) => handleChange(e, index)}
      />
      <button
        type="button"
        onClick={(e) => setEntries([...entries, defaultEntry])}
        className="transition duration-200 hover:text-slate-500"
      >
        Add education
      </button>
    </div>
  ));
}
