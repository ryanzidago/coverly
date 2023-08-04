"use client";

import Contact from "@/components/steps/contact";
import { FormEvent, useEffect, useState } from "react";
import { useMultistepForm } from "./hooks/use-multi-step-form";
import Work from "@/components/steps/work";
import Education from "@/components/steps/education";
import FormDataToFile from "@/utils/form-data-to-file";
import { FormData } from "@/types/form-data-type";
import Template1 from "./resumes/template1/template1";
import jsPDF from "jspdf";
import Image from "next/image";

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
      currentEducation: false,
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
    localStorage.setItem("coverlyFormData", JSON.stringify(formData));

    e.preventDefault();
    if (!isLastStep) return next();
    if (isLastStep) {
      FormDataToFile(formData);
    }
  }

  useEffect(() => {
    const localStorageData = localStorage.getItem("coverlyFormData");

    if (localStorageData) {
      const localStorageFormData = JSON.parse(localStorageData);
      setFormData({ ...formData, ...localStorageFormData });
    }
  }, []);

  const stepClassName =
    "flex flex-col justify-center items-center gap-4 w-[32rem] text-slate-700";

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <Contact
        key="contact-form"
        formData={formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
      <Work
        key="work-experience-form"
        formData={formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
      <Education
        key="education-entries-form"
        formData={formData}
        updateFields={updateFields}
        className={stepClassName}
      />,
    ]);

  function saveAsPDF() {
    const doc = new jsPDF("p", "pt", "a4", true);
    const template = document.getElementById("template1");
    const filename = `resume-${formData.firstName}-${formData.lastName}`;

    if (template) {
      doc.html(template, {
        callback: (doc) => doc.save(filename),
        x: 50,
        y: 0,
        margin: 0,
        width: 70,
        windowWidth: 100,
      });
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-16">
      <div className="">
        <button
          type="button"
          className="group border border-slate-200 rounded-md p-2 drop-shadow-sm hover:scale-125 duration-200 "
          onClick={saveAsPDF}
        >
          <Image
            src="/arrow-down-on-tray.svg"
            alt="download logo"
            className="stroke-slate-900 drop-shadow-md hover:scale-125 group-hover:scale-125 duration-300"
            width={20}
            height={20}
            priority
          />
        </button>
      </div>
      <form
        className="print:hidden gap-4 flex flex-col text-slate-700 "
        onSubmit={onSubmit}
      >
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
      <div className="sticky top-0 z-20">
        <Template1 formData={formData} />
      </div>
    </div>
  );
}
