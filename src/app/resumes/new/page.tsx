"use client";

import { useEffect, useRef, useState } from "react";
import { StrictMode } from "react";
import Template1 from "../template1/template1";
import Image from "next/image";

import { getResume, updateWorkEntry } from "@/app/actions";
import { v4 as uuidv4 } from "uuid";

const EMPTY_WORK_ENTRY = {
  id: uuidv4(),
  position: "",
  contractType: "",
  organisation: {
    name: "",
    website: "",
  },
  location: {
    city: "",
    country: "",
    remote: true,
  },
  startDate: undefined,
  endDate: undefined,
  achievements: [],
  current: true,
};

const EMPTY_EDUCATION_ENTRY = {
  id: uuidv4(),
  area: "",
  studyType: "",
  organisation: {
    name: "",
    website: "",
  },
  website: "",
  location: {
    city: "",
    country: "",
    remote: false,
  },
  grade: "",
  startDate: undefined,
  endDate: undefined,
  achievements: [],
  current: false,
};

export default function Page() {
  const [resume, setResume] = useState(undefined);

  // setting the UI state based on the database state
  useEffect(() => {
    getResume().then((resume) => {
      console.log("got resume:", resume);

      setResume(resume);
    });
  }, []);

  useEffect(() => {
    console.log("Resume has changed!", resume);
  }, [resume]);

  return (
    resume && (
      <div className="flex flex-col xl:flex-row items-center justify-center text-slate-700 text-justify">
        <section className=" xl:w-1/2 lg:w-full min-w-content overflow-auto h-screen print:hidden">
          <div className="flex flex-col gap-8 px-32 py-12">
            <h1 className="text-xl font-bold text-slate-600">
              <input
                type="text"
                value={resume.title}
                onChange={(e) =>
                  setResume((prev) => ({ ...prev, title: e.target.value }))
                }
                className="appearance-none  rounded-md p-1"
              />
            </h1>
            <Contact resume={resume} />
            <WorkEntries resume={resume} onResumeChange={setResume} />
            <EducationEntries resume={resume} />
          </div>
        </section>
        <div className="h-screen xl:w-1/2 w-full">
          <Template1 resume={resume} />
        </div>
      </div>
    )
  );
}

function Section({ children, title, className, onAdd }) {
  const [checked, setChecked] = useState(true);

  function toggleChecked() {
    setChecked((prev) => !prev);
  }

  return (
    <section
      className={`flex flex-col gap-4 ${
        checked ? "" : "opacity-50"
      } ${className}`}
    >
      <hr />
      <label className="cursor-pointer flex flex-row gap-2 relative group">
        <input
          type="checkbox"
          className="cursor-pointer"
          defaultChecked={checked}
          onClick={toggleChecked}
        />
        <h2 className="text-xl w-full font-semibold">{title}</h2>
        <FieldMenu onAdd={onAdd} />
      </label>
      <div
        className={`
          flex flex-col gap-10 
          ${checked ? "" : "pointer-events-none"}`}
      >
        {children}
      </div>
    </section>
  );
}

function Contact({ resume: { contactEntry } }) {
  const { firstName, lastName, email, phoneNumber } = contactEntry;
  return (
    <Section title="Contact">
      <div>
        <div className="flex flex-col">
          <div>
            <Field type="text" value={firstName} show={true} />
            <Field type="text" value={lastName} show={true} />
          </div>
        </div>

        <div className="flex flex-col">
          <Field type="text" value={email} show={true} />
        </div>

        <div className="flex flex-col">
          <div>
            <Field type="text" value={phoneNumber.countryCode} show={true} />
            <Field type="text" value={phoneNumber.number} show={true} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function WorkEntries({ resume, onResumeChange }) {
  const [entries, setEntries] = useState(resume.workEntries);

  function addEntry() {
    setEntries((prevEntries) => [...prevEntries, EMPTY_WORK_ENTRY]);
  }

  function deleteEntry(entry) {
    setEntries((prevEntries) => {
      return prevEntries.filter((prevEntry) => prevEntry.id !== entry.id);
    });
  }

  useEffect(() => {
    setEntries(resume.workEntries);
  }, [resume]);

  return (
    <div>
      <Section title="Work Experience" onAdd={addEntry}>
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            header={`
              ${entry.position} at 
              ${entry.organisation.name} 
              in ${entry.startDate?.toLocaleDateString("en-US", {
                month: "short",
              })} 
              ${entry.startDate?.getFullYear()}`}
            onDelete={() => deleteEntry(entry)}
            resume={resume}
            onResumeChange={onResumeChange}
            editEntry={entry.id === EMPTY_WORK_ENTRY.id}
          />
        ))}
      </Section>
    </div>
  );
}

function EducationEntries({ resume }) {
  const [entries, setEntries] = useState(resume.educationEntries);

  function addEntry() {
    setEntries((prevEntries) => [...prevEntries, EMPTY_EDUCATION_ENTRY]);
  }

  function deleteEntry(entry) {
    setEntries((prevEntries) => {
      return prevEntries.filter((prevEntry) => prevEntry.id !== entry.id);
    });
  }

  return (
    <Section title="Education" onAdd={addEntry}>
      {entries.map((entry) => (
        <Entry
          key={entry.id}
          entry={entry}
          header={`${entry.type}, ${entry.domain} at ${
            entry.organisation.name
          } in ${entry?.startDate?.getFullYear()}`}
          onDelete={() => deleteEntry(entry)}
          editEntry={entry.id === EMPTY_EDUCATION_ENTRY.id}
        />
      ))}
    </Section>
  );
}

function WorkEntryForm({
  entry: parentEntry,
  resume,
  onResumeChange,
  onCancel,
  onSave,
}) {
  const [entry, setEntry] = useState(parentEntry);

  useEffect(() => {
    setEntry(parentEntry);
  }, [parentEntry]);

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setEntry((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    updateWorkEntry(entry);
    onSave(entry);
  }

  useEffect(() => {
    getResume().then((resume) => {
      console.log("setting resume from WorkEntryForm:", resume);
      onResumeChange(resume);
    });
  }, [entry]);

  return (
    <form>
      <fieldset>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label>Position</label>
            <input
              className="appearance-none border rounded shadow p-1"
              type="text"
              value={entry.position}
              name="position"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Company Name</label>
            <input
              className="appearance-none border rounded shadow p-1"
              type="text"
              name="name"
              value={entry.organisation.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Company Website</label>
            <input
              type="url"
              className="appearance-none border rounded shadow p-1"
              name="website"
              value={entry.organisation.website || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <LocationInput
              name="location"
              value={entry.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="flex flex-col gap-2">
              Start Date
              <DateInput
                value={entry.startDate}
                name={"startDate"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col gap-2">
              End Date
              <DateInput
                value={entry.endDate}
                name={"endDate"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex flex-row gap-16 justify-between">
            <button
              type="reset"
              className="appearance-none border rounded shadow p-1 w-full"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="appearance-none border rounded shadow p-1 w-full"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

function EducationEntryForm({
  entry: defaultEntry,
  onCancel = () => {},
  onSave = () => {},
}) {
  const [entry, setEntry] = useState(defaultEntry);

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setEntry((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form>
      <fieldset>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label>Area</label>
            <input
              className="appearance-none border rounded shadow p-1"
              type="text"
              value={entry.area}
              name="area"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Study type</label>
            <input
              className="appearance-none border rounded shadow p-1"
              type="text"
              name="studyType"
              value={entry.studyType}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Insititution Name</label>
            <input
              className="appearance-none border rounded shadow p-1"
              type="text"
              name="institutionName"
              value={entry.institutionName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Institution Website</label>
            <input
              type="url"
              className="appearance-none border rounded shadow p-1"
              name="website"
              value={entry.website}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <LocationInput
              name="location"
              value={entry.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="flex flex-col gap-2">
              Start Date
              <DateInput
                value={entry.startDate}
                name={"startDate"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col gap-2">
              End Date
              <DateInput
                value={entry.endDate}
                name={"endDate"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex flex-row gap-16 justify-between">
            <button
              type="reset"
              className="appearance-none border rounded shadow p-1 w-full"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="appearance-none border rounded shadow p-1 w-full"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

function Entry({
  entry: initialEntry,
  onDelete,
  header,
  editEntry: initialEditEntry = false,
  resume,
  onResumeChange,
}) {
  const [entry, setEntry] = useState(initialEntry);
  const [checked, setChecked] = useState(true);
  const [editEntry, setEditEntry] = useState(initialEditEntry);

  function toggleChecked() {
    setChecked((prev) => !prev);
  }

  function toggleEditEntry() {
    setEditEntry((prev) => !prev);
  }

  function handleSave(entry) {
    toggleEditEntry();
  }

  function addAchievement() {
    setEntry((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  }

  useEffect(() => {
    if (resume) {
      const updatedResume = { ...resume };

      updatedResume.workEntries = updatedResume.workEntries.map(
        (existingEntry) => {
          if (existingEntry.id === entry.id) {
            return entry;
          } else {
            return existingEntry;
          }
        },
      );

      onResumeChange(updatedResume);
    }
  }, [entry]);

  if (editEntry) {
    if (Object.keys(entry).includes("employmentType")) {
      return (
        <WorkEntryForm
          entry={entry}
          resume={resume}
          onResumeChange={onResumeChange}
          onCancel={toggleEditEntry}
          onSave={handleSave}
        />
      );
    } else {
      return <EducationEntryForm entry={entry} onCancel={toggleEditEntry} />;
    }
  }

  if (!editEntry)
    return (
      <fieldset
        key={entry.id}
        className={`
        flex flex-col gap-4 p-4 justify-between
        ${checked ? "" : "opacity-50"}
        `}
      >
        <hr />

        <HeaderField
          show={true}
          className="font-medium"
          onChecked={toggleChecked}
          onEdit={toggleEditEntry}
          onAdd={addAchievement}
          onDelete={onDelete}
        >
          {header}
        </HeaderField>
        <div
          className={`flex flex-col gap-4 justify-between
          ${checked ? "" : "pointer-events-none"}
          `}
        >
          {entry.achievements.map((achievement, index) => (
            <Field
              type="textarea"
              key={index}
              show={true}
              value={achievement.description}
            />
          ))}
        </div>
      </fieldset>
    );
}

function HeaderField({
  show = false,
  className = "",
  onChecked = () => {},
  onAdd,
  onEdit = () => {},
  onDelete,
  children,
}) {
  const [checked, setChecked] = useState(true);

  function toggleChecked() {
    setChecked((prev) => !prev);
  }

  function handleEdit() {
    onEdit && onEdit();
  }

  return (
    <label
      className={`
          flex flex-row items-start gap-4 cursor-pointer w-full group relative
          ${show ? "" : "pointer-events-none"} 
          ${checked ? "" : "opacity-50"}
          ${className}`}
    >
      <input
        type="checkbox"
        className={`mt-1 cursor-pointer ${show ? "visible" : "invisible"}`}
        defaultChecked={checked}
        onClick={() => (onChecked ? onChecked() : toggleChecked())}
      />
      <div className={`w-full`}>{children}</div>
      <FieldMenu onAdd={onAdd} onEdit={handleEdit} onDelete={onDelete} />
    </label>
  );
}

function Field({
  value,
  type = "textarea",
  show = false,
  checked: initialChecked = true,
  className = "",
  onChecked,
}) {
  const [checked, setChecked] = useState(initialChecked);
  const containerRef = useRef(null);
  const textAreaRef = useRef(null);

  function toggleChecked() {
    setChecked((prev) => !prev);
  }

  function handleChecked() {
    toggleChecked();
    onChecked && onChecked();
  }

  function handleDelete() {
    containerRef?.current?.remove();
  }

  useEffect(() => {
    autoResizeTextArea(textAreaRef);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
          flex flex-row items-start gap-4 w-full group relative
          ${show ? "" : "pointer-events-none"} 
          ${checked ? "" : "opacity-50"}
          ${className}`}
    >
      <input
        type="checkbox"
        className={`mt-2 ${show ? "visible cursor-pointer" : "invisible"}`}
        defaultChecked={checked}
        onClick={handleChecked}
      />
      {type === "textarea" ? (
        <textarea
          ref={textAreaRef}
          defaultValue={value}
          placeholder="Tell us about what you've achieved here!"
          className={`w-full h-auto rounded text-justify appearance-none scrollbar-none p-1 
          ${checked ? "" : "text-slate-700/50 pointer-events-none"}`}
        />
      ) : (
        <input
          type="text"
          ref={textAreaRef}
          defaultValue={value}
          placeholder=""
          className={`w-full h-auto rounded text-justify appearance-none scrollbar-none p-1 
          ${checked ? "" : "text-slate-700/50 pointer-events-none"}`}
        />
      )}
      <FieldMenu onDelete={handleDelete} />
    </div>
  );
}

function FieldMenu({ onAdd, onEdit, onCopy, onDelete }) {
  return (
    <div className="invisible group-hover:visible flex flex-row gap-4 p-1 shadow drop-shadow rounded absolute right-0 bg-sky-300">
      {onAdd && (
        <button type="button" onClick={onAdd}>
          <Image
            src="/add-circle-outline.svg"
            width={20}
            height={20}
            alt="Create button"
          />
        </button>
      )}
      {onEdit && (
        <button type="button" onClick={onEdit}>
          <Image
            src="/create-outline.svg"
            width={20}
            height={20}
            alt="Edit button"
          />
        </button>
      )}
      {onCopy && (
        <button type="button" onClick={onCopy}>
          <Image
            src="/copy-outline.svg"
            width={20}
            height={20}
            alt="Duplicate button"
          />
        </button>
      )}
      {onDelete && (
        <button type="button" onClick={onDelete}>
          <Image
            src="/trash-outline.svg"
            width={20}
            height={20}
            alt="Delete button"
          />
        </button>
      )}
    </div>
  );
}

function autoResizeTextArea(textAreaRef) {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }
}

function DateInput({ value, name, onChange = (event) => {} }) {
  const startYear: number = 1900;
  const currentYear: number = new Date().getFullYear();
  const yearOptions: number[] = [];

  for (let i = startYear; i <= currentYear; i++) {
    yearOptions.push(i);
  }

  const [month, setMonth] = useState(value?.getMonth() + 1);
  const [year, setYear] = useState(value?.getFullYear());

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    if (key === "month") setMonth(value);
    if (key === "year") setYear(value);

    onChange({ target: { name: name, value: new Date(year, month) } });
  }

  return (
    <div className="flex flex-row gap-16 justify-between">
      <select
        value={month}
        name={"month"}
        onChange={handleChange}
        className="flex flex-col appearance-none w-full bg-white rounded shadow border px-4 py-2"
      >
        {/* dates are zero-based in js */}
        {month ? null : <option></option>}
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
        type="number"
        name={"year"}
        value={year}
        onChange={handleChange}
        className="appearance-none w-full rounded shadow border px-4 py-2"
      />
    </div>
  );
}

function LocationInput({ name, value, onChange }) {
  const [city, setCity] = useState(value.city || "");
  const [country, setCountry] = useState(value.country || "");
  const [remote, setRemote] = useState(value.remote || false);

  function toggleRemote() {
    setRemote((prev) => !prev);
  }

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    if (key === "city") setCity(value);
    if (key === "country") setCountry(value);

    onChange({ target: { name: name, value: { city, country, remote } } });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-start items-center">
        <input type="checkbox" defaultChecked={remote} onClick={toggleRemote} />
        <label>Remote</label>
      </div>
      <div
        className={`flex flex-row gap-16 justify-between ${
          remote ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col gap-2 w-full">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            className="appearance-none border rounded shadow p-1"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={handleChange}
            className="appearance-none border rounded shadow p-1"
          />
        </div>
      </div>
    </div>
  );
}