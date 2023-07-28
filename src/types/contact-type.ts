import { PhoneNumber } from "./phone-number-type";
import { Location } from "./location-type";

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
  label: string;
  phoneNumber: PhoneNumber;
  website: string;
};
