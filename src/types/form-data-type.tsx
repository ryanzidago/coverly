import { Contact } from "./contact-type";
import { Work } from "./work-type";
import { Education } from "./education-type";

export type FormData = {
  id: number;
  title: string;
  contactEntry: Contact;
  workEntries: Work[];
  educationEntries: Education[];
};
