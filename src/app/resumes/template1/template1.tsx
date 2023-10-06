"use client";

import { FormData } from "@/types/form-data-type";
import EntryDescription from "./entry-description";
import EntryHeader from "./entry-header";
import Link from "./link";
import Section from "./section";
import { processFormData } from "@/utils/process-form-data";
import Image from "next/image";

type Template1Props = {
  formData: FormData;
};

export default function Template1({ formData }: Template1Props) {
  const { contactEntry, workEntries, educationEntries } =
    processFormData(formData);

  return (
    <div
      id="template1"
      className="flex flex-col items-center gap-2 text-zinc-800 h-full shadow print:shadow-none rounded-sm xl:px-40 px-20 pt-20 text-sm m-auto sticky top-0"
    >
      {/* // contact section */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-zinc-700 font-semibold">
            {contactEntry.firstName} {contactEntry.lastName}
          </h1>
          <h2 className="text-md">{contactEntry.label}</h2>
        </div>
        <div className="flex flex-col items-center mt-2 gap-2">
          <div className="flex flex-row gap-2">
            <Link href={`mailto:${contactEntry.email}`}>
              {contactEntry.email}
            </Link>
            <Link
              href={`tel:${contactEntry.phoneNumber.countryCode} ${contactEntry.phoneNumber.number}`}
            >
              {contactEntry.phoneNumber.countryCode}{" "}
              {contactEntry.phoneNumber.number}
            </Link>
          </div>
          <p>
            {contactEntry.location.city}, {contactEntry.location.country}
          </p>
        </div>
      </div>
      {/* work section*/}
      <Section title="Work Experience">
        {workEntries.map((work, index: number) => (
          // work entry container
          <div key={index}>
            {/* work header */}
            <EntryHeader
              title={work.title}
              subtitle={work.companyName}
              link={work.website}
              startDate={work.startDate}
              endDate={work.endDate}
              location={work.location}
            />
            {/* work description container */}
            <EntryDescription descriptions={work.descriptions} index={index} />
          </div>
        ))}
      </Section>
      {/* education section */}
      <Section title="Education">
        {educationEntries.map((education, index: number) => (
          // education container
          <div key={index}>
            {/* education header */}
            <EntryHeader
              title={education.area}
              link={education.website}
              subtitle={education.institutionName}
              startDate={education.startDate}
              endDate={education.endDate}
              location={education.location}
            />

            {/* education description container */}
            <EntryDescription
              descriptions={education.descriptions}
              index={index}
            />
          </div>
        ))}
      </Section>
    </div>
  );
}
