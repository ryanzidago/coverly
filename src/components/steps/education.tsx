"use client";

import TextInput from "../text-input";
import DateInput from "../date-input";
import TextAreaInput from "../text-area-input";
import URLInput from "../url-input";
import Toggle from "../toggle";
import { useEffect, useState } from "react";
import LocationInput from "../location-input";
import { parseDescriptions } from "@/utils/process-form-data";

export default function Education({ updateFields }) {
  const [currentEducation, setCurrentEducation] = useState<number | null>(null);

  const defaultEntry = {
    degree: "",
    institutionName: "",
    startDate: null,
    endDate: null,
    description: "",
    location: { remote: false },
  };

  const [entries, setEntries] = useState([defaultEntry]);

  function isFirstEntry(index: number) {
    return index == 0;
  }

  function handleChange(key: string, value: string | string[], index: number) {
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
      <div className="flex flex-row w-full gap-8">
        <TextInput
          id="institutionName"
          label="Institution Name"
          onChange={(e) =>
            handleChange("institutionName", e.target.value, index)
          }
        />
        <URLInput
          label="Website"
          id="website"
          onChange={(e) => handleChange("website", e.target.value, index)}
        />
      </div>
      <LocationInput
        displayRemote={true}
        id="location"
        label="Location"
        index={index}
        onChange={handleChange}
      />
      <DateInput
        id="startDate"
        label="Start date"
        index={index}
        onChange={handleChange}
      />
      <Toggle
        label="Current education"
        checked={currentEducation === index}
        onChange={() =>
          setCurrentEducation((prev) => {
            return prev === index ? null : index;
          })
        }
      />
      <DateInput
        id="endDate"
        label="End date"
        className={`transition duration-200 ease-in-out ${
          currentEducation === index ? "opacity-60" : "opacity-100"
        }`}
        index={index}
        disabled={currentEducation === index}
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
        onChange={(e) => {
          const descriptions = parseDescriptions(e.target.value);
          handleChange("descriptions", descriptions, index);
        }}
      />
      <div className="flex flex-row justify-around w-full">
        <button
          type="button"
          onClick={(e) => setEntries([...entries, defaultEntry])}
          className="transition duration-200 hover:text-slate-500"
        >
          Add education
        </button>
        {entries.length >= 2 && (
          <button
            type="button"
            onClick={(e) => {
              const updatedEntries = [...entries];
              updatedEntries.splice(index, 1);
              setEntries(updatedEntries);
            }}
            className="transition duration-200 hover:text-slate-500"
          >
            Remove education
          </button>
        )}
      </div>
    </div>
  ));
}
