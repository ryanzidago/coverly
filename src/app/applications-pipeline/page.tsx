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

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { Sortable } from "@/components/dnd/sortable";

import Container from "./container";

const STAGES = [
  { id: 1, position: 2, title: "Backlog" },
  { id: 2, position: 1, title: "First contact" },
  { id: 3, position: 3, title: "Phone screen" },
  { id: 4, position: 4, title: "1st interview round" },
  { id: 5, position: 5, title: "2nd interview round" },
  { id: 6, position: 6, title: "3rd interview round" },
  { id: 7, position: 7, title: "Application declined" },
  { id: 8, position: 8, title: "Offer received" },
  { id: 9, position: 9, title: "Offer declined" },
  { id: 10, position: 10, title: "Offer accepted" },
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

export enum SortableKind {
  Stage,
  Application,
}

export default function Page() {
  const [stages, setStages] = useState(STAGES);
  const [applications, setApplications] = useState(APPLICATIONS);
  const [activeApplicationId, setActiveApplicationId] = useState(null);
  const [activeStageId, setActiveStageId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    setStages((prevStages) => {
      return prevStages.slice().sort((a, b) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
      });
    });
  }, []);

  function activeApplicationCard(id) {
    const application = findApplication(id);

    return (
      <div className="bg-sky-400 rounded shadow-2xl px-2 py-4 flex flex-col text-center">
        {application?.organisation}
      </div>
    );
  }

  function activeStageCard(id) {
    const stage = findStage(id);
    return (
      <div className="flex flex-col text-center gap-8 0 h-96">
        <div>{stage.title}</div>
        <div className="bg-slate-50 h-96 p-2 text-center flex flex-col gap-8">
          {applications
            .filter((application) => application.stageId === stage.id)
            .map((application) => (
              <Sortable
                key={application.id}
                id={application.id}
                data={{
                  stageId: application.stageId,
                  sortableKind: SortableKind.Application,
                }}
              >
                <div className={"bg-sky-400 rounded shadow-md px-2 py-4"}>
                  {application.organisation}
                </div>
              </Sortable>
            ))}
        </div>
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
      <SortableContext items={stages} strategy={horizontalListSortingStrategy}>
        <div
          className={
            "text-xs w-full overflow-scroll " +
            `grid grid-cols-${stages.length} gap-8`
          }
        >
          {stages.map((stage) => (
            <Sortable
              key={stage.id}
              id={stage.id}
              data={{ stageId: stage.id, sortableKind: SortableKind.Stage }}
            >
              <Container
                id={stage.id}
                stage={stage}
                activeStageId={activeStageId}
                activeApplicationId={activeApplicationId}
                applications={applications.filter(
                  (application) => application.stageId === stage.id,
                )}
              />
            </Sortable>
          ))}
          <DragOverlay>
            {activeApplicationId && activeApplicationCard(activeApplicationId)}
            {activeStageId && activeStageCard(activeStageId)}
          </DragOverlay>
        </div>
      </SortableContext>
    </DndContext>
  );

  function findStage(stageId) {
    return stages.find((stage) => stage.id === stageId);
  }

  function findApplication(applicationId) {
    return applications.find((application) => application.id === applicationId);
  }

  function handleDragStart(event: DragStartEvent) {
    const sortableKind = event?.active?.data?.current?.sortableKind;

    if (sortableKind === SortableKind.Stage) {
      handleStageDragStart(event);
    }

    if (sortableKind === SortableKind.Application) {
      handleApplicationDragStart(event);
    }
  }

  function handleStageDragStart(event) {
    const activeStageId = event.active.id;
    setActiveStageId(activeStageId);
  }

  function handleApplicationDragStart(event) {
    const activeApplicationId = event.active.id;
    setActiveApplicationId(activeApplicationId);
  }

  function handleDragOver(event: DragOverEvent) {
    const sortableKind = event?.active?.data?.current?.sortableKind;

    if (sortableKind === SortableKind.Application) {
      handleApplicationDragOver(event);
    }

    if (sortableKind === SortableKind.Stage) {
      handleStageDragOver(event);
    }
  }

  function handleStageDragOver(event) {
    const { active, over } = event;
    const activeStage = findStage(active.id);
    const overStage = findStage(over.id);
    if (!activeStage || !overStage || activeStage.id == overStage.id) {
      return;
    }
    const activeStagePosition = activeStage.position;
    const overStagePosition = overStage.position;
    setStages((prevStages) => {
      return prevStages
        .slice()
        .map((stage) => {
          if (stage.id === activeStage.id) {
            return { ...activeStage, position: overStagePosition };
          }
          if (stage.id === overStage.id) {
            return { ...overStage, position: activeStagePosition };
          }
          return stage;
        })
        .sort((a, b) => {
          if (a.position < b.position) return -1;
          if (a.position > b.position) return 1;
          return 0;
        });
    });
  }

  function handleApplicationDragOver(event) {
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

    setApplications((prevApplications) => {
      const updatedApplications = prevApplications.map((application) => {
        if (application.id === activeApplication?.id) {
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
    const sortableKind = event?.active?.data?.current?.sortableKind;

    if (sortableKind === SortableKind.Application) {
      handleApplicationDragEnd(event);
    }

    if (sortableKind === SortableKind.Stage) {
      handleStageDragEnd(event);
    }
  }

  function handleApplicationDragEnd(event) {
    setActiveApplicationId(null);
  }

  function handleStageDragEnd(event) {
    setActiveStageId(null);
    // const { active, over } = event;
    // const activeStage = findStage(active.id);
    // const overStage = findStage(over.id);
    // if (!activeStage || !overStage || activeStage.id == overStage.id) {
    //   return;
    // }
    // const activeStagePosition = activeStage.position;
    // const overStagePosition = overStage.position;
    // setStages((prevStages) => {
    //   return prevStages
    //     .map((stage) => {
    //       if (stage.id === activeStage.id) {
    //         return { ...activeStage, position: overStagePosition };
    //       }
    //       if (stage.id === overStage.id) {
    //         return { ...overStage, position: activeStagePosition };
    //       }
    //       return stage;
    //     })
    //     .sort((a, b) => {
    //       if (a.position < b.position) return -1;
    //       if (a.position > a.position) return 1;
    //       return 0;
    //     });
    // });
  }

  function handleDragCancel(event: DragCancelEvent) {
    setActiveApplicationId(null);
    setActiveStageId(null);
  }
}
