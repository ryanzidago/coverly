"use client";

import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Draggable } from "@/components/draggable";
import { Droppable } from "@/components/droppable";

const APPLICATIONS = [
  { id: 1, organisation: "Amazon", stageId: 8 },
  { id: 2, organisation: "Meta", stageId: 1 },
  { id: 3, organisation: "Datadog", stageId: 5 },
  { id: 4, organisation: "Klarna", stageId: 2 },
  { id: 5, organisation: "Stripe", stageId: 4 },
  { id: 6, organisation: "Airbnb", stageId: 2 },
  { id: 7, organisation: "Twitter", stageId: 7 },
  { id: 8, organisation: "Google", stageId: 3 },
  { id: 9, organisation: "Microsoft", stageId: 8 },
  { id: 10, organisation: "Zapier", stageId: 1 },
  { id: 11, organisation: "Flexport", stageId: 1 },
];

const STAGES = [
  { id: 1, title: "Backlog" },
  { id: 2, title: "First contact" },
  { id: 3, title: "Phone screen" },
  { id: 4, title: "1st interview round" },
  { id: 5, title: "2nd interview round" },
  { id: 6, title: "3rd interview round" },
  { id: 7, title: "Application declined" },
  { id: 8, title: "Offer received" },
  { id: 9, title: "Offer declined" },
  { id: 10, title: "Offer accepted" },
];

export default function Page() {
  const [applications, setApplications] = useState(APPLICATIONS);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-10 gap-4 text-sm text-center">
        {STAGES.map((stage) => (
          // headers
          <div key={`header-${stage.id}`}>{stage.title}</div>
        ))}

        {STAGES.map((stage) => (
          // columns
          <Droppable
            data={{ stageId: stage.id }}
            className={"grid gap-2 shadow rounded p-4 "}
            key={stage.id}
            id={`droppable-stage-${stage.id}`}
          >
            {applications
              .filter((application) => application.stageId == stage.id)
              .map((application) => {
                // cells / application cards
                return (
                  <Draggable
                    data={{ applicationId: application.id }}
                    id={`draggable-application-${application.id}`}
                    key={application.id}
                    className={"shadow w-full rounded bg-sky-400 h-20"}
                  >
                    {application.organisation}
                  </Draggable>
                );
              })}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log(event);

    const stageId = event.over?.data.current.stageId;
    const applicationId = event.active.data.current.applicationId;

    const updatedApplications = applications.map((application) => {
      if (application.id === applicationId) {
        return { ...application, stageId: stageId };
      } else {
        return application;
      }
    });

    setApplications(updatedApplications);
  }
}
