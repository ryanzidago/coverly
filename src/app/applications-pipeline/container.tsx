import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Sortable } from "@/components/dnd/sortable";

export default function Container({ id, applications, activeId, stage }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={applications}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col text-center gap-8">
        <div>{stage.title}</div>
        <div
          ref={setNodeRef}
          className="bg-slate-50 p-2 h-full text-center flex flex-col gap-8"
        >
          {applications.map((application) => (
            <Sortable
              key={application.id}
              id={application.id}
              data={{ stageId: application.stageId }}
            >
              <div
                className={
                  "bg-sky-400 rounded shadow-md px-2 py-4 " +
                  (application.id === activeId && "opacity-60")
                }
              >
                {application.organisation}
              </div>
            </Sortable>
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
