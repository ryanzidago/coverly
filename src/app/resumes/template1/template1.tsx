"use client";

import EntryAchievements from "./entry-description";
import EntryHeader from "./entry-header";
import Link from "./link";
import Section from "./section";

export default function Template1({ resume }) {
  const { contactEntry, workEntries, educationEntries } = resume;

  return (
    <div
      id="template1"
      className="flex flex-col items-center gap-2 text-zinc-800 h-full shadow print:shadow-none rounded-sm xl:px-40 px-20 pt-20 text-sm m-auto sticky top-0"
    >
      {/* // contact section */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-zinc-700 font-semibold">
            {contactEntry?.firstName} {contactEntry?.lastName}
          </h1>
          {resume?.label && <h2 className="text-md">{resume?.label}</h2>}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row gap-2">
            <Link href={`mailto:${contactEntry?.email}`}>
              {contactEntry?.email}
            </Link>
            <Link
              href={`tel:${contactEntry?.phoneNumber?.countryCode} ${contactEntry?.phoneNumber?.number}`}
            >
              {contactEntry?.phoneNumber?.countryCode}{" "}
              {contactEntry?.phoneNumber?.number}
            </Link>
          </div>
          <p>
            <Location contactEntry={contactEntry} />
          </p>
        </div>
      </div>
      {/* work section*/}
      <Section title="Work Experience">
        {workEntries
          .filter((workEntry) => workEntry.displayed === true)
          .map((workEntry, index: number) => (
            // workEntry entry container
            <div key={index}>
              {/* workEntry header */}
              <EntryHeader
                title={workEntry?.position}
                subtitle={workEntry?.organisation?.name}
                link={workEntry?.organisation?.website}
                startDate={workEntry?.startDate}
                endDate={workEntry?.endDate}
                location={workEntry?.location}
              />
              {/* work description container */}
              <EntryAchievements
                achievements={workEntry?.achievements}
                index={index}
              />
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
              title={education?.area}
              link={education?.organisation?.website}
              subtitle={education?.organisation?.name}
              startDate={education?.startDate}
              endDate={education?.endDate}
              location={education?.location}
            />

            {/* education description container */}
            <EntryAchievements
              achievements={education?.achievements}
              index={index}
            />
          </div>
        ))}
      </Section>
    </div>
  );
}

function Location({ contactEntry }) {
  if (contactEntry?.location?.city && contactEntry?.location?.country) {
    return (
      <>
        {contactEntry?.location?.city}, {contactEntry?.location?.country}
      </>
    );
  } else {
    return <></>;
  }
}