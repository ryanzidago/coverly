"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
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
  { id: 2, title: "First contact from recruiter / Application sent" },
  { id: 3, title: "HR / Recruiter phone screen" },
  { id: 4, title: "First interview round" },
  { id: 5, title: "Second interview round" },
  { id: 6, title: "Third interview round" },
  { id: 7, title: "Application declined" },
  { id: 8, title: "Offer received" },
  { id: 9, title: "Offer declined" },
  { id: 10, title: "Offer accepted" },
];

export default function Page() {
  const [parent, setParent] = useState(null);
  const [isDragging, setIsDragging] = useState(null);
  const [applications, setApplications] = useState(APPLICATIONS);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="grid grid-cols-10 gap-2">
        {STAGES.map((stage) => (
          // headers
          <div key={`header-${stage.id}`}>{stage.title}</div>
        ))}
        {STAGES.map((stage) => (
          // cells
          <div className={"grid border border-green-500 gap-2"} key={stage.id}>
            {applications.map((application) => (
              <div key={application.id} className="border border-red-500 h-10">
                <div>
                  <div className="">
                    {application.stageId === stage.id && (
                      <Draggable id={application.id}>
                        {application.organisation}
                      </Draggable>
                    )}

                    {application.stageId !== stage.id &&
                      application.id === isDragging && (
                        <Droppable
                          id={`droppable-${application.id}${stage.id}`}
                          data={{
                            stageId: stage.id,
                            applicationId: application.id,
                          }}
                        >
                          <div className="h-10"></div>
                        </Droppable>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    setIsDragging(null);
    const stageId = event.over?.data.current.stageId;
    const applicationId = event.over?.data.current.applicationId;

    const updatedApplications = applications.map((application) => {
      if (application.id === applicationId) {
        return { ...application, stageId: stageId };
      } else {
        return application;
      }
    });

    setApplications(updatedApplications);

    // if the item is dropped over a container,
    // set it as the parent
    // otherwise, reset the parent to null
    setParent(event.over?.id || null);
  }

  function handleDragStart(event) {
    setIsDragging(event.active.id);
  }
}
