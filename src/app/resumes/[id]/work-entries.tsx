"use client";

import { useEffect, useRef, useState } from "react";
import {
  updateWorkEntry,
  updateWorkAchievement,
  deleteWorkAchievement,
  deleteWorkEntry,
} from "../action";
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
                Add work
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

function WorkEntry({
  resume,
  workEntry,
  showForm: defaultShowForm,
  toggleAddWorkEntryForm,
}) {
  const router = useRouter();
  const [addAchievement, setAddAchievement] = useState(false);
  const [showForm, setShowForm] = useState(defaultShowForm);

  function toggleAddAchievement() {
    setAddAchievement((prev) => !prev);
  }

  function removeWorkEntry(workEntry) {
    deleteWorkEntry(workEntry.id);
    router.refresh();
  }

  function hideFormAndEmptyEntry() {
    setShowForm(false);
    if (workEntry.id === "empty_work_entry") {
      toggleAddWorkEntryForm();
    }
  }

  return (
    <div className="flex flex-col gap-4 shadow rounded p-4">
      {showForm ? (
        <Form
          resume={resume}
          workEntry={workEntry}
          onSubmit={hideFormAndEmptyEntry}
          onCancel={hideFormAndEmptyEntry}
        />
      ) : (
        <CheckboxedField>
          <div className="relative w-full flex flex-row justify-between">
            <Summary workEntry={workEntry} onClick={setShowForm} />
            <WorkEntryDropDown
              onEditEntry={setShowForm}
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
  const [currentWork, setCurrentWork] = useState(false);

  function toggleCurrentWork() {
    setCurrentWork((prev) => !prev);
  }

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
      <div className="flex flex-row gap-2 items-center">
        <input
          type="checkbox"
          name="currentWork"
          onClick={() => toggleCurrentWork()}
        />
        <label htmlFor="currentWork">Current work</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label>Start date</label>
        <select
          defaultValue={workEntry.startDate?.getMonth() || ""}
          name="startMonth"
          className="bg-white shadow rounded p-2"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <input
          className="rounded p-2"
          type="number"
          name="startYear"
          defaultValue={workEntry.startDate?.getFullYear() || ""}
          placeholder="Start year"
        />
      </div>
      <div
        className={`flex flex-row gap-2 items-center ${
          currentWork ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <label>End date</label>
        <select
          defaultValue={workEntry.endDate?.getMonth() || ""}
          name="endMonth"
          className="bg-white shadow rounded p-2"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <input
          className="rounded p-2"
          type="number"
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

function WorkEntryDropDown({
  onAddAchievement,
  onRemoveWorkEntry,
  onEditEntry,
}) {
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
              <button
                type="button"
                className="hover:shadow p-2 rounded w-full"
                onClick={onEditEntry}
              >
                Edit
              </button>
            </Menu.Item>
            <Menu.Item>
              {({}) => (
                <button
                  type="button"
                  className="hover:shadow p-2 rounded w-full"
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
                  className="hover:shadow p-2 rounded w-full"
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