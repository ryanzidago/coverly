import Link from "./link";

type EntryProps = {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  link: string;
};

export default function EntryHeader(props: EntryProps) {
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
          {props.startDate} - {props.endDate}
        </div>
        <div className="self-end">{props.location}</div>
      </div>
    </div>
  );
}
