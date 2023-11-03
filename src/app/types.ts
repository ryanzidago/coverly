import {
  Resume as ResumeModel,
  ContactEntry as ContactEntryModel,
  WorkEntry as WorkEntryModel,
  WorkAchievement as WorkAchievementModel,
  EducationEntry as EducationEntryModel,
  EducationAchievement as EducationAchievementModel,
  Organisation as OrganisationModel,
} from "@prisma/client";

export type Resume = ResumeModel & {
  contactEntry?: ContactEntry;
  workEntries?: WorkEntry[];
  educationEntries?: EducationEntry[];
};

export type ContactEntry = ContactEntryModel & {
  phoneNumber?: PhoneNumber;
  location?: Location;
};

export type EducationEntry = EducationEntryModel & {
  location?: Location;
  organisation?: Organisation;
  achievements?: EducationAchievement[];
};

export type EducationAchievement = EducationAchievementModel;

export type WorkEntry = WorkEntryModel & {
  location?: Location;
  organisation?: Organisation;
  achievements?: WorkAchievement[];
};

export type WorkAchievement = WorkAchievementModel;

export type Organisation = OrganisationModel;

export type Location = { city?: string; country?: string; remote?: boolean };
export type PhoneNumber = { countryCode?: string; number?: string };
