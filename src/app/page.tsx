"use client";

import ContactForm from "@/components/forms/contact";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "./hooks/use_multi_step_form";
import WorkExperienceForm from "@/components/forms/work-experience";
import EducationEntries from "@/components/forms/education-entries";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type WorkExperienceFormData = {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
};

type EducationFormData = {
  degree: string;
  institutionName: string;
  startDate: string;
  endDate: string;
  description: string;
};

type FormData = ContactFormData & {
  workEntries: WorkExperienceFormData[];
  educationEntries: EducationFormData[];
};

// const INITIAL_DATA: FormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   workExperiences: [
//     {
//       title: "",
//       companyName: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     },
//   ],

// };

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
      console.log(formData);
    }
    alert("Successful Account Creation");
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ContactForm
        key="contact-form"
        {...formData}
        updateFields={updateFields}
      />,
      <WorkExperienceForm
        key="work-experience-form"
        {...formData}
        updateFields={updateFields}
      />,
      <EducationEntries
        key="education-entries-form"
        {...formData}
        updateFields={updateFields}
      />,
    ]);

  return (
    <form className="w-full max-w-xl" onSubmit={onSubmit}>
      <div>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div className="flex w-full justify-between">
        <button
          className={isFirstStep ? "invisible" : ""}
          type="button"
          onClick={back}
        >
          Back
        </button>

        <button type="submit">Next</button>
      </div>
    </form>
  );
}
