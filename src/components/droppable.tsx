import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  // TODO(Ryan): provide unique id to droppable component
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });

  return (
    <div ref={setNodeRef} className={isOver ? "opacity-25" : undefined}>
      {props.children}
    </div>
  );
}
