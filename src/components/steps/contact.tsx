"use client";

import TextInput from "@/components/text-input";
import URLInput from "../url-input";
import LocationInput from "../location-input";
import PhoneNumberInput from "../phone-number-input";
import { PhoneNumber } from "@/types/phone-number-type";
import { Location } from "@/types/location-type";
import { FormData } from "@/types/form-data-type";

type ContactProps = {
  updateFields: (data: any) => void;
  formData: FormData;
  className: string;
};

export default function Contact({
  updateFields,
  className,
  formData,
}: ContactProps) {
  const { contactEntry: contactEntry } = formData;

  return (
    <div className={className}>
      <h1 className="text-xl">Personal Information</h1>
      <TextInput
        id="firstName"
        label="First name"
        value={contactEntry.firstName}
        onChange={(e) =>
          updateFields({
            contactEntry: { ...contactEntry, firstName: e.target.value },
          })
        }
      />

      <TextInput
        id="lastName"
        label="Last name"
        value={contactEntry.lastName}
        onChange={(e) =>
          updateFields({
            contactEntry: { ...contactEntry, lastName: e.target.value },
          })
        }
      />

      <TextInput
        id="label"
        label="Title"
        value={contactEntry.label}
        onChange={(e) =>
          updateFields({
            contactEntry: { ...contactEntry, label: e.target.value },
          })
        }
      />

      <TextInput
        id="email"
        label="Email"
        value={contactEntry.email}
        onChange={(e) =>
          updateFields({
            contactEntry: { ...contactEntry, email: e.target.value },
          })
        }
      />
      <PhoneNumberInput
        id="phoneNumber"
        label="Phone Number"
        value={contactEntry.phoneNumber}
        onChange={(value: PhoneNumber) => {
          updateFields({
            contactEntry: { ...contactEntry, phoneNumber: value },
          });
        }}
      />

      <URLInput
        id="website"
        label="Website"
        value={contactEntry.website}
        onChange={(e) =>
          updateFields({
            contactEntry: { ...contactEntry, website: e.target.value },
          })
        }
      />

      <LocationInput
        id="location"
        label="Location"
        value={contactEntry.location}
        displayStreet={false}
        onChange={(location: Location) =>
          updateFields({
            contactEntry: { ...contactEntry, location: location },
          })
        }
      />
    </div>
  );
}
