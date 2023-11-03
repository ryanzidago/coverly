"use server";

import ContactEntry from "./contact-entry";
import TitleInput from "./title-input";
import WorkEntries from "./work-entries";
import Template1 from "../template1/template1";
import { allResumesForUserId, getResume } from "../action";
import EducationEntries from "./education-entries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Resume } from "@/app/types";

export default async function Page({ params }: any) {
  const session = await getServerSession(authOptions);
  const { user } = session;

  const { id: resumeId } = params;

  const resume = await getResume(user.id, resumeId);
  const resumes = await allResumesForUserId(user.id);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center text-slate-700 text-justify">
      <section className="xl:w-1/2 lg:w-full min-w-content overflow-auto h-screen print:hidden">
        <div className="flex flex-col gap-24 px-32 py-12 w-full">
          <TitleInput resume={resume} resumes={resumes} />
          <ContactEntry resume={resume} />
          <WorkEntries resume={resume} />
          <EducationEntries resume={resume} />
        </div>
      </section>
      <div className="h-screen xl:w-1/2 w-full">
        <Template1 resume={resume} />
      </div>
    </div>
  );
}
