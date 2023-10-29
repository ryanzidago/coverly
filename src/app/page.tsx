import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { createEmptyResume, getLatestUpdatedResume } from "./resumes/action";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    const userId = session.user.id;

    const latestUpdatedResume = await getLatestUpdatedResume(userId);
    if (latestUpdatedResume) {
      redirect(`/resumes/${latestUpdatedResume.id}`);
    } else {
      const resume = await createEmptyResume(userId);
      redirect(`/resumes/${resume.id}`);
    }
  } else {
    redirect("/api/auth/signin");
  }
}

// http://localhost:3000/api/auth/signin
