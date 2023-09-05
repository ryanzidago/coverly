import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Sortable } from "@/components/dnd/sortable";
import { SortableKind } from "./page";

import Card from "./card";
import { Application } from "@/types/application-type";
import { Stage } from "@/types/stage-type";

type StageProps = {
  id: number;
  activeStageId?: number | null;
  activeApplicationId?: number | null;
  applications: Application[];
  stage: Stage;
};

export default function Stage({
  id,
  activeStageId,
  applications,
  activeApplicationId,
  stage,
}: StageProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={applications}
      strategy={verticalListSortingStrategy}
    >
      <div
        className={
          "flex flex-col text-center gap-8 h-96 w-32 " +
          (stage.id === activeStageId ? "opacity-50" : "")
        }
      >
        <div>{stage.title}</div>
        <div
          ref={setNodeRef}
          className="bg-slate-50 h-96 p-2 text-center flex flex-col gap-8"
        >
          {applications
            .slice()
            .filter((application) => application.stageId === stage.id)
            .sort((a, b) => {
              if (a.organisation < b.organisation) return -1;
              if (a.organisation > b.organisation) return 1;
              return 0;
            })
            .map((application) => (
              <Sortable
                key={application.id}
                id={application.id}
                data={{
                  stageId: application.stageId,
                  sortableKind: SortableKind.Application,
                }}
              >
                <Card
                  application={application}
                  overlay={application.id === activeApplicationId}
                />
              </Sortable>
            ))}
        </div>
      </div>
    </SortableContext>
  );
}
