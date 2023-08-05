import { FormData } from "@/types/form-data-type";
import EntryDescription from "./entry-description";
import EntryHeader from "./entry-header";
import Link from "./link";
import Section from "./section";
import { processFormData } from "@/utils/process-form-data";

type Template1Props = {
  formData: FormData;
};

export default function Template1({ formData }: Template1Props) {
  const resume = processFormData(formData);

  return (
    <div
      id="template1"
      className="flex flex-col items-center gap-2 text-zinc-800 w-[70vh] drop-shadow-sm shadow print:shadow-none rounded-sm p-10 text-sm m-auto sticky top-10"
    >
      {/* // contact section */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-zinc-700 font-semibold">
            {resume.firstName} {resume.lastName}
          </h1>
          <h2 className="text-md">{resume.label}</h2>
        </div>
        <div className="flex flex-col items-center mt-2 gap-2">
          <div className="flex flex-row space-x-8">
            <Link href={`mailto:${resume.email}`}>{resume.email}</Link>
            <Link
              href={`tel:${resume.phoneNumber.countryCode} ${resume.phoneNumber.number}`}
            >
              {resume.phoneNumber.countryCode} {resume.phoneNumber.number}
            </Link>
          </div>
          <p>
            {resume.location.city}, {resume.location.country}
          </p>
        </div>
      </div>
      {/* work section*/}
      <Section title="Work Experience">
        {resume.workEntries.map((work, index: number) => (
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
        {resume.educationEntries.map((education, index: number) => (
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