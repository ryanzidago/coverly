"use client";

import Contact from "@/components/steps/contact";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "./hooks/use-multi-step-form";
import Work from "@/components/steps/work";
import Education from "@/components/steps/education";
import FormDataToFile from "@/utils/form-data-to-file";

const DEFAULT_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  location: { city: "", country: "", remote: false },
  title: "",
  phoneNumber: { countryCode: "", number: "" },
  website: "",
  workEntries: [
    {
      title: "",
      companyName: "",
      website: "",
      location: { city: "", country: "", remote: false },
      startDate: "",
      endDate: "",
      descriptions: [""],
    },
  ],
  educationEntries: [
    {
      degree: "",
      institutionName: "",
      website: "",
      location: { city: "", country: "", remote: false },
      grade: "",
      startDate: "",
      endDate: "",
      descriptions: [""],
    },
  ],
};

export default function Layout() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function onSubmit(e: FormEvent) {
    console.log("FORM_DATA", formData);

    e.preventDefault();
    if (!isLastStep) return next();
    if (isLastStep) {
      FormDataToFile(formData);
    }
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Contact key="contact-form" {...formData} updateFields={updateFields} />,
      <Work
        key="work-experience-form"
        {...formData}
        updateFields={updateFields}
      />,
      <Education
        key="education-entries-form"
        {...formData}
        updateFields={updateFields}
      />,
    ]);

  return (
    <form
      className="flex flex-col gap-16 w-full max-w-xl text-slate-700"
      onSubmit={onSubmit}
    >
      <div>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div className="flex w-full justify-between text-slate-700">
        <button
          className={isFirstStep ? "invisible" : ""}
          type="button"
          onClick={back}
        >
          Back
        </button>
        <button className="" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
