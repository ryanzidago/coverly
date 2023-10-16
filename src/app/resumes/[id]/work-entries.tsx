"use client";

import { useEffect, useRef, useState } from "react";
import {
  updateWorkEntry,
  updateWorkAchievement,
  deleteWorkAchievement,
  deleteWorkEntry,
} from "./action";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

const EMPTY_WORK_ENTRY = {
  id: "empty_work_entry",
  position: "",
  organisation: { name: "", website: "" },
  startDate: null,
  endDate: null,
  location: { city: "", country: "", remote: false },
  achievements: [],
};

const EMPTY_ACHIEVEMENT = {
  id: "empty_achievement",
  description: "",
};

export default function WorkEntries({ resume }) {
  const [addWorkEntry, setAddWorkEntry] = useState(false);
  const workEntries = resume.workEntries;

  function toggleAddWorkEntryForm() {
    setAddWorkEntry((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <CheckboxedField>
          <div className="flex flex-row w-full justify-between">
            <h2 className="text-xl font-semibold">Work</h2>
            <div>
              <button type="button" onClick={toggleAddWorkEntryForm}>
                Add a work experience
              </button>
            </div>
          </div>
        </CheckboxedField>
      </section>
      <div className="flex flex-col gap-8">
        {addWorkEntry && (
          <WorkEntry
            resume={resume}
            workEntry={EMPTY_WORK_ENTRY}
            showForm={true}
            toggleAddWorkEntryForm={toggleAddWorkEntryForm}
          />
        )}
        {workEntries.map((workEntry) => {
          return (
            <WorkEntry
              key={workEntry.id}
              resume={resume}
              workEntry={workEntry}
              toggleAddWorkEntryForm={toggleAddWorkEntryForm}
            />
          );
        })}
      </div>
    </div>
  );
}

function WorkEntry({ resume, workEntry, showForm, toggleAddWorkEntryForm }) {
  const router = useRouter();
  const [addAchievement, setAddAchievement] = useState(false);

  function toggleAddAchievement() {
    setAddAchievement((prev) => !prev);
  }

  function removeWorkEntry(workEntry) {
    deleteWorkEntry(workEntry.id);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 shadow rounded p-4">
      {showForm ? (
        <Form
          resume={resume}
          workEntry={workEntry}
          onCancel={toggleAddWorkEntryForm}
          onSubmit={toggleAddWorkEntryForm}
        />
      ) : (
        <CheckboxedField>
          <div className="relative w-full flex flex-row justify-between">
            <Summary workEntry={workEntry} onClick={toggleAddWorkEntryForm} />
            <WorkEntryDropDown
              onAddAchievement={toggleAddAchievement}
              onRemoveWorkEntry={() => removeWorkEntry(workEntry)}
            />
          </div>
        </CheckboxedField>
      )}

      {!showForm && (
        <div>
          {addAchievement && (
            <Achievement
              workEntry={workEntry}
              achievement={EMPTY_ACHIEVEMENT}
              onRemove={toggleAddAchievement}
            />
          )}
          {workEntry.achievements.map((achievement) => (
            <Achievement
              key={achievement.id}
              workEntry={workEntry}
              achievement={achievement}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CheckboxedField({ children }) {
  return (
    <div className="flex flex-row gap-2">
      <input type="checkbox" defaultChecked={true} />
      {children}
    </div>
  );
}

function Summary({ workEntry, onClick }) {
  const { position, startDate, organisation } = workEntry;

  return (
    <div onClick={onClick}>
      {position} at {organisation.name} in {startDate?.getFullYear()}
    </div>
  );
}

function Form({ resume, workEntry, onCancel, onSubmit }) {
  const router = useRouter();

  function handleOnCancel() {
    onCancel();
  }

  function handleOnSubmit() {
    const formElement = document.getElementById(workEntry.id);
    const formData = new FormData(formElement);
    updateWorkEntry(formData);
    router.refresh();
    onSubmit();
  }

  return (
    <form
      id={workEntry.id}
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="workEntryId" defaultValue={workEntry.id} />
      <input type="hidden" name="resumeId" defaultValue={resume.id} />
      <CheckboxedField>
        <input
          className="rounded p-2"
          type="text"
          name="position"
          placeholder="Position"
          defaultValue={workEntry.position}
        />
      </CheckboxedField>
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2"
          type="text"
          name="organisationName"
          placeholder="Organisation name"
          defaultValue={workEntry.organisation.name}
        />
        <input
          className="rounded p-2"
          type="url"
          name="organisationWebsite"
          placeholder="Organisation website"
          defaultValue={workEntry.organisation.website}
        />
      </div>
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2"
          type="text"
          name="startMonth"
          defaultValue={workEntry.startDate?.getMonth() || ""}
          placeholder="Start month"
        />
        <input
          className="rounded p-2"
          type="text"
          name="startYear"
          defaultValue={workEntry.startDate?.getFullYear() || ""}
          placeholder="Start year"
        />
      </div>
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2"
          type="text"
          name="endMonth"
          defaultValue={workEntry.endDate?.getMonth() || ""}
          placeholder="End month"
        />
        <input
          className="rounded p-2"
          type="text"
          name="endYear"
          defaultValue={workEntry.endDate?.getFullYear() || ""}
          placeholder="End year"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <input
            className="rounded p-2"
            type="checkbox"
            name="remote"
            defaultChecked={workEntry.location.remote}
            id="remote"
          />
          <label htmlFor="remote">Remote</label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            className="rounded p-2"
            type="text"
            name="city"
            defaultValue={workEntry.location.city}
            placeholder="City"
          />
          <input
            className="rounded p-2"
            type="text"
            name="country"
            defaultValue={workEntry.location.country}
            placeholder="Country"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button type="button" onClick={handleOnCancel}>
          Cancel
        </button>
        <button type="submit" onClick={handleOnSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

function Achievement({
  workEntry,
  achievement: { id, description },
  onRemove = () => {},
}) {
  const textAreaRef = useRef();
  const router = useRouter();

  function handleRemove() {
    if (id === "empty_achievement") {
      onRemove();
    } else {
      deleteWorkAchievement(id);
    }

    router.refresh();
  }

  useEffect(() => {
    autoResizeTextArea(textAreaRef);
  }, []);

  function handleSubmit() {
    const formElement = document.getElementById(id);
    const formData = new FormData(formElement);
    updateWorkAchievement(formData);
    router.refresh();
  }
  return (
    <form id={id} onSubmit={handleSubmit}>
      <input type="hidden" name="workEntryId" defaultValue={workEntry.id} />
      <input type="hidden" name="workAchievementId" defaultValue={id} />
      <label htmlFor={id}>
        <textarea
          ref={textAreaRef}
          defaultValue={description}
          name="description"
          className="w-full p-2 rounded"
          placeholder="Tell us about what you've achieved!"
        />
      </label>
      <div className="flex flex-row justify-between">
        <button type="button" onClick={handleRemove}>
          Remove
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

function WorkEntryDropDown({ onAddAchievement, onRemoveWorkEntry }) {
  return (
    <div className="absolute right-0">
      <Menu>
        <Menu.Button className={"absolute right-0"}>Menu</Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className={"flex flex-col p-2 rounded shadow bg-white"}>
            <Menu.Item>
              {({}) => (
                <button
                  type="button"
                  className="hover:bg-sky-300 p-2 rounded w-full"
                  onClick={onAddAchievement}
                >
                  Add achievement
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({}) => (
                <button
                  type="button"
                  className="hover:bg-sky-300 p-2 rounded w-full"
                  onClick={onRemoveWorkEntry}
                >
                  Remove
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function autoResizeTextArea(textAreaRef) {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }
}