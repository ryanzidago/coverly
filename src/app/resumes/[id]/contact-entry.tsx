"use client";

import { useRouter } from "next/navigation";
import { updateContactEntry } from "../action";

export default function ContactEntry({ resume }) {
  const router = useRouter();

  function handleOnChange() {
    const formElement = document.getElementById("contact-entry-form");
    const formData = new FormData(formElement);
    updateContactEntry(formData);
    router.refresh();
  }

  return (
    <form
      id="contact-entry-form"
      action={updateContactEntry}
      onChange={handleOnChange}
    >
      <input
        type="hidden"
        name="contactEntryId"
        value={resume.contactEntry.id}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        defaultValue={resume?.contactEntry?.firstName}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        defaultValue={resume?.contactEntry?.lastName}
      />
      <input
        type="text"
        name="email"
        placeholder="Email Address"
        defaultValue={resume?.contactEntry?.email}
      />
      <div>
        <input
          type="tel"
          name="countryCode"
          placeholder="Country Code"
          defaultValue={resume?.contactEntry?.phoneNumber?.countryCode}
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          defaultValue={resume?.contactEntry?.phoneNumber?.number}
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          placeholder="City"
          defaultValue={resume?.contactEntry?.location?.city}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          defaultValue={resume?.contactEntry?.location?.country}
        />
      </div>
      <button className="hidden" type="submit">
        Submit
      </button>
    </form>
  );
}
