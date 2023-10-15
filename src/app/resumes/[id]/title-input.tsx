"use client";
import { useRouter } from "next/navigation";
import { updateResume } from "./action";

export default function TitleInput({ resume }) {
  const router = useRouter();

  function handleOnChange() {
    const formElement = document.getElementById("resume-metadata-form");
    const formData = new FormData(formElement);
    updateResume(formData);
    router.refresh();
  }

  return (
    <form
      id="resume-metadata-form"
      action={updateResume}
      onChange={handleOnChange}
    >
      <h1 className="text-xl font-bold text-slate-600">
        <input type="hidden" name="resumeId" value={resume.id} />
        <input
          type="text"
          defaultValue={resume.title}
          name="resumeTitle"
          className="appearance-none rounded-md p-1 w-full"
          placeholder="Resume title"
        />
        <button type="submit" />
      </h1>
    </form>
  );
}
