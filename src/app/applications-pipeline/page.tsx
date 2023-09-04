"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  getClientRect,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./container";

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

const APPLICATIONS = [
  { id: 11, organisation: "Amazon", stageId: 8 },
  { id: 22, organisation: "Meta", stageId: 1 },
  { id: 33, organisation: "Datadog", stageId: 5 },
  { id: 44, organisation: "Klarna", stageId: 2 },
  { id: 55, organisation: "Stripe", stageId: 4 },
  { id: 66, organisation: "Airbnb", stageId: 2 },
  { id: 77, organisation: "Twitter", stageId: 7 },
  { id: 88, organisation: "Google", stageId: 3 },
  { id: 99, organisation: "Microsoft", stageId: 8 },
  { id: 100, organisation: "Zapier", stageId: 1 },
  { id: 111, organisation: "Flexport", stageId: 1 },
];

export default function Page() {
  const [stages, setStages] = useState(STAGES);
  const [applications, setApplications] = useState(APPLICATIONS);
  const [activeId, setActiveId] = useState<null | number>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function activeApplicationCard(id) {
    const application = findApplication(id);

    console.log("activeApplication", application);

    return (
      <div className="bg-sky-400 rounded shadow-2xl px-2 py-4 flex flex-col text-center">
        {application?.organisation}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        className={
          "text-xs w-full overflow-scroll " +
          `grid grid-cols-${stages.length} gap-8`
        }
      >
        {stages.map((stage) => (
          <Container
            key={stage.id}
            id={stage.id}
            stage={stage}
            activeId={activeId}
            applications={applications.filter(
              (application) => application.stageId === stage.id,
            )}
          />
        ))}
        <DragOverlay>{activeId && activeApplicationCard(activeId)}</DragOverlay>
      </div>
    </DndContext>
  );

  function findStage(stageId) {
    return stages.find((stage) => stage.id === stageId);
  }

  function findApplication(applicationId) {
    return applications.find((application) => application.id === applicationId);
  }

  function handleDragStart(event: DragStartEvent) {
    const activeId = event.active.id;
    console.log(event.active.id);
    setActiveId(activeId);
  }

  function handleDragOver(event: DragOverEvent) {
    // here, active and over are always the applications being moved
    const { active, over } = event;

    const activeStage = findStage(active?.data?.current?.stageId);
    // sometimes over.data.current.stageId is undefined
    const overStage =
      findStage(over?.data?.current?.stageId) || findStage(over.id);
    const activeApplication = findApplication(active.id);
    const overApplication = findApplication(over?.id);

    if (!activeStage) {
      return;
    }

    if (!overStage) {
      return;
    }

    if (activeStage.id === overStage.id) {
      return;
    }

    setStages((prevStages) => {
      return prevStages.concat([]);
    });

    setApplications((prevApplications) => {
      const updatedApplications = prevApplications.map((application) => {
        if (application.id === activeApplication.id) {
          return {
            ...application,
            stageId: overStage.id,
          };
        }
        return application;
      });

      return updatedApplications;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
  }

  function handleDragCancel(event: DragCancelEvent) {
    setActiveId(null);
  }
}
