import { Location } from "./location-type";

export type Work = {
  title: string;
  companyName: string;
  website: string;
  location: Location;
  startDate: Date | string;
  endDate: Date | string;
  descriptions: string[];
};
