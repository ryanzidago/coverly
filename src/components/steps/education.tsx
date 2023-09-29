"use client";

import TextInput from "../text-input";
import DateInput from "../date-input";
import TextAreaInput from "../text-area-input";
import URLInput from "../url-input";
import Toggle from "../toggle";
import { useEffect, useState } from "react";
import LocationInput from "../location-input";
import { Education } from "@/types/education-type";
import { Location } from "@/types/location-type";
import { FormData } from "@/types/form-data-type";

type EducationProps = {
  updateFields: any;
  className: string;
  formData: FormData;
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
  currentEducation: false,
};

export default function Education({
  updateFields,
  formData: { educationEntries },
  className,
}: EducationProps) {
  const index = educationEntries.findIndex((entry) => entry.currentEducation);
  const [currentEducation, setCurrentEducation] = useState<number | null>(
    index === -1 ? null : index,
  );
  const [entries, setEntries] = useState(educationEntries);

  function isFirstEntry(index: number) {
    return index == 0;
  }

  function handleChange(
    key: string,
    value: string | boolean | Location,
    index: number,
  ) {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = { ...prevEntries[index], [key]: value };
      return updatedEntries;
    });
  }

  useEffect(() => {
    currentEducation !== null &&
      handleChange("currentEducation", true, currentEducation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEducation]);

  useEffect(() => {
    updateFields({ educationEntries: entries });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return (
    <div className="flex flex-col gap-24 snap-y snap-mandatory overflow-auto scrollbar-none h-screen">
      {entries.map((entry: Education, index: number) => (
        <div
          key={index}
          className={className + " snap-start p-8 m-8 drop-shadow-sm shadow-md"}
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
          <div className="flex flex-row w-full gap-4">
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
            onChange={(location: Location) => {
              handleChange("location", location, index);
            }}
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
            value={entry.endDate}
            className={`transition duration-200 ease-in-out ${
              currentEducation === index ? "opacity-60" : "opacity-100"
            }`}
            index={index}
            disabled={currentEducation === index}
            onChange={handleChange}
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
      ))}
    </div>
  );
  

}
