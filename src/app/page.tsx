"use client";

import Contact from "@/components/steps/contact";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "./hooks/use-multi-step-form";
import Work from "@/components/steps/work";
import Education from "@/components/steps/education";
import FormDataToFile from "@/utils/form-data-to-file";
import { processFormData } from "@/utils/process-form-data";
import { Location } from "@/types/location-type";
import { PhoneNumber } from "@/types/phone-number-type";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
  title: string;
  phoneNumber: PhoneNumber;
  website: string;
};

type WorkExperienceFormData = {
  title: string;
  companyName: string;
  website: string;
  location: Location;
  startDate: Date;
  endDate: Date;
  description: string;
};

type EducationFormData = {
  degree: string;
  institutionName: string;
  website: string;
  location: Location;
  grade: string;
  startDate: Date;
  endDate: Date;
  description: string;
};

type FormData = ContactFormData & {
  workEntries: WorkExperienceFormData[];
  educationEntries: EducationFormData[];
};

export default function Layout() {
  const [formData, setFormData] = useState({});

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    if (isLastStep) {
      console.log("FORM_DATA", formData);
      
      const processedFormData = processFormData(formData);
      FormDataToFile(processedFormData);
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
    <form className="w-full max-w-xl text-slate-700" onSubmit={onSubmit}>
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
