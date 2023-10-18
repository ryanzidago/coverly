"use client";
import { useRouter } from "next/navigation";
import { allResumesForUserId, updateResume } from "../action";
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
                <button
                  type="button"
                  onClick={() => navigateToResume(resume)}
                  className="hover:shadow rounded p-2"
                >
                  {resume.title}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
