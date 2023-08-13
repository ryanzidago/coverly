"use client";

import Contact from "@/components/steps/contact";
import { FormEvent, useEffect, useState } from "react";
import { useMultistepForm } from "./hooks/use-multi-step-form";
import Work from "@/components/steps/work";
import Education from "@/components/steps/education";
import { FormData } from "@/types/form-data-type";
import Template1 from "./resumes/template1/template1";
import jsPDF from "jspdf";
import {
  allResumes,
  deleteResume,
  getResume,
  insertResume,
  updateResume,
} from "@/data/db";
import ResumeMetadata from "@/components/steps/resume-metadata";

const DEFAULT_FORM_DATA: FormData = {
  id: 0,
  metadata: {
    title: "My New Resume",
    description: "",
  },
  contactEntry: {
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
  },
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
  const [resumes, setResumes] = useState([] as FormData[]);
  const [selectedResumeId, setSelectedResumeId] = useState(
    DEFAULT_FORM_DATA.id,
  );

  const selectedResume = resumes.find(
    (resume) => resume.id === selectedResumeId,
  );

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    updateResume(formData);
    allResumes().then((resumes: FormData[]) => {
      setResumes(resumes);
    });

    if (!isLastStep) return next();
  }

  function handleSelectedResume(event: any) {
    const id = parseInt(event.target.value);
    getResume(id).then((resume: FormData | void) => {
      if (resume) {
        setFormData(resume);
        setSelectedResumeId(resume.id);
      } else {
        throw `Resume with id ${id} not found`;
      }
    });

    selectedResume && setFormData(selectedResume);
  }

  function handleCreateResume() {
    insertResume(DEFAULT_FORM_DATA).then((resume: FormData) => {
      console.log("RESUME CREATED", resume);

      setFormData(resume);
      setSelectedResumeId(resume.id);
      allResumes().then((resumes: FormData[]) => {
        setResumes(resumes);
      });
    });
  }

  function handleDuplicateResume() {
    if (selectedResume) {
      insertResume(formData).then((resume: FormData) => {
        setFormData(resume);
        setSelectedResumeId(resume.id);
        allResumes().then((resumes: FormData[]) => {
          setResumes(resumes);
        });
      });
    }
  }

  function handleDeleteResume() {
    if (selectedResume) {
      deleteResume(selectedResume).then((resume: FormData) => {
        allResumes().then((resumes: FormData[]) => {
          setSelectedResumeId(resumes[0].id);
          setFormData(resumes[0]);
          setResumes(resumes);
        });
      });
    }
  }

  useEffect(() => {
    allResumes().then((resumes: FormData[]) => {
      setResumes(resumes);
      setSelectedResumeId(resumes[0].id);
    });
  }, []);

  useEffect(() => {
    selectedResume && setFormData(selectedResume);
  }, [selectedResume, resumes]);

  const stepClassName =
    "flex flex-col justify-center items-center gap-4 w-[32rem] text-slate-700";

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm([
    <ResumeMetadata
      key="resume-metadata-form"
      formData={formData}
      updateFields={updateFields}
      className={stepClassName}
    />,
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
    const filename = `resume-${formData.contactEntry.firstName}-${formData.contactEntry.lastName}`;

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
        <div className="flex flex-col gap-4 sticky top-10 z-20">
          <button
            type="button"
            className="group shadow rounded-md p-2 drop-shadow-sm hover:scale-110 duration-200 hover:text-sky-400"
            onClick={saveAsPDF}
          >
            Download Resume
          </button>
          <button
            type="button"
            className="shadow px-10 py-2 cursor-pointer hover:scale-110 duration-200 rounded-md hover:text-sky-400"
            onClick={handleCreateResume}
          >
            Create Resume
          </button>
          <button
            type="button"
            className="shadow px-10 py-2 cursor-pointer hover:scale-110 duration-200 rounded-md hover:text-sky-400"
            onClick={handleDuplicateResume}
          >
            Duplicate Resume
          </button>
          <button
            type="button"
            className="shadow px-10 py-2 cursor-pointer hover:scale-110 duration-200 rounded-md hover:text-sky-400"
            onClick={handleDeleteResume}
          >
            Delete Resume
          </button>
          <nav className="mt-12">
            <select
              value={selectedResumeId || undefined}
              className="appearance-none bg-white shadow rounded-md px-10 py-2 mt-10 mb-4 hover:scale-110 duration-200 cursor-pointer w-full text-center"
              onChange={handleSelectedResume}
            >
              {!selectedResumeId && <option>Select Resume</option>}
              {resumes.map((resume, index) => (
                <option key={index} value={resume.id}>
                  {resume.metadata.title}
                </option>
              ))}
            </select>
            <ul className="flex flex-col gap-4">
              {["Metadata", "Contact", "Work", "Education"].map(
                (section, index) => (
                  <li key={`nav-section-${index}`}>
                    <button
                      type="button"
                      className={
                        "shadow rounded-md px-10 py-2 w-full " +
                        "hover:scale-110 duration-200 rounded-md hover:text-sky-400 " +
                        `${currentStepIndex === index ? "text-sky-400" : ""}`
                      }
                      onClick={() => goTo(index)}
                    >
                      {section}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
      <form
        className="print:hidden gap-4 flex flex-col text-slate-700"
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
      <div className="">
        <Template1 formData={formData} />
      </div>
    </div>
  );
}