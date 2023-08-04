import { Location } from "@/types/location-type";
import Link from "./link";
import { formatDate } from "@/utils/datetime-formatter";
import { DateSimple } from "@/types/date-simple-type";

type EntryProps = {
  title: string;
  subtitle: string;
  startDate: DateSimple;
  endDate: DateSimple;
  location: Location;
  link: string;
};

export default function EntryHeader(props: EntryProps) {
  function buildLocation(location: Location) {
    if (location.remote) {
      return "Remote";
    }

    if (location.city && location.country) {
      return location.city + ", " + location.country;
    }

    return location.city || location.country;
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-1">
        <div className="font-medium">{props.title}</div>
        <Link href={props.link} target="_blank">
          {props.subtitle}
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          {formatDate(props.startDate)} -{" "}
          {props.endDate.year && props.endDate.month
            ? formatDate(props.endDate)
            : "now"}
        </div>
        <div className="self-end">{buildLocation(props.location)}</div>
      </div>
    </div>
  );
}
