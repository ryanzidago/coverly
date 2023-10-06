"use client";

import { useEffect, useRef, useState } from "react";
import Template1 from "../template1/template1";
import { getResume } from "@/data/db";
import Image from "next/image";

const PROFESSIONAL_SUMMARIES = [
  {
    id: 1,
    content:
      "4 years of experience developing, testing, and troubleshooting product features within tight deadlines to get buy-in from prospective clients, or to make existing ones delighted. I thrive in a high-stake, fast-paced and dynamic environment with competing demands and constantly shifting priorities. I enjoy breaking down features into small parts that can incrementally be delivered to clients.",
  },
  {
    id: 2,
    content:
      "Experienced software engineer with a strong background in developing scalable and maintainable software solutions for diverse clients. Proficient in multiple programming languages and frameworks, including Java, Python, and React. Skilled in agile development methodologies and cross-functional team collaboration. Proven track record of delivering high-quality software products on time and within budget. Passionate about continuous learning and staying up-to-date with emerging technologies",
  },
];

const WORK_ENTRIES = [
  {
    id: 1,
    kind: "work",
    title: "Fullstack Software Engineer",
    companyName: "Sona",
    companyDescription:
      "Building the people operating system that frontline team needs",
    website: "https://getsona.com",
    location: {
      city: "",
      country: "",
      number: "",
      street: "",
      postalCode: "",
      remote: true,
    },
    startDate: {
      year: "2020",
      month: "9",
    },
    endDate: {
      year: "2022",
      month: "4",
    },
    descriptions: [
      'Making the experience of working with shifts easier for frontline and deskless workers in health, social care, retail, hospitality, and the voluntary sector by programming Sona\'s "people operating system".',
      "Fixed critical bug preventing clients from publishing shifts to their rosters, while on a call with the entire tech department",
    ],
    currentWork: true,
  },
  {
    id: 2,
    kind: "work",
    title: "Software Engineer",
    companyName: "JobValley",
    companyDescription:
      "HR solution for employers, working students and young professionals",
    website: "https://jobvalley.com",
    location: {
      city: "",
      country: "",
      number: "",
      street: "",
      postalCode: "",
      remote: true,
    },
    startDate: {
      year: "2020",
      month: "9",
    },
    endDate: {
      year: "2022",
      month: "4",
    },
    descriptions: [
      "Building the next generation of staffing software specialized for working students and recent graduate. I was responsible for automating and improving human ressources, legal and other business processes by proposing, developing, testing and deploying new features.",
      "Deployed stuff here and there",
    ],
    currentWork: false,
  },
];

const EMPTY_WORK_ENTRY = {
  id: 1000,
  kind: "work",
  title: "",
  companyName: "",
  companyDescription: "",
  website: "",
  location: {
    city: "",
    country: "",
    number: "",
    street: "",
    postalCode: "",
    remote: true,
  },
  startDate: {
    year: "",
    month: "",
  },
  endDate: {
    year: "",
    month: "",
  },
  descriptions: [],
  currentWork: true,
};

const EDUCATION_ENTRIES = [
  {
    id: 1,
    kind: "education",
    area: "Web Development",
    studyType: "Bootcamp",
    institutionName: "The Hacking Project",
    website: "https://thehackingproject.com",
    location: {
      city: "Paris",
      country: "France",
      postalCode: "",
      street: "",
      number: "",
      remote: false,
    },
    grade: "",
    startDate: {
      year: "2019",
      month: "5",
    },
    endDate: {
      year: "2019",
      month: "7",
    },
    descriptions: [
      "During this 11-weeks intensive coding bootcamp, I was introduced to Web development. I learned how to write software, build and deploy websites with Ruby, Ruby on Rails, PostgreSQL, HTML & CSS, Heroku, Git and GitHub. I also learned and used Python and OpenCV in order to scan QR codes, as part of my team's final project.",
    ],
    currentEducation: false,
  },
];

const EMPTY_EDUCATION_ENTRY = {
  id: 9990,
  kind: "education",
  area: "",
  studyType: "",
  institutionName: "",
  website: "",
  location: {
    city: "",
    country: "",
    postalCode: "",
    street: "",
    number: "",
    remote: false,
  },
  grade: "",
  startDate: {
    year: "",
    month: "",
  },
  endDate: {
    year: "",
    month: "",
  },
  descriptions: [],
  currentEducation: false,
};

export default function Page() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const id = 1;
    getResume(id).then((resume) => {
      if (resume) {
        setFormData(resume);
      } else {
        throw `Resume with id ${id} not found`;
      }
    });
  }, []);

  return (
    formData && (
      <div className="flex flex-col xl:flex-row items-center justify-center text-slate-700 text-justify ">
        <section className="border xl:w-1/2 lg:w-full min-w-content overflow-auto h-screen">
          <div className="flex flex-col gap-8 px-32 py-12">
            <h1 className="text-xl font-bold text-slate-600">
              <input
                type="text"
                value={formData.metadata.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    metadata: { ...prev.metadata, title: e.target.value },
                  }))
                }
                className="appearance-none  rounded-md p-1"
              />
            </h1>
            <Contact formData={formData} />
            <ProfessionalSummary formData={formData} />
            <WorkEntries formData={formData} />
            <EducationEntries formData={formData} />
          </div>
        </section>
        <div className="h-screen xl:w-1/2 w-full">
          <Template1 formData={formData} />
        </div>
      </div>
    )
  );

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

  function Contact({ formData: { contactEntry } }) {
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

  function ProfessionalSummary({ formData }) {
    return (
      <Section title="Professional Summary">
        <ul className="flex flex-col gap-8">
          {PROFESSIONAL_SUMMARIES.map((summary) => (
            <li key={summary.id}>
              <div className="relative flex flex-row gap-2 group">
                <Field show={true} value={summary.content} checked={false} />
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  function WorkEntries({ formData }) {
    const [entries, setEntries] = useState(WORK_ENTRIES);

    function addEntry() {
      setEntries((prevEntries) => [...prevEntries, EMPTY_WORK_ENTRY]);
    }

    function deleteEntry(entry) {
      setEntries((prevEntries) => {
        return prevEntries.filter((prevEntry) => prevEntry.id !== entry.id);
      });
    }

    return (
      <div>
        <Section title="Work Experience" onAdd={addEntry}>
          {entries.map((entry) => (
            <Entry
              key={entry.id}
              entry={entry}
              header={`${entry.title} at ${entry.companyName} in ${entry.startDate.year}`}
              onDelete={() => deleteEntry(entry)}
              editEntry={entry.id === EMPTY_WORK_ENTRY.id}
            />
          ))}
        </Section>
      </div>
    );
  }

  function EducationEntries({}) {
    const [entries, setEntries] = useState(EDUCATION_ENTRIES);

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
            header={`${entry.studyType}, ${entry.area} at ${entry.institutionName} in ${entry.startDate.year}`}
            onDelete={() => deleteEntry(entry)}
            editEntry={entry.id === EMPTY_EDUCATION_ENTRY.id}
          />
        ))}
      </Section>
    );
  }

  function WorkEntryForm({
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
              <label>Position</label>
              <input
                className="appearance-none border rounded shadow p-1"
                type="text"
                value={entry.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Company Name</label>
              <input
                className="appearance-none border rounded shadow p-1"
                type="text"
                name="companyName"
                value={entry.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Company Website</label>
              <input
                type="url"
                className="appearance-none border rounded shadow p-1"
                name="website"
                value={entry.website}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Location</label>
              <input
                type="text"
                className="appearance-none border rounded shadow p-1"
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
            {/* <div className="flex flex-col gap-2">
              <label>Achievements</label>
              <TextAreaListInputs
                values={entry.descriptions}
                name="descriptions"
                onChange={handleChange}
              />
            </div> */}
            <div className="flex flex-row gap-16 justify-between">
              <button
                type="reset"
                className="appearance-none border rounded shadow p-1 w-full"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
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
              <label>Location</label>
              <input
                type="text"
                className="appearance-none border rounded shadow p-1"
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

    function addDescription() {
      setEntry((prev) => ({
        ...prev,
        descriptions: [...prev.descriptions, ""],
      }));
    }

    if (editEntry && entry.kind == "work")
      return <WorkEntryForm entry={entry} onCancel={toggleEditEntry} />;
    if (editEntry && entry.kind == "education")
      return <EducationEntryForm entry={entry} onCancel={toggleEditEntry} />;

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
            onAdd={addDescription}
            onDelete={onDelete}
          >
            {header}
          </HeaderField>
          <div
            className={`flex flex-col gap-4 justify-between
          ${checked ? "" : "pointer-events-none"}
          `}
          >
            {entry.descriptions.map((description, index) => (
              <Field
                type="textarea"
                key={index}
                show={true}
                value={description}
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
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }

  function focusOnTextArea(textAreaRef) {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }

  function placeCursorAtTextAreaEnd(textAreaRef) {
    if (textAreaRef.current) {
      const length = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(length, length);
    }
  }

  function DateInput({ value, name, onChange = (event) => {} }) {
    const startYear: number = 1900;
    const currentYear: number = new Date().getFullYear();
    const yearOptions: number[] = [];

    for (let i = startYear; i <= currentYear; i++) {
      yearOptions.push(i);
    }

    const [date, setDate] = useState(value);

    function handleChange(event) {
      const key = event.target.name;
      const value = event.target.value;

      setDate((prev) => {
        const updatedDate = { ...prev, [key]: value };
        return updatedDate;
      });
    }

    useEffect(() => {
      onChange({ target: { name: name, value: date } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return (
      <div className="flex flex-row gap-16 justify-between">
        <select
          value={date.month}
          name={"month"}
          onChange={handleChange}
          className="flex flex-col appearance-none w-full bg-white rounded shadow border px-4 py-2"
        >
          {/* dates are zero-based in js */}
          {date.month ? null : <option></option>}
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
          value={date.year}
          onChange={handleChange}
          className="appearance-none w-full rounded shadow border px-4 py-2"
        />
      </div>
    );
  }
}
