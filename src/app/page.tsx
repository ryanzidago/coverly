"use client";

import Contact from "@/components/steps/contact";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "./hooks/use-multi-step-form";
import Work from "@/components/steps/work";
import Education from "@/components/steps/education";
import FormDataToFile from "@/utils/form-data-to-file";
import { FormData } from "@/types/form-data-type";
import Template1 from "./resumes/template1/template1";

const DEFAULT_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  location: {
    city: "",
    country: "",
    postalCode: "",
    street: "",
    number: "",
    remote: false,
  },
  label: "",
  phoneNumber: { countryCode: "", number: "" },
  website: "",
  workEntries: [
    {
      title: "",
      companyName: "",
      website: "",
      location: {
        city: "",
        country: "",
        postalCode: "",
        street: "",
        number: "",
        remote: false,
      },
      startDate: {
        month: "",
        year: "",
      },
      endDate: {
        month: "",
        year: "",
      },
      descriptions: "",
    },
  ],
  educationEntries: [
    {
      area: "",
      studyType: "",
      institutionName: "",
      website: "",
      location: {
        city: "",
        country: "",
        postalCode: "",
        street: "",
        number: "",
        remote: false,
      },
      grade: "",
      startDate: {
        month: "",
        year: "",
      },
      endDate: {
        month: "",
        year: "",
      },
      descriptions: "",
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

  const stepClassName =
    "flex flex-col justify-center items-center gap-4 w-[32rem] text-slate-700";

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Contact
        key="contact-form"
        {...formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
      <Work
        key="work-experience-form"
        {...formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
      <Education
        key="education-entries-form"
        {...formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
    ]);

  return (
    <div className="flex flex-row  gap-16 h-screen">
      <div className="basis-2/12 w-full">Sidebar</div>
      <form
        className="basis-3/12 gap-16 flex flex-col w-full text-slate-700 "
        onSubmit={onSubmit}
      >
        <div>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="flex w-full h-full justify-between text-slate-700">
          <button
            className={isFirstStep ? "invisible" : "self-end"}
            type="button"
            onClick={back}
          >
            Back
          </button>
          <button className="self-end" type="submit">
            Next
          </button>
        </div>
      </form>
      <div className="basis-4/12 w-full">
        <Template1 formData={formData} />
      </div>
    </div>
  );
}
