import { Location } from "./location-type";
import { DateSimple } from "./date-simple-type";

export type Education = {
  area: string;
  studyType: string;
  institutionName: string;
  website: string;
  location: Location;
  grade: string;
  startDate: DateSimple;
  endDate: DateSimple;
  descriptions: string;
  currentEducation: boolean;
};
