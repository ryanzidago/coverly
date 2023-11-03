"use client";

import { LegacyRef, Ref, useEffect, useRef, useState } from "react";
import {
  updateEducationEntry,
  updateEducationAchievement,
  deleteEducationAchievement,
  deleteEducationEntry,
  updateDisplayEducationEntry,
  updateDisplayEducationAchievement,
  createEmptyEducationAchievement,
} from "../action";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

import { EducationAchievement, EducationEntry, Resume } from "@/app/types";

const EMPTY_EDUCATION_ENTRY = {
  id: "empty_education_entry",
  position: "",
  organisation: { name: "", website: "" },
  startDate: null,
  endDate: null,
  location: { city: "", country: "", remote: false },
  achievements: [],
  displayed: true,
};

type EducationEntriesProps = {
  resume: Resume;
};

export default function EducationEntries({ resume }: EducationEntriesProps) {
  const [addEducationEntry, setAddEducationEntry] = useState(false);
  const educationEntries = resume.educationEntries;

  function toggleAddEducationEntryForm() {
    setAddEducationEntry((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex flex-row w-full justify-between">
          <h2 className="text-xl font-semibold">Education</h2>
          <div>
            <button type="button" onClick={toggleAddEducationEntryForm}>
              Add education
            </button>
          </div>
        </div>
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
        {educationEntries &&
          educationEntries.map((educationEntry) => {
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
  showForm: defaultShowForm = false,
  toggleAddEducationEntryForm,
}: any) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(defaultShowForm);

  function handleAddAchievement() {
    createEmptyEducationAchievement(educationEntry.id);
    router.refresh();
  }

  function removeEducationEntry(educationEntry: EducationEntry) {
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
    <div
      className={`flex flex-col gap-4 shadow rounded p-4 ${
        educationEntry.displayed ? "" : "opacity-50"
      }`}
    >
      {showForm ? (
        <Form
          resume={resume}
          educationEntry={educationEntry}
          onSubmit={hideFormAndEmptyEntry}
          onCancel={hideFormAndEmptyEntry}
        />
      ) : (
        <CheckboxedField entry={educationEntry}>
          <div className="relative w-full flex flex-row justify-between">
            <Summary educationEntry={educationEntry} onClick={setShowForm} />
            <EducationEntryDropDown
              onEditEntry={setShowForm}
              onAddAchievement={handleAddAchievement}
              onRemoveEducationEntry={() =>
                removeEducationEntry(educationEntry)
              }
            />
          </div>
        </CheckboxedField>
      )}

      {!showForm && (
        <div>
          {educationEntry.achievements.map(
            (achievement: EducationAchievement) => (
              <Achievement
                key={achievement.id}
                educationEntry={educationEntry}
                achievement={achievement}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function CheckboxedField({ children, entry }: any) {
  const router = useRouter();

  function handleUpdateDisplayEducationEntry(
    entry: EducationEntry,
    displayed: boolean,
  ) {
    updateDisplayEducationEntry(entry, displayed);
    router.refresh();
  }
  return (
    <div className="flex flex-row gap-2">
      <input
        type="checkbox"
        defaultChecked={entry.displayed}
        onChange={(e) =>
          handleUpdateDisplayEducationEntry(entry, e.target.checked)
        }
      />
      {children}
    </div>
  );
}

function Summary({ educationEntry, onClick }: any) {
  const { domain, type, startDate, organisation } = educationEntry;

  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
      {type} in {domain} at {organisation.name} in {startDate?.getFullYear()}
    </div>
  );
}

function Form({ resume, educationEntry, onCancel, onSubmit }: any) {
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
    const formData = new FormData(formElement as HTMLFormElement);
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
      <input
        className="rounded p-2 hover:shadow-inner"
        type="text"
        name="domain"
        placeholder="Study Area"
        defaultValue={educationEntry.domain}
      />
      <input
        className="rounded p-2  hover:shadow-inner"
        type="text"
        name="studyType"
        placeholder="Study Type"
        defaultValue={educationEntry.type}
      />
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2 hover:shadow-inner"
          type="text"
          name="organisationName"
          placeholder="Organisation name"
          defaultValue={educationEntry.organisation.name}
        />
        <input
          className="rounded p-2 hover:shadow-inner"
          type="url"
          name="organisationWebsite"
          placeholder="Organisation website"
          defaultValue={educationEntry.organisation.website}
        />
      </div>
      <div className="flex flex-row gap-2 items-center hover:shadow hover:cursor-pointer w-fit rounded p-2">
        <input
          type="checkbox"
          id="currentEducation"
          name="currentEducation"
          className="hover:cursor-pointer"
          onClick={() => toggleCurrentEducation()}
        />
        <label htmlFor="currentEducation" className="hover:cursor-pointer">
          Current education
        </label>
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
          className="rounded p-2 hover:shadow-inner"
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
          className="rounded p-2  hover:shadow-inner"
          type="number"
          name="endYear"
          defaultValue={educationEntry.endDate?.getFullYear() || ""}
          placeholder="End year"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 hover:shadow hover:cursor-pointer w-fit rounded p-2">
          <input
            className="rounded p-2 hover:cursor-pointer"
            type="checkbox"
            name="remote"
            defaultChecked={educationEntry.location.remote}
            id="remote"
          />
          <label htmlFor="remote" className="hover:cursor-pointer">
            Remote
          </label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            className="rounded p-2 hover:shadow-inner"
            type="text"
            name="city"
            defaultValue={educationEntry.location.city}
            placeholder="City"
          />
          <input
            className="rounded p-2 hover:shadow-inner"
            type="text"
            name="country"
            defaultValue={educationEntry.location.country}
            placeholder="Country"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          type="button"
          className="hover:shadow p-2 rounded"
          onClick={handleOnCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="hover:shadow p-2 rounded"
          onClick={handleOnSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function Achievement({
  educationEntry,
  achievement,
}: {
  educationEntry: EducationEntry;
  achievement: EducationAchievement;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { id, description, displayed } = achievement;

  function handleRemove() {
    deleteEducationAchievement(id);
    router.refresh();
  }

  useEffect(() => {
    autoResizeTextArea(textAreaRef);
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formElement = document.getElementById(id);
    const formData = new FormData(formElement as HTMLFormElement);
    updateEducationAchievement(formData);
    router.refresh();
  }

  function handleUpdateDisplayEducationAchievement(
    achievement: EducationAchievement,
    displayed: boolean,
  ) {
    updateDisplayEducationAchievement(achievement, displayed);
    router.refresh();
  }

  function handleEducationAchievementChange(e: any) {
    const value = e.target.value;
    value ? handleSubmit(e) : handleRemove();
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`ml-10 py-2 ${displayed ? "" : "opacity-50"}`}
    >
      <input
        type="hidden"
        name="educationEntryId"
        defaultValue={educationEntry.id}
      />
      <input type="hidden" name="educationAchievementId" defaultValue={id} />
      <label htmlFor={id} className="flex flex-row items-start gap-2 w-full">
        <input
          type="checkbox"
          className="mt-1"
          name="displayed"
          value={`${displayed}` || ""}
          defaultChecked={displayed}
          onChange={(e) =>
            handleUpdateDisplayEducationAchievement(
              achievement,
              e.target.checked,
            )
          }
        />
        <textarea
          ref={textAreaRef}
          defaultValue={description || ""}
          name="description"
          className="w-full rounded"
          placeholder="Tell us about what you've achieved!"
          onChange={handleEducationAchievementChange}
        />
      </label>
    </form>
  );
}

function EducationEntryDropDown({
  onAddAchievement,
  onRemoveEducationEntry,
  onEditEntry,
}: any) {
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
          <Menu.Items
            className={
              "flex flex-col p-2 rounded shadow bg-white absolute right-12 top-6"
            }
          >
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

function autoResizeTextArea(textAreaRef: any) {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }
}
