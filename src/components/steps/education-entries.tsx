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

  function handleChange(key: string, value: string, index: number) {
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
        id="area"
        label="Area"
        onChange={(e) => handleChange("degree", e.target.value, index)}
      />
      <TextInput
        id="studyType"
        label="Degree / Study type"
        onChange={(e) => handleChange("studyType", e.target.value, index)}
      />
      <TextInput
        id="institutionName"
        label="Institution Name"
        onChange={(e) => handleChange("institutionName", e.target.value, index)}
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
      <TextInput
        id="grade"
        label="Grade"
        onChange={(e) => handleChange("grade", e.target.value, index)}
      />
      <TextAreaInput
        id="description"
        label="Description"
        onChange={(e) => handleChange("description", e.target.value, index)}
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
