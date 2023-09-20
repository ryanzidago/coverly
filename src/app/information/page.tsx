"use client";

import { useState } from "react";
import Input from "./components/input";

const SECTIONS = [
  {
    id: "personal",
    label: "Personal",
    bg_color: "bg-sky-500",
    text_color: "text-sky-900",
    steps: [
      {
        id: "full-name",
        sectionId: "personal",
        label: "Before we start, can we get your full name?",
        description: "This is how recruiters/employers will identify you.",
        placeholder: "My full name",
        required: true,
        inputType: "text",
        value: "",
        valid: null,
      },
      {
        id: "email-address",
        sectionId: "personal",
        label: "What's your email address?",
        description: "In case a recruiter / company wants to reach out.",
        required: true,
        inputType: "email",
        value: "",
        valid: null,
        placeholder: "My email address",
      },
      {
        id: "phone-number",
        sectionId: "personal",
        label: "Nice, now we need your phone number",
        description: "In case a recruiter / company wants to reach out.",
        placeholder: "+49 123 456 78909",
        required: false,
        inputType: "tel",
        value: "",
        valid: null,
      },
      {
        id: "location",
        sectionId: "personal",
        label: "Where do you live?",
        description:
          "Feel free to add your address, as this might be relevant for onsite jobs",
        placeholder: "Berlinerstraße 1, 50980 Leipzig, Germany",
        required: false,
        inputType: "text",
        value: "",
        valid: null,
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    bg_color: "bg-yellow-500",
    text_color: "text-yellow-900",
    steps: [
      {
        id: "company-name",
        sectionId: "work",
        label: "Where did you work?",
        required: true,
      },
      {
        id: "company-website",
        sectionId: "work",
        label: "Where can this organisation be found online?",
      },
      {
        id: "title",
        sectionId: "work",
        label: "What was your position there?",
        required: true,
      },
      {
        id: "start-date",
        sectionId: "work",
        label: "When did you start to work there?",
      },
      {
        id: "end-date",
        sectionId: "work",
        label: "Are you still working there?",
      },
      {
        id: "description",
        sectionId: "work",
        label: "What did you do there? Give us as many details as possible!",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    bg_color: "bg-pink-500",
    text_color: "text-yellow-900",
    steps: [
      {
        id: "education-organisation-name",
        sectionId: "education",
        label: "Where did you study?",
        required: true,
      },
      {
        id: "education-organisation-study",
        sectionId: "education",
        label: "What did you study?",
        required: true,
      },
      {
        id: "education-organisation-website",
        sectionId: "education",
        label: "What's the website of the place you studied?",
        required: true,
      },
      {
        id: "education-start-date",
        sectionId: "education",
        label: "When did you start to work there?",
      },
      {
        id: "education-end-date",
        sectionId: "education",
        label: "Are you still working there?",
      },
      {
        id: "description",
        sectionId: "education",
        label: "What did you do there? Give us as many details as possible!",
      },
    ],
  },
];

export default function Page() {
  const [sections, setSections] = useState(SECTIONS);

  return (
    <div
      id="container"
      className="scrollbar-none flex flex-row h-screen w-screen snap-x snap-mandatory overflow-auto"
    >
      {sections.map((section, sectionIndex) => (
        <div
          className={
            "scrollbar-none flex w-screen shrink-0 snap-y snap-mandatory snap-start flex-col overflow-auto items-center " +
            section.bg_color
          }
          id={`section-${sectionIndex}`}
          key={`section-${sectionIndex}`}
        >
          {section.label}
          <form id="form">
            {section.steps.map((step, stepIndex) => (
              <div
                className="flex flex-col h-screen w-full shrink-0 snap-start items-center justify-center"
                key={`section-${sectionIndex}-step-${stepIndex}`}
              >
                <Input
                  id={step.id}
                  inputType={step.inputType}
                  label={step.label}
                  required={step.required}
                  value={step.value}
                  placeholder={step.placeholder}
                  onChange={(e) => {
                    updateStepInSection(section.id, step.id, {
                      value: e.target.value,
                      valid: e.target.value !== "",
                    });
                  }}
                  onKeyDown={(e) => {
                    // handle moving backward (i.e. tab + shiftkey)
                    if (e.key === "Tab" && e.shiftKey) {
                      e.preventDefault();
                      scrollIntoPrevStep(sectionIndex, stepIndex);

                      // handle moving forward (i.e key and tab)
                    } else if (
                      e.key === "Enter" ||
                      (e.key === "Tab" && !e.shiftKey)
                    ) {
                      e.preventDefault();
                      if (!step.valid) {
                        updateStepInSection(section.id, step.id, {
                          valid: false,
                        });
                        return;
                      }

                      scrollIntoNextStep(sectionIndex, stepIndex);
                    }
                  }}
                />

                <div
                  className={
                    (step.valid === false ? "" : "opacity-0 ") +
                    "ease-in-out duration-200 relative self-start text-pink-700 mt-4 0 rounded-md p-1"
                  }
                >
                  <p>* Please, fill out this field</p>
                </div>
              </div>
            ))}
          </form>
        </div>
      ))}
    </div>
  );

  function updateStepInSection(sectionId, stepId, fields) {
    setSections((prevSections) => {
      return prevSections.map((prevSection) => {
        if (prevSection.id === sectionId) {
          const updatedSteps = prevSection.steps.map((prevStep) => {
            if (prevStep.id === stepId) {
              return { ...prevStep, ...fields };
            } else {
              return prevStep;
            }
          });
          return { ...prevSection, steps: updatedSteps };
        } else {
          return prevSection;
        }
      });
    });
  }

  function scrollIntoNextStep(sectionIndex, stepIndex) {
    const currentSection = sections[sectionIndex];

    if (stepIndex < currentSection.steps.length - 1) {
      stepIndex += 1;
    } else if (sectionIndex < sections.length - 1) {
      sectionIndex += 1;
      stepIndex = 0;
    }

    const nextSection = sections[sectionIndex];
    const nextStep = nextSection.steps[stepIndex];

    const target = document.getElementById(nextStep.id);

    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.focus({ preventScroll: true });
  }

  // scrolls into the previous step
  // if is no previous step for the current section;
  // scrolls into the last step of the previous section;
  function scrollIntoPrevStep(sectionIndex, stepIndex) {
    if (stepIndex > 0) {
      stepIndex -= 1;
    } else if (sectionIndex > 0) {
      sectionIndex -= 1;
      const prevSection = sections[sectionIndex];
      stepIndex = prevSection.steps.length - 1;
    }

    const prevSection = sections[sectionIndex];
    const prevStep = prevSection.steps[stepIndex];

    const target = document.getElementById(prevStep.id);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.focus({ preventScroll: true });
  }
}
