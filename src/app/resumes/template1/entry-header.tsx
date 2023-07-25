import { Location } from "@/types/location-type";
import Link from "./link";
import { formatDate } from "@/utils/datetime-formatter";

type EntryProps = {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: Location;
  link: string;
};

export default function EntryHeader(props: EntryProps) {
  function buildLocation(location: Location) {
    return location.remote ? "Remote" : location.city + " " + location.country;
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
          {props.endDate ? formatDate(props.endDate) : "now"}
        </div>
        <div className="self-end">{buildLocation(props.location)}</div>
      </div>
    </div>
  );
}
