"use client";

import { getResume, updateResume, updateWorkEntry } from "@/app/actions";
import { useEffect, useRef, useState, useReducer } from "react";
import Template1 from "../template1/template1";
import Image from "next/image";

const RESUME_ID = "bba71748-52e4-4e91-8d28-df3529768254";

function reducer(state, action) {
  console.log("handling action", action.type, state);

  switch (action.type) {
    case "resume_loaded":
      return { ...normalizeUIState(action.payload.resume) };
    case "resume_updated":
      return updateResumeState(state, action);
    default:
      throw new Error(`no action of type ${action.type}`);
  }
}

function updateResumeState(state, action) {
  const { resume } = action.payload;
  const { id: resumeId } = resume;
  return { ...state, resume: { byId: { [resumeId]: resume } } };
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, null);

  console.log("Rendering ...");

  // fetching the resume from the database state
  // and putting it in the UI state
  useEffect(() => {
    getResume().then((resume) => {
      dispatch({ type: "resume_loaded", payload: { resume: resume } });
    });
  }, []);

  function handleTitleChange(event) {
    const resume = state.resume.byId[RESUME_ID];
    const updatedResume = { ...resume, title: event.target.value };

    dispatch({
      type: "resume_updated",
      payload: { resumeId: resume.id, resume: resume },
    });
    updateResume(updatedResume);
  }

  if (state) {
    return (
      <div className="flex flex-col xl:flex-row items-center justify-center text-slate-700 text-justify">
        <section className=" xl:w-1/2 lg:w-full min-w-content overflow-auto h-screen print:hidden">
          <div className="flex flex-col gap-8 px-32 py-12">
            <h1 className="text-xl font-bold text-slate-600">
              <input
                type="text"
                value={state.resume.byId[RESUME_ID].title}
                onChange={handleTitleChange}
                className="appearance-none  rounded-md p-1"
                placeholder="My resume"
              />
            </h1>
            <div>
              <pre className="p-10 overflow-auto shadow-xl rounded">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          </div>
        </section>
        <div className="h-screen xl:w-1/2 w-full"></div>
      </div>
    );
  }
}

// function WorkEntries({ state, dispatch }) {
//   const { resume, workEntries, workAchievements, organisations } = state;

//   console.log(state);

//   console.log(
//     "workEntries",
//     Object.values(workEntries.byId).map((entry) => entry),
//   );

//   return (
//     <div>
//       <Section
//         title="Work Experience"
//         // onAdd={onAdd}
//       >
//         {Object.values(workEntries.byId).map((entry) => (
//           <Entry
//             key={entry.id}
//             entry={entry}
//             achievements={workAchievements}
//             dispatch={dispatch}
//             header={`
//               ${entry.position} at
//               ${organisations.byId[entry.organisationId].name}
//               in ${entry.startDate?.toLocaleDateString("en-US", {
//                 month: "short",
//               })}
//               ${entry.startDate?.getFullYear()}`}
//             resume={resume}
//             // onDelete={() => deleteEntry(entry)}
//             // editEntry={entry.id === EMPTY_WORK_ENTRY.id}
//           />
//         ))}
//       </Section>
//     </div>
//   );
// }

// function Section({ children, title, className, onAdd }) {
//   const [checked, setChecked] = useState(true);

//   function toggleChecked() {
//     setChecked((prev) => !prev);
//   }

//   return (
//     <section
//       className={`flex flex-col gap-4 ${
//         checked ? "" : "opacity-50"
//       } ${className}`}
//     >
//       <hr />
//       <label className="cursor-pointer flex flex-row gap-2 relative group">
//         <input
//           type="checkbox"
//           className="cursor-pointer"
//           defaultChecked={checked}
//           onClick={toggleChecked}
//         />
//         <h2 className="text-xl w-full font-semibold">{title}</h2>
//         <FieldMenu onAdd={onAdd} />
//       </label>
//       <div
//         className={`
//           flex flex-col gap-10
//           ${checked ? "" : "pointer-events-none"}`}
//       >
//         {children}
//       </div>
//     </section>
//   );
// }

// function Entry({
//   entry,
//   onDelete,
//   header,
//   editEntry = false,
//   resume,
//   achievements,
//   dispatch,
// }) {
//   const checked = true;
//   // const [entry, setEntry] = useState(initialEntry);
//   // const [checked, setChecked] = useState(true);
//   // const [editEntry, setEditEntry] = useState(initialEditEntry);

//   // function toggleChecked() {
//   //   setChecked((prev) => !prev);
//   // }

//   // function toggleEditEntry() {
//   //   setEditEntry((prev) => !prev);
//   // }

//   // function handleSave(entry) {
//   //   toggleEditEntry();
//   //   setEntry(entry);
//   //   updateWorkEntry(entry);
//   // }

//   // function handleChange(entry) {
//   //   setEntry(entry);
//   // }

//   // function addAchievement() {
//   //   setEntry((prev) => ({
//   //     ...prev,
//   //     achievements: [...prev.achievements, ""],
//   //   }));
//   // }

//   if (editEntry) {
//     if (Object.keys(entry).includes("employmentType")) {
//       return (
//         <WorkEntryForm
//           entry={entry}
//           resume={resume}
//           // onCancel={toggleEditEntry}
//           // onSave={handleSave}
//           // onChange={handleChange}
//         />
//       );
//     } else {
//       // return <EducationEntryForm entry={entry} onCancel={toggleEditEntry} />;
//     }
//   }

//   function handleChange(event) {
//     dispatch({
//       type: "work_achievement_description_changed",
//       payload: event.target.value,
//     });
//   }

//   if (!editEntry)
//     return (
//       <fieldset
//         key={entry.id}
//         className={`
//         flex flex-col gap-4 p-4 justify-between
//         ${checked ? "" : "opacity-50"}
//         `}
//       >
//         <hr />

//         <HeaderField
//           show={true}
//           className="font-medium"
//           // onChecked={toggleChecked}
//           // onEdit={toggleEditEntry}
//           // onAdd={addAchievement}
//           onDelete={onDelete}
//         >
//           {header}
//         </HeaderField>
//         <div
//           className={`flex flex-col gap-4 justify-between
//           ${checked ? "" : "pointer-events-none"}
//           `}
//         >
//           {Object.values(achievements.byId)
//             .filter(
//               (achievement) =>
//                 achievement.workEntryId == entry.id ||
//                 achievement.educationEntryId == entry.id,
//             )
//             .map((achievement, index) => (
//               <Field
//                 type="textarea"
//                 key={index}
//                 show={true}
//                 value={achievement.description}
//                 onChange={(e) => handleChange(e)}
//               />
//             ))}
//         </div>
//       </fieldset>
//     );
// }

// function WorkEntryForm({
//   entry,
//   resume,
//   onResumeSave,
//   onCancel,
//   onSave,
//   onChange,
// }) {
//   function handleChange(event) {
//     const key = event.target.name;
//     const value = event.target.value;
//     onChange({ ...entry, [key]: value });
//   }

//   function handleSave() {
//     onSave(entry);
//     getResume().then((resume) => onResumeSave(resume));
//   }

//   return (
//     <form>
//       <fieldset>
//         <div className="flex flex-col gap-8">
//           <div className="flex flex-col gap-2">
//             <label>Position</label>
//             <input
//               className="appearance-none border rounded shadow p-1"
//               type="text"
//               value={entry.position}
//               name="position"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label>Company Name</label>
//             <input
//               className="appearance-none border rounded shadow p-1"
//               type="text"
//               name="name"
//               value={entry.organisation.name || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label>Company Website</label>
//             <input
//               type="url"
//               className="appearance-none border rounded shadow p-1"
//               name="website"
//               value={entry.organisation.website || ""}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <LocationInput
//               name="location"
//               value={entry.location}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="flex flex-col gap-2">
//               Start Date
//               <DateInput
//                 value={entry.startDate}
//                 name={"startDate"}
//                 onChange={handleChange}
//               />
//             </label>
//           </div>
//           <div>
//             <label className="flex flex-col gap-2">
//               End Date
//               <DateInput
//                 value={entry.endDate}
//                 name={"endDate"}
//                 onChange={handleChange}
//               />
//             </label>
//           </div>
//           <div className="flex flex-row gap-16 justify-between">
//             <button
//               type="reset"
//               className="appearance-none border rounded shadow p-1 w-full"
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="appearance-none border rounded shadow p-1 w-full"
//               onClick={handleSave}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </fieldset>
//     </form>
//   );
// }

// function HeaderField({
//   show = false,
//   className = "",
//   onChecked = () => {},
//   onAdd,
//   onEdit = () => {},
//   onDelete,
//   children,
// }) {
//   const [checked, setChecked] = useState(true);

//   function toggleChecked() {
//     setChecked((prev) => !prev);
//   }

//   function handleEdit() {
//     onEdit && onEdit();
//   }

//   return (
//     <label
//       className={`
//           flex flex-row items-start gap-4 cursor-pointer w-full group relative
//           ${show ? "" : "pointer-events-none"}
//           ${checked ? "" : "opacity-50"}
//           ${className}`}
//     >
//       <input
//         type="checkbox"
//         className={`mt-1 cursor-pointer ${show ? "visible" : "invisible"}`}
//         defaultChecked={checked}
//         onClick={() => (onChecked ? onChecked() : toggleChecked())}
//       />
//       <div className={`w-full`}>{children}</div>
//       <FieldMenu onAdd={onAdd} onEdit={handleEdit} onDelete={onDelete} />
//     </label>
//   );
// }

// function Field({
//   value,
//   type = "textarea",
//   show = false,
//   checked: initialChecked = true,
//   className = "",
//   onChecked,
//   onChange,
// }) {
//   const [checked, setChecked] = useState(initialChecked);
//   const containerRef = useRef(null);
//   const textAreaRef = useRef(null);

//   function handleChange(event) {
//     onChange(event);
//   }

//   function toggleChecked() {
//     setChecked((prev) => !prev);
//   }

//   function handleChecked() {
//     toggleChecked();
//     onChecked && onChecked();
//   }

//   function handleDelete() {
//     containerRef?.current?.remove();
//   }

//   useEffect(() => {
//     autoResizeTextArea(textAreaRef);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className={`
//           flex flex-row items-start gap-4 w-full group relative
//           ${show ? "" : "pointer-events-none"}
//           ${checked ? "" : "opacity-50"}
//           ${className}`}
//     >
//       <input
//         type="checkbox"
//         className={`mt-2 ${show ? "visible cursor-pointer" : "invisible"}`}
//         defaultChecked={checked}
//         onClick={handleChecked}
//       />
//       {type === "textarea" ? (
//         <textarea
//           ref={textAreaRef}
//           defaultValue={value}
//           placeholder="Tell us about what you've achieved here!"
//           className={`w-full h-auto rounded text-justify appearance-none scrollbar-none p-1
//           ${checked ? "" : "text-slate-700/50 pointer-events-none"}`}
//           onChange={handleChange}
//         />
//       ) : (
//         <input
//           type="text"
//           ref={textAreaRef}
//           defaultValue={value}
//           placeholder=""
//           className={`w-full h-auto rounded text-justify appearance-none scrollbar-none p-1
//           ${checked ? "" : "text-slate-700/50 pointer-events-none"}`}
//           onChange={handleChange}
//         />
//       )}
//       <FieldMenu onDelete={handleDelete} />
//     </div>
//   );
// }

// function FieldMenu({ onAdd, onEdit, onCopy, onDelete }) {
//   return (
//     <div className="invisible group-hover:visible flex flex-row gap-4 p-1 shadow drop-shadow rounded absolute right-0 bg-sky-300">
//       {onAdd && (
//         <button type="button" onClick={onAdd}>
//           <Image
//             src="/add-circle-outline.svg"
//             width={20}
//             height={20}
//             alt="Create button"
//           />
//         </button>
//       )}
//       {onEdit && (
//         <button type="button" onClick={onEdit}>
//           <Image
//             src="/create-outline.svg"
//             width={20}
//             height={20}
//             alt="Edit button"
//           />
//         </button>
//       )}
//       {onCopy && (
//         <button type="button" onClick={onCopy}>
//           <Image
//             src="/copy-outline.svg"
//             width={20}
//             height={20}
//             alt="Duplicate button"
//           />
//         </button>
//       )}
//       {onDelete && (
//         <button type="button" onClick={onDelete}>
//           <Image
//             src="/trash-outline.svg"
//             width={20}
//             height={20}
//             alt="Delete button"
//           />
//         </button>
//       )}
//     </div>
//   );
// }

// function autoResizeTextArea(textAreaRef) {
//   if (textAreaRef.current) {
//     textAreaRef.current.style.height = "auto";
//     textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
//   }
// }

// function DateInput({ value, name, onChange = (event) => {} }) {
//   const startYear: number = 1900;
//   const currentYear: number = new Date().getFullYear();
//   const yearOptions: number[] = [];

//   for (let i = startYear; i <= currentYear; i++) {
//     yearOptions.push(i);
//   }

//   const [month, setMonth] = useState(value?.getMonth() + 1);
//   const [year, setYear] = useState(value?.getFullYear());

//   function handleChange(event) {
//     const key = event.target.name;
//     const value = event.target.value;

//     if (key === "month") setMonth(value);
//     if (key === "year") setYear(value);

//     onChange({ target: { name: name, value: new Date(year, month) } });
//   }

//   return (
//     <div className="flex flex-row gap-16 justify-between">
//       <select
//         value={month}
//         name={"month"}
//         onChange={handleChange}
//         className="flex flex-col appearance-none w-full bg-white rounded shadow border px-4 py-2"
//       >
//         {/* dates are zero-based in js */}
//         {month ? null : <option></option>}
//         <option value={1}>January</option>
//         <option value={2}>February</option>
//         <option value={3}>March</option>
//         <option value={4}>April</option>
//         <option value={5}>May</option>
//         <option value={6}>June</option>
//         <option value={7}>July</option>
//         <option value={8}>August</option>
//         <option value={9}>September</option>
//         <option value={10}>October</option>
//         <option value={11}>November</option>
//         <option value={12}>December</option>
//       </select>
//       <input
//         type="number"
//         name={"year"}
//         value={year}
//         onChange={handleChange}
//         className="appearance-none w-full rounded shadow border px-4 py-2"
//       />
//     </div>
//   );
// }

// function LocationInput({ name, value, onChange }) {
//   const [city, setCity] = useState(value.city || "");
//   const [country, setCountry] = useState(value.country || "");
//   const [remote, setRemote] = useState(value.remote || false);

//   function toggleRemote() {
//     setRemote((prev) => !prev);
//   }

//   function handleChange(event) {
//     const key = event.target.name;
//     const value = event.target.value;

//     if (key === "city") setCity(value);
//     if (key === "country") setCountry(value);

//     onChange({ target: { name: name, value: { city, country, remote } } });
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex gap-2 justify-start items-center">
//         <input type="checkbox" defaultChecked={remote} onClick={toggleRemote} />
//         <label>Remote</label>
//       </div>
//       <div
//         className={`flex flex-row gap-16 justify-between ${
//           remote ? "opacity-50 pointer-events-none" : ""
//         }`}
//       >
//         <div className="flex flex-col gap-2 w-full">
//           <label>City</label>
//           <input
//             type="text"
//             value={city}
//             onChange={handleChange}
//             className="appearance-none border rounded shadow p-1"
//           />
//         </div>
//         <div className="flex flex-col gap-2 w-full">
//           <label>Country</label>
//           <input
//             type="text"
//             value={country}
//             onChange={handleChange}
//             className="appearance-none border rounded shadow p-1"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

function normalizeUIState(resume) {
  const { contactEntry, workEntries, educationEntries, projectEntries } =
    resume;

  let organisations = workEntries
    .concat(educationEntries)
    .map((entry) => entry.organisation);

  organisations = [...new Set(organisations)];

  return {
    resume: {
      byId: {
        [resume.id]: {
          id: resume.id,
          title: resume.title,
          authorId: resume.authorId,
          insertedAt: resume.insertedAt,
          updatedAt: resume.updatedAt,
          label: resume.label,
        },
      },
    },
    contactEntry: {
      byId: {
        [contactEntry.id]: {
          id: contactEntry.id,
          resumeId: contactEntry.resumeId,
          firstName: contactEntry.firstName,
          lastName: contactEntry.lastName,
          email: contactEntry.email,
          phoneNumber: contactEntry.phoneNumber,
          location: contactEntry.location,
          externalLinks: contactEntry.externalLinks,
          insertedAt: contactEntry.insertedAt,
          updatedAt: contactEntry.updatedAt,
        },
      },
    },
    workEntries: {
      all: workEntries.map((w) => w.id),
      byId: groupById(
        workEntries.map(
          (workEntry) => ({
            id: workEntry.id,
            resumeId: workEntry.resumeId,
            position: workEntry.position,
            startDate: workEntry.startDate,
            endDate: workEntry.endDate,
            location: workEntry.location,
            organisationId: workEntry.organisationId,
            employmentType: workEntry.employmentType,
            insertedAt: workEntry.insertedAt,
            updatedAt: workEntry.updatedAt,
            workAchievementIds: workEntry.achievements.map((a) => a.id),
          }),
          (workEntry) => workEntry.id,
        ),
      ),
    },
    workAchievements: {
      all: workEntries.flatMap((workEntry) =>
        workEntry.achievements.map((a) => a.id),
      ),
      byId: groupById(
        workEntries.flatMap((workEntry) =>
          workEntry.achievements.map((achievement) => ({
            id: achievement.id,
            resumeId: resume.id,
            workEntryId: achievement.workEntryId,
            description: achievement.description,
            insertedAt: achievement.insertedAt,
            updatedAt: achievement.updatedAt,
          })),
        ),
      ),
    },
    educationEntries: {
      all: educationEntries.map((e) => e.id),
      byId: groupById(
        educationEntries.map((educationEntry) => ({
          id: educationEntry.id,
          resumeId: educationEntry.resumeId,
          startDate: educationEntry.startDate,
          endDate: educationEntry.endDate,
          location: educationEntry.location,
          domain: educationEntry.domain,
          tpye: educationEntry.type,
          organisationId: educationEntry.organisationId,
          insertedAt: educationEntry.insertedAt,
          updatedAt: educationEntry.updatedAt,
        })),
      ),
    },
    educationAchievements: {
      all: educationEntries.flatMap((educationEntry) =>
        educationEntry.achievements.map((a) => a.id),
      ),
      byId: groupById(
        educationEntries.flatMap((educationEntry) =>
          educationEntry.achievements.map((achievement) => ({
            id: achievement.id,
            resumeId: resume.id,
            educationEntryId: achievement.educationEntryId,
            description: achievement.description,
            insertedAt: achievement.insertedAt,
            updatedAt: achievement.updatedAt,
          })),
        ),
      ),
    },
    organisations: {
      all: organisations.map((o) => o.id),
      byId: groupById(
        organisations.map((organisation) => ({
          id: organisation.id,
          name: organisation.name,
          website: organisation.website,
          insertedAt: organisation.insertedAt,
          updatedAt: organisation.updatedAt,
        })),
      ),
    },
  };
}

function groupById(items) {
  return items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
}
