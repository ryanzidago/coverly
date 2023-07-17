"use client";

import TextInput from "@/components/text_input";
import DateIntervalInput from "@/components/date_interval";
import TextAreaInput from "@/components/text_area_input";
import { ChangeEvent, Key, useEffect, useState } from "react";

export default function WorkExperienceForm({ updateFields }) {
  console.log(workExperiences);

  const defaultWorkExp = {
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [workExps, setWorkExps] = useState(defaultWorkExp);

  function isFirstWorkExp(index: number) {
    return index == 0;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const { name: key, value } = event.target;
    setWorkExps((prevWorkExps) => {
      const updatedWorkExps = [...prevWorkExps];
      updatedWorkExps[index] = { ...prevWorkExps[index], [key]: value };
      return updatedWorkExps;
    });
  }

  useEffect(() => {
    updateFields({ workExperiences: workExps });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workExps]);

  return workExps.map((workExps: any, index) => (
    <div
      key={index}
      className="flex flex-col justify-center items-center gap-8 text-slate-700"
    >
      {isFirstWorkExp(index) && <h1 className="text-xl">Work Experience</h1>}
      <TextInput
        id="title"
        label="Title"
        onChange={(e) => handleChange(e, index)}
      />
      <TextInput
        id="companyName"
        label="Company name"
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
        onClick={(e) => setWorkExps([...workExps, defaultWorkExp])}
        className={"transition duration-200 hover:text-slate-500"}
      >
        Add work experience
      </button>
    </div>
  ));
}
