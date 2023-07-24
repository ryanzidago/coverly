"use client";

import TextInput from "@/components/text-input";
import URLInput from "../url-input";
import LocationInput from "../location-input";
import PhoneNumberInput from "../phone-number-input";

export default function Contact({ updateFields }) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
      <h1 className="text-xl">Personal Information</h1>
      <TextInput
        id="firstName"
        label="First name"
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <TextInput
        id="lastName"
        label="Last name"
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <TextInput
        id="label"
        label="Title"
        onChange={(e) => updateFields({ label: e.target.value })}
      />
      <TextInput
        id="email"
        label="Email"
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <PhoneNumberInput
        id="phoneNumber"
        label="Phone Number"
        onChange={updateFields}
      />
      {/* <TextInput
        id="phoneNumber"
        label="Phone number"
        onChange={(e) => updateFields({ phoneNumber: e.target.value })}
      /> */}
      <URLInput
        id="website"
        label="Website"
        onChange={(e) => updateFields({ webiste: e.target.value })}
      />
      <LocationInput
        id="location"
        label="Location"
        displayStreet={true}
        onChange={updateFields}
      />
    </div>
  );
}
