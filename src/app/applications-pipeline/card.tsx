import { Application } from "@/types/application-type";

type CardProps = {
  application: Application;
  overlay?: boolean;
};

export default function Card({ application, overlay }: CardProps) {
  return (
    <div
      className={
        "bg-sky-400 rounded shadow-md px-2 py-4 text-center " +
        (overlay && "opacity-60")
      }
    >
      {application.organisation}
    </div>
  );
}
