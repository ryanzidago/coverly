"use client";

import { useEffect, useRef, useState } from "react";
import {
  updateEducationEntry,
  updateEducationAchievement,
  deleteEducationAchievement,
  deleteEducationEntry,
} from "../action";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

const EMPTY_EDUCATION_ENTRY = {
  id: "empty_education_entry",
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

export default function EducationEntries({ resume }) {
  const [addEducationEntry, setAddEducationEntry] = useState(false);
  const educationEntries = resume.educationEntries;

  function toggleAddEducationEntryForm() {
    setAddEducationEntry((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <CheckboxedField>
          <div className="flex flex-row w-full justify-between">
            <h2 className="text-xl font-semibold">Education</h2>
            <div>
              <button type="button" onClick={toggleAddEducationEntryForm}>
                Add education
              </button>
            </div>
          </div>
        </CheckboxedField>
      </section>
      <div className="flex flex-col gap-8">
        {addEducationEntry && (
          <EducationEntry
            resume={resume}
            educationEntry={EMPTY_EDUCATION_ENTRY}
            showForm={true}
            toggleAddEducationEntryForm={toggleAddEducationEntryForm}
          />
        )}
        {educationEntries.map((educationEntry) => {
          return (
            <EducationEntry
              key={educationEntry.id}
              resume={resume}
              educationEntry={educationEntry}
              toggleAddEducationEntryForm={toggleAddEducationEntryForm}
            />
          );
        })}
      </div>
    </div>
  );
}

function EducationEntry({
  resume,
  educationEntry,
  showForm: defaultShowForm,
  toggleAddEducationEntryForm,
}) {
  const router = useRouter();
  const [addAchievement, setAddAchievement] = useState(false);
  const [showForm, setShowForm] = useState(defaultShowForm);

  function toggleAddAchievement() {
    setAddAchievement((prev) => !prev);
  }

  function removeEducationEntry(educationEntry) {
    deleteEducationEntry(educationEntry.id);
    router.refresh();
  }

  function hideFormAndEmptyEntry() {
    setShowForm(false);
    if (educationEntry.id === "empty_education_entry") {
      toggleAddEducationEntryForm();
    }
  }

  return (
    <div className="flex flex-col gap-4 shadow rounded p-4">
      {showForm ? (
        <Form
          resume={resume}
          educationEntry={educationEntry}
          onSubmit={hideFormAndEmptyEntry}
          onCancel={hideFormAndEmptyEntry}
        />
      ) : (
        <CheckboxedField>
          <div className="relative w-full flex flex-row justify-between">
            <Summary educationEntry={educationEntry} onClick={setShowForm} />
            <EducationEntryDropDown
              onEditEntry={setShowForm}
              onAddAchievement={toggleAddAchievement}
              onRemoveEducationEntry={() =>
                removeEducationEntry(educationEntry)
              }
            />
          </div>
        </CheckboxedField>
      )}

      {!showForm && (
        <div>
          {addAchievement && (
            <Achievement
              educationEntry={educationEntry}
              achievement={EMPTY_ACHIEVEMENT}
              onRemove={toggleAddAchievement}
            />
          )}
          {educationEntry.achievements.map((achievement) => (
            <Achievement
              key={achievement.id}
              educationEntry={educationEntry}
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

function Summary({ educationEntry, onClick }) {
  const { domain, type, startDate, organisation } = educationEntry;

  return (
    <div onClick={onClick}>
      {type} in {domain} at {organisation.name} in {startDate?.getFullYear()}
    </div>
  );
}

function Form({ resume, educationEntry, onCancel, onSubmit }) {
  const [currentEducation, setCurrentEducation] = useState(false);
  const router = useRouter();

  function toggleCurrentEducation() {
    setCurrentEducation((prev) => !prev);
  }

  function handleOnCancel() {
    onCancel();
  }

  function handleOnSubmit() {
    const formElement = document.getElementById(educationEntry.id);
    const formData = new FormData(formElement);
    updateEducationEntry(formData);
    router.refresh();
    onSubmit();
  }

  return (
    <form
      id={educationEntry.id}
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="hidden"
        name="educationEntryId"
        defaultValue={educationEntry.id}
      />
      <input type="hidden" name="resumeId" defaultValue={resume.id} />
      <CheckboxedField>
        <input
          className="rounded p-2"
          type="text"
          name="domain"
          placeholder="Study Area"
          defaultValue={educationEntry.domain}
        />
        <input
          className="rounded p-2"
          type="text"
          name="studyType"
          placeholder="Study Type"
          defaultValue={educationEntry.type}
        />
      </CheckboxedField>
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2"
          type="text"
          name="organisationName"
          placeholder="Organisation name"
          defaultValue={educationEntry.organisation.name}
        />
        <input
          className="rounded p-2"
          type="url"
          name="organisationWebsite"
          placeholder="Organisation website"
          defaultValue={educationEntry.organisation.website}
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <input
          type="checkbox"
          name="currentEducation"
          onClick={() => toggleCurrentEducation()}
        />
        <label htmlFor="currentEducation">Current education</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label>Start date</label>
        <select
          defaultValue={educationEntry.startDate?.getMonth() || ""}
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
          defaultValue={educationEntry.startDate?.getFullYear() || ""}
          placeholder="Start year"
        />
      </div>
      <div
        className={`flex flex-row gap-2 items-center ${
          currentEducation ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <label>End date</label>
        <select
          defaultValue={educationEntry.endDate?.getMonth() || ""}
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
          defaultValue={educationEntry.endDate?.getFullYear() || ""}
          placeholder="End year"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <input
            className="rounded p-2"
            type="checkbox"
            name="remote"
            defaultChecked={educationEntry.location.remote}
            id="remote"
          />
          <label htmlFor="remote">Remote</label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            className="rounded p-2"
            type="text"
            name="city"
            defaultValue={educationEntry.location.city}
            placeholder="City"
          />
          <input
            className="rounded p-2"
            type="text"
            name="country"
            defaultValue={educationEntry.location.country}
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
  educationEntry,
  achievement: { id, description },
  onRemove = () => {},
}) {
  const textAreaRef = useRef();
  const router = useRouter();

  function handleRemove() {
    if (id === "empty_achievement") {
      onRemove();
    } else {
      deleteEducationAchievement(id);
    }

    router.refresh();
  }

  useEffect(() => {
    autoResizeTextArea(textAreaRef);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formElement = document.getElementById(id);
    const formData = new FormData(formElement);
    updateEducationAchievement(formData);

    router.refresh();
  }
  return (
    <form id={id} onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="educationEntryId"
        defaultValue={educationEntry.id}
      />
      <input type="hidden" name="educationAchievementId" defaultValue={id} />
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

function EducationEntryDropDown({
  onAddAchievement,
  onRemoveEducationEntry,
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
                  onClick={onRemoveEducationEntry}
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
