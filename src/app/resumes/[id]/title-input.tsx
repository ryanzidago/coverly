"use client";
import { useRouter } from "next/navigation";
import {
  allResumesForUserId,
  createEmptyResume,
  deleteResume,
  updateResume,
} from "../action";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

export default function TitleInput({ resume, resumes }) {
  const router = useRouter();

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
      className="relative flex flex-row gap-8 justify-start items-center"
    >
      <div className="mb-4">
        <SelectResumeDropdown resumes={resumes} />
      </div>
      <h1 className="flex flex-row gap-2 items-center justify-center text-slate-600">
        <input type="hidden" name="resumeId" value={resume.id} />
        <input
          type="text"
          defaultValue={resume.title}
          name="resumeTitle"
          className="text-xl font-bold appearance-none rounded-md p-1 w-full"
          placeholder="Resume title"
        />
        <button type="submit" />
      </h1>
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
    <div className="absolute w-56">
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
            className={"absolute left-0 flex flex-col rounded shadow bg-white"}
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
  const router = useRouter();

  function handleDelete(selectedResume) {
    const newSelectedResume = resumes.filter(
      (resume) => resume.id !== selectedResume.id,
    )[0];

    router.push(`/resumes/${newSelectedResume.id}`);
    deleteResume(selectedResume);
  }

  function handleCreateStarterResume() {
    createEmptyResume();
  }

  return (
    <div className="bg-sky-300 flex flex-col gap-2">
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
            className={"flex flex-col gap-2 justify-center items-center"}
          >
            <Menu.Item>
              <Menu.Button
                onClick={handleCreateStarterResume}
                className="hover:shadow rounded p-2"
              >
                Create resume
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