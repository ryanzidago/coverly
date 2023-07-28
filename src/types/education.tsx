import { Location } from "./location-type";

export type Education = {
  degree: string;
  institutionName: string;
  website: string;
  location: Location;
  grade: string;
  startDate: Date | string;
  endDate: Date | string;
  descriptions: string[];
};
