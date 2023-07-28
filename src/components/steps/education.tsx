"use client";

import TextInput from "../text-input";
import DateInput from "../date-input";
import TextAreaInput from "../text-area-input";
import URLInput from "../url-input";
import Toggle from "../toggle";
import { useEffect, useState } from "react";
import LocationInput from "../location-input";
import { Education } from "@/types/education";

type EducationProps = {
  updateFields: any;
  educationEntries: Education[];
};

const EMPTY_ENTRY: Education = {
  area: "",
  studyType: "",
  institutionName: "",
  startDate: { year: "", month: "" },
  endDate: { year: "", month: "" },
  descriptions: "",
  website: "",
  grade: "",
  location: {
    city: "",
    country: "",
    number: "",
    street: "",
    postalCode: "",
    remote: false,
  },
};

export default function Education({
  updateFields,
  educationEntries,
}: EducationProps) {
  const [currentEducation, setCurrentEducation] = useState<number | null>(null);
  const [entries, setEntries] = useState(educationEntries);

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

  return entries.map((entry: Education, index: number) => (
    <div
      key={index}
      className="flex flex-col justify-center items-center gap-8 text-slate-700"
    >
      {isFirstEntry(index) && <h1 className="text-xl">Education</h1>}
      <TextInput
        id="area"
        label="Area"
        value={entry.area}
        onChange={(e) => handleChange("area", e.target.value, index)}
      />
      <TextInput
        id="studyType"
        label="Study type"
        value={entry.studyType}
        onChange={(e) => handleChange("studyType", e.target.value, index)}
      />
      <div className="flex flex-row w-full gap-8">
        <TextInput
          id="institutionName"
          label="Institution Name"
          value={entry.institutionName}
          onChange={(e) =>
            handleChange("institutionName", e.target.value, index)
          }
        />
        <URLInput
          label="Website"
          id="website"
          value={entry.website}
          onChange={(e) => handleChange("website", e.target.value, index)}
        />
      </div>
      <LocationInput
        displayRemote={true}
        id="location"
        label="Location"
        index={index}
        value={entry.location}
        onChange={handleChange}
      />
      <DateInput
        id="startDate"
        label="Start date"
        index={index}
        value={entry.startDate}
        onChange={handleChange}
      />
      <Toggle
        label="Current education"
        value={currentEducation === index}
        onChange={() =>
          setCurrentEducation((prev) => {
            return prev === index ? null : index;
          })
        }
      />
      <DateInput
        id="endDate"
        label="End date"
        value={entry.endDate}
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
        value={entry.grade}
        onChange={(e) => handleChange("grade", e.target.value, index)}
      />
      <TextAreaInput
        id="description"
        label="Description"
        value={entry.descriptions}
        onChange={(e) => {
          handleChange("descriptions", e.target.value, index);
        }}
      />
      <div className="flex flex-row justify-around w-full">
        <button
          type="button"
          onClick={(e) => setEntries([...entries, EMPTY_ENTRY])}
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
