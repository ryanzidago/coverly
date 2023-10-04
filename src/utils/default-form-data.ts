import { FormData } from "@/types/form-data-type";

const DEFAULT_FORM_DATA: FormData = {
  id: 0,
  metadata: {
    title: "My New Resume",
    description: "",
  },
  contactEntry: {
    firstName: "",
    lastName: "",
    email: "",
    location: {
      city: "",
      country: "",
      postalCode: "",
      street: "",
      number: "",
      remote: false,
    },
    label: "",
    phoneNumber: { countryCode: "", number: "" },
    website: "",
  },
  workEntries: [
    {
      title: "",
      companyName: "",
      website: "",
      location: {
        city: "",
        country: "",
        postalCode: "",
        street: "",
        number: "",
        remote: false,
      },
      startDate: {
        month: "",
        year: "",
      },
      endDate: {
        month: "",
        year: "",
      },
      descriptions: "",
      currentWork: false,
    },
  ],
  educationEntries: [
    {
      area: "",
      studyType: "",
      institutionName: "",
      website: "",
      location: {
        city: "",
        country: "",
        postalCode: "",
        street: "",
        number: "",
        remote: false,
      },
      grade: "",
      startDate: {
        month: "",
        year: "",
      },
      endDate: {
        month: "",
        year: "",
      },
      descriptions: "",
      currentEducation: false,
    },
  ],
};

export default DEFAULT_FORM_DATA;
