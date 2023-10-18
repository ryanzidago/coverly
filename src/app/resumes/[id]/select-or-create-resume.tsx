"use client";

import { useRouter } from "next/navigation";
import { createEmptyResume } from "../action";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function SelectOrCreateResume({ resumes }) {
  const router = useRouter();

  function handleCreateStarterResume() {
    createEmptyResume();
    router.refresh();
  }

  function navigateToResume(resume) {
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <button
        type="button"
        onClick={handleCreateStarterResume}
        className="shadow rounded p-2 w-60"
      >
        Create a new resume
      </button>
      <select>
        {resumes.map((resume) => (
          <option key={resume.id} onClick={() => navigateToResume(resume)}>
            {resume.title}
          </option>
        ))}
      </select>
    </div>
  );
}
