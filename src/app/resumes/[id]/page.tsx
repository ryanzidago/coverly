"use server";

import Template1 from "../template1/template1";
import { getResume, updateResume } from "./action";
import ContactEntry from "./contact-entry";
import TitleInput from "./title-input";
import WorkEntries from "./work-entries";

export default async function Page({ params }) {
  const { id } = params;
  const resume = await getResume(id);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center text-slate-700 text-justify">
      <section className=" xl:w-1/2 lg:w-full min-w-content overflow-auto h-screen print:hidden">
        <div className="flex flex-col gap-8 px-32 py-12 w-full">
          <TitleInput resume={resume} />
          <ContactEntry resume={resume} />
          <WorkEntries resume={resume} />
        </div>
      </section>
      <div className="h-screen xl:w-1/2 w-full">
        <Template1 resume={resume} />
      </div>
    </div>
  );
}
