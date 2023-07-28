"use client";

import TextInput from "@/components/text-input";
import URLInput from "../url-input";
import LocationInput from "../location-input";
import PhoneNumberInput from "../phone-number-input";
import { PhoneNumber } from "@/types/phone-number-type";
import { Location } from "@/types/location-type";

type ContactProps = {
  updateFields: (data: any) => void;
  firstName: string;
  lastName: string;
  label: string;
  email: string;
  phoneNumber: PhoneNumber;
  website: string;
  location: Location;
};

export default function Contact({
  updateFields,
  firstName,
  lastName,
  label,
  email,
  phoneNumber,
  website,
  location,
}: ContactProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-xl text-slate-700">
      <h1 className="text-xl">Personal Information</h1>
      <TextInput
        id="firstName"
        label="First name"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <TextInput
        id="lastName"
        label="Last name"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <TextInput
        id="label"
        label="Title"
        value={label}
        onChange={(e) => updateFields({ label: e.target.value })}
      />
      <TextInput
        id="email"
        label="Email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <PhoneNumberInput
        id="phoneNumber"
        label="Phone Number"
        value={phoneNumber}
        onChange={updateFields}
      />
      <URLInput
        id="website"
        label="Website"
        value={website}
        onChange={(e) => updateFields({ website: e.target.value })}
      />
      <LocationInput
        id="location"
        label="Location"
        value={location}
        displayStreet={true}
        onChange={updateFields}
      />
    </div>
  );
}
