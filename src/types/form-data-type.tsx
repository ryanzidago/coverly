import { Contact } from "./contact-type";
import { Work } from "./work-type";
import { Education } from "./education-type";
import { ResumeMetadata } from "./resume-metadata";

export type FormData = {
  id: number;
  metadata: ResumeMetadata;
  contactEntry: Contact;
  workEntries: Work[];
  educationEntries: Education[];
};
