"use client";

import TextInput from "@/components/text-input";
import DateInput from "@/components/date-input";
import TextAreaInput from "@/components/text-area-input";
import { useEffect, useState } from "react";
import URLInput from "../url-input";
import Toggle from "../toggle";
import LocationInput from "../location-input";
import { Location } from "@/types/location-type";
import { Work } from "@/types/work-type";
import { FormData } from "@/types/form-data-type";

type WorkProps = {
  updateFields: any;
  className: string;
  formData: FormData;
};

const EMPTY_ENTRY = {
  title: "",
  companyName: "",
  website: "",
  location: {
    city: "",
    country: "",
    number: "",
    street: "",
    postalCode: "",
    remote: false,
  },
  startDate: { year: "", month: "" },
  endDate: { year: "", month: "" },
  descriptions: "",
  currentWork: false,
};

export default function Work({
  updateFields,
  formData: { workEntries },
  className,
}: WorkProps) {
  const index = workEntries.findIndex((entry) => entry.currentWork);

  const [currentWork, setCurrentWork] = useState<number | null>(
    index == -1 ? null : index,
  );
  const [entries, setEntries] = useState(workEntries);

  function isFirstWorkExp(index: number) {
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
    currentWork !== null && handleChange("currentWork", true, currentWork);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWork]);

  useEffect(() => {
    updateFields({ workEntries: entries });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return (
    <div className="flex flex-col gap-24 snap-y snap-mandatory overflow-auto scrollbar-none h-screen">
      {entries.map((workExp: Work, index: number) => (
        <div
          key={index}
          className={className + " snap-start p-8 m-8 drop-shadow-sm shadow-md"}
        >
          {isFirstWorkExp(index) && (
            <h1 className="text-xl">Work Experience</h1>
          )}

          <TextInput
            id="title"
            label="Title"
            value={workExp.title}
            onChange={(e) => handleChange("title", e.target.value, index)}
          />
          <div className="flex flex-row w-full gap-4">
            <TextInput
              id="companyName"
              label="Company name"
              value={workExp.companyName}
              onChange={(e) =>
                handleChange("companyName", e.target.value, index)
              }
            />

            <URLInput
              label="Website"
              id="website"
              value={workExp.website}
              onChange={(e) => handleChange("website", e.target.value, index)}
            />
          </div>
          <LocationInput
            displayRemote={true}
            id="location"
            label="Location"
            index={index}
            value={workExp.location}
            onChange={(location: Location) => {
              handleChange("location", location, index);
            }}
          />
          <DateInput
            id="startDate"
            label="Start date"
            index={index}
            value={workExp.startDate}
            onChange={handleChange}
          />
          <Toggle
            label="Current position"
            checked={currentWork === index}
            onChange={() => {
              setCurrentWork((prev) => {
                return prev === index ? null : index;
              });
            }}
          />

          <DateInput
            id="endDate"
            label="End date"
            className={`transition duration-200 ease-in-out ${
              currentWork === index ? "opacity-60" : "opacity-100"
            }`}
            index={index}
            value={workExp.endDate}
            disabled={currentWork === index}
            onChange={handleChange}
          />

          <TextAreaInput
            id="description"
            label="Description"
            value={workExp.descriptions}
            onChange={(e) => {
              handleChange("descriptions", e.target.value, index);
            }}
          />
          <div className="flex flex-row justify-around w-full">
            <button
              type="button"
              onClick={(e) =>
                setEntries((prevEntries) => [...prevEntries, EMPTY_ENTRY])
              }
              className="transition duration-200 hover:text-slate-500"
            >
              Add work experience
            </button>
            {entries.length >= 2 && (
              <button
                type="button"
                onClick={(e) => {
                  setEntries((prevEntries) => {
                    const updatedEntries = [...prevEntries];
                    updatedEntries.splice(index, 1);
                    return updatedEntries;
                  });
                }}
                className="transition duration-200 hover:text-slate-500"
              >
                Remove work experience
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  

}
