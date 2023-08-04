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
      currentWork: false,
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
    <div className="flex flex-row flex-wrap gap-16">
      <div className="">Sidebar</div>
      <form className="gap-4 flex flex-col text-slate-700 " onSubmit={onSubmit}>
        <div>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="flex justify-between text-slate-700">
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
      <div className="">
        <Template1 formData={formData} />
      </div>
    </div>
  );
}
