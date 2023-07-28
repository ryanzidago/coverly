import { DateSimple } from "./date-simple";
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
