"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getLatestUpdatedResumeId } from "./resumes/action";

export default function Page() {
  const { data: session, status } = useSession();

  console.log("session and status", session, status);

  const isAuthenticated = status === "authenticated";

  redirect("/resumes/7e14f150-b397-45fd-9518-42847adb7085");
}
