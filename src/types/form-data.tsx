import { Contact } from "./contact";
import { Work } from "./work";
import { Education } from "./education";

export type FormData = Contact & {
  workEntries: Work[];
  educationEntries: Education[];
};
