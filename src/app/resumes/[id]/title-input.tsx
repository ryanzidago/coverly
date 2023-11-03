"use client";
import { useRouter } from "next/navigation";

import {
  createEmptyResume,
  deleteResume,
  duplicateResume,
  updateResume,
} from "../action";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function TitleInput({ resume, resumes }) {
  const router = useRouter();

  useEffect(() => {
    window.document.title = resume.title + " - Coverly";
  }, []);

  function handleOnChange() {
    const formElement = document.getElementById("resume-metadata-form");
    const formData = new FormData(formElement);
    updateResume(formData);
    router.refresh();
  }

  return (
    <form
      id="resume-metadata-form"
      action={updateResume}
      onChange={handleOnChange}
      className="relative flex flex-row gap-8 justify-between items-center"
    >
      <SelectResumeDropdown resumes={resumes} />
      <div />
      <input type="hidden" name="resumeId" value={resume.id} />
      <input
        type="text"
        defaultValue={resume.title}
        name="resumeTitle"
        className="text-xl font-semibold text-slate-700"
        placeholder="Resume title"
      />
      <div />
      <ResumeMenuDropDown resume={resume} resumes={resumes} />
    </form>
  );
}

function SelectResumeDropdown({ resumes }) {
  const router = useRouter();

  function navigateToResume(resume) {
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <div className="absolute left-0 bg-white z-10">
      <Menu>
        <Menu.Button>
          <Image
            src={"/chevron-down.svg"}
            width={20}
            height={20}
            alt="chevron double down"
            className=""
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className={
              "absolute left-0 flex flex-col rounded shadow bg-white w-56"
            }
          >
            {resumes.map((resume) => (
              <Menu.Item key={resume.id}>
                <Menu.Button
                  onClick={() => navigateToResume(resume)}
                  className="hover:shadow rounded p-2"
                >
                  {resume.title}
                </Menu.Button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function ResumeMenuDropDown({ resume, resumes }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleDelete(selectedResume) {
    const newSelectedResume = resumes.filter(
      (resume) => resume.id !== selectedResume.id,
    )[0];

    router.push(`/resumes/${newSelectedResume.id}`);
    deleteResume(selectedResume);
  }

  function handleCreateStarterResume() {
    createEmptyResume(session?.user.id).then((resume) =>
      router.push(`/resumes/${resume.id}`),
    );
  }

  function handleDuplicateResume() {
    duplicateResume(resume);
  }

  return (
    <div className="bg-white z-10 absolute right-0">
      <Menu>
        <Menu.Button>Menu</Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className={
              "absolute right-0 flex flex-col rounded shadow bg-white w-56"
            }
          >
            <Menu.Item>
              <Menu.Button
                onClick={() => window.print()}
                className="hover:shadow rounded p-2"
              >
                Download as PDF
              </Menu.Button>
            </Menu.Item>
            <Menu.Item>
              <Menu.Button
                onClick={handleCreateStarterResume}
                className="hover:shadow rounded p-2"
              >
                Create resume
              </Menu.Button>
            </Menu.Item>
            <Menu.Item>
              <Menu.Button
                onClick={handleDuplicateResume}
                className="hover:shadow rounded p-2"
              >
                Duplicate
              </Menu.Button>
            </Menu.Item>
            <Menu.Item>
              {({}) => (
                <Menu.Button
                  onClick={() => handleDelete(resume)}
                  className="hover:shadow rounded p-2"
                >
                  Delete
                </Menu.Button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}