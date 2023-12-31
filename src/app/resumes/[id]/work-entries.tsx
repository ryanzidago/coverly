"use client";

import { useEffect, useRef, useState } from "react";
import {
  updateWorkEntry,
  updateWorkAchievement,
  deleteWorkAchievement,
  deleteWorkEntry,
  updateDisplayWorkEntry,
  updateDisplayWorkAchievement,
  createEmptyWorkAchievement,
} from "../action";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { Resume, WorkAchievement, WorkEntry } from "@/app/types";

const EMPTY_WORK_ENTRY = {
  id: "empty_work_entry",
  position: "",
  organisation: { name: "", website: "" },
  startDate: null,
  endDate: null,
  location: { city: "", country: "", remote: false },
  achievements: [],
  displayed: true,
};

type WorkEntriesProps = {
  resume: Resume;
};

export default function WorkEntries({ resume }: WorkEntriesProps) {
  const [addWorkEntry, setAddWorkEntry] = useState(false);
  const workEntries = resume.workEntries;

  function toggleAddWorkEntryForm() {
    setAddWorkEntry((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex flex-row w-full justify-between">
          <h2 className="text-xl font-semibold">Work</h2>
          <div>
            <button type="button" onClick={toggleAddWorkEntryForm}>
              Add work
            </button>
          </div>
        </div>
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
        {workEntries?.map((workEntry: WorkEntry) => {
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
  showForm: defaultShowForm = false,
  toggleAddWorkEntryForm,
}: any) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(defaultShowForm);

  function handleAddAchievement() {
    createEmptyWorkAchievement(workEntry.id);
    router.refresh();
  }

  function removeWorkEntry(workEntry: WorkEntry) {
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
    <div
      className={`flex flex-col gap-4 shadow rounded p-4 ${
        workEntry.displayed ? "" : "opacity-50"
      }`}
    >
      {showForm ? (
        <Form
          resume={resume}
          workEntry={workEntry}
          onSubmit={hideFormAndEmptyEntry}
          onCancel={hideFormAndEmptyEntry}
        />
      ) : (
        <CheckboxedField entry={workEntry}>
          <div className={`relative w-full flex flex-row justify-between `}>
            <Summary workEntry={workEntry} onClick={setShowForm} />
            <WorkEntryDropDown
              onEditEntry={setShowForm}
              onAddAchievement={handleAddAchievement}
              onRemoveWorkEntry={() => removeWorkEntry(workEntry)}
            />
          </div>
        </CheckboxedField>
      )}

      {!showForm && (
        <div>
          {workEntry.achievements.map((achievement: WorkAchievement) => (
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

function CheckboxedField({ children, entry }: any) {
  const router = useRouter();

  function handleUpdateDisplayWorkEntry(entry: WorkEntry, displayed: boolean) {
    updateDisplayWorkEntry(entry, displayed);
    router.refresh();
  }

  return (
    <div className="flex flex-row gap-2">
      <input
        type="checkbox"
        name="displayEntry"
        defaultChecked={entry.displayed}
        onChange={(value) => {
          handleUpdateDisplayWorkEntry(entry, value.target.checked);
        }}
      />
      {children}
    </div>
  );
}

function Summary({ workEntry, onClick }: any) {
  const { position, startDate, organisation } = workEntry;

  return (
    <div className="hover:cursor-pointer" onClick={onClick}>
      {position} at {organisation.name} in {startDate?.getFullYear()}
    </div>
  );
}

function Form({ resume, workEntry, onCancel, onSubmit }: any) {
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
    const formData = new FormData(formElement as HTMLFormElement);
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
      <input
        className="rounded p-2 hover:shadow-inner"
        type="text"
        name="position"
        placeholder="Position"
        defaultValue={workEntry.position}
      />
      <div className="flex flex-row gap-2">
        <input
          className="rounded p-2 hover:shadow-inner"
          type="text"
          name="organisationName"
          placeholder="Organisation name"
          defaultValue={workEntry.organisation.name}
        />
        <input
          className="rounded p-2 hover:shadow-inner"
          type="url"
          name="organisationWebsite"
          placeholder="Organisation website"
          defaultValue={workEntry.organisation.website}
        />
      </div>
      <div className="flex flex-row gap-2 items-center hover:shadow hover:cursor-pointer w-fit p-2 rounded">
        <input
          type="checkbox"
          id="currentWork"
          name="currentWork"
          className="hover:cursor-pointer"
          onClick={() => toggleCurrentWork()}
        />
        <label htmlFor="currentWork" className="hover:cursor-pointer">
          Current work
        </label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label>Start date</label>
        <select
          defaultValue={workEntry.startDate?.getMonth() || ""}
          name="startMonth"
          className="bg-white rounded p-2 hover:cursor-pointer hover:shadow"
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
          className="bg-white rounded p-2 hover:cursor-pointer hover:shadow"
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
          name="endYear"
          defaultValue={workEntry.endDate?.getFullYear() || ""}
          placeholder="End year"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 hover:cursor-pointer hover:shadow rounded w-fit p-2">
          <input
            className="rounded p-2 hover:cursor-pointer"
            type="checkbox"
            name="remote"
            defaultChecked={workEntry.location.remote}
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
            defaultValue={workEntry.location.city}
            placeholder="City"
          />
          <input
            className="rounded p-2 hover:shadow-inner"
            type="text"
            name="country"
            defaultValue={workEntry.location.country}
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

function Achievement({ workEntry, achievement }: any) {
  const textAreaRef = useRef(null);
  const router = useRouter();

  const { id, description, displayed } = achievement;

  function handleRemove() {
    deleteWorkAchievement(id);
    router.refresh();
  }

  useEffect(() => {
    autoResizeTextArea(textAreaRef);
  }, []);

  function handleSubmit() {
    const formElement = document.getElementById(id);
    const formData = new FormData(formElement as HTMLFormElement);
    updateWorkAchievement(formData);
    router.refresh();
  }

  function handleUpdateDisplayWorkAchievement(
    achievement: WorkAchievement,
    displayed: boolean,
  ) {
    updateDisplayWorkAchievement(achievement, displayed);
    router.refresh();
  }

  function handleWorkAchievementChange(e: any) {
    const value = e.target.value;
    value ? handleSubmit() : handleRemove();
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`ml-10 py-2 ${displayed ? "" : "opacity-50"}`}
    >
      <input type="hidden" name="workEntryId" defaultValue={workEntry.id} />
      <input type="hidden" name="workAchievementId" defaultValue={id} />
      <label htmlFor={id} className="flex flex-row items-start gap-2 w-full">
        <input
          type="checkbox"
          className="mt-1"
          name="displayed"
          defaultChecked={displayed}
          onChange={(e) =>
            handleUpdateDisplayWorkAchievement(achievement, e.target.checked)
          }
        />
        <textarea
          ref={textAreaRef}
          defaultValue={description}
          name="description"
          className="w-full rounded"
          placeholder="Tell us about what you've achieved!"
          onChange={handleWorkAchievementChange}
        />
      </label>
    </form>
  );
}

function WorkEntryDropDown({
  onAddAchievement,
  onRemoveWorkEntry,
  onEditEntry,
}: any) {
  return (
    <Menu as={"div"} className={"absolute right-0"}>
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
                onClick={onRemoveWorkEntry}
              >
                Remove
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function autoResizeTextArea(textAreaRef: any) {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }
}