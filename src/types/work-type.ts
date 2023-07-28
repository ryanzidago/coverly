import { DateSimple } from "./date-simple-type";
import { Location } from "./location-type";

export type Work = {
  title: string;
  companyName: string;
  website: string;
  location: Location;
  startDate: DateSimple;
  endDate: DateSimple;
  descriptions: string;
};
