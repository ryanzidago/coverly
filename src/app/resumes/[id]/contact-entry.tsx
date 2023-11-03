"use client";

import { useRouter } from "next/navigation";
import { updateContactEntry } from "../action";
import { Resume } from "@/app/types";

type ContactEntryProps = {
  resume: Resume;
};

export default function ContactEntry({ resume }: ContactEntryProps) {
  const router = useRouter();

  function handleOnChange() {
    const formElement = document.getElementById("contact-entry-form");
    const formData = new FormData(formElement as HTMLFormElement);
    updateContactEntry(formData);
    router.refresh();
  }

  return (
    <form
      id="contact-entry-form"
      action={updateContactEntry}
      onChange={handleOnChange}
      className="flex flex-col gap-2"
    >
      <input
        type="hidden"
        name="contactEntryId"
        value={resume?.contactEntry?.id}
      />
      <div className="flex flex-row gap-2">
        <input
          type="text"
          className="p-1 rounded hover:shadow-inner "
          name="firstName"
          placeholder="First Name"
          defaultValue={resume?.contactEntry?.firstName || ""}
        />
        <input
          type="text"
          className="p-1 rounded hover:shadow-inner "
          name="lastName"
          placeholder="Last Name"
          defaultValue={resume?.contactEntry?.lastName || ""}
        />
      </div>
      <input
        type="text"
        name="email"
        placeholder="Email Address"
        className="p-1 rounded hover:shadow-inner w-56 "
        defaultValue={resume?.contactEntry?.email || ""}
      />
      <div className="flex gap-2">
        <input
          type="tel"
          name="countryCode"
          placeholder="Country Code"
          className="p-1 rounded hover:shadow-inner "
          defaultValue={resume?.contactEntry?.phoneNumber?.countryCode || ""}
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          className="p-1 rounded hover:shadow-inner "
          defaultValue={resume?.contactEntry?.phoneNumber?.number || ""}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="hover:shadow-inner p-1 rounded "
          name="city"
          placeholder="City"
          defaultValue={resume?.contactEntry?.location?.city || ""}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className="hover:shadow-inner p-1 rounded "
          defaultValue={resume?.contactEntry?.location?.country || ""}
        />
      </div>
      <button className="hidden" type="submit">
        Submit
      </button>
    </form>
  );
}
