import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  // TODO(Ryan): provide unique id to droppable component
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });

  return (
    <div
      ref={setNodeRef}
      className={
        props.className +
        " transition duration-800 ease-in-out" +
        (isOver ? " bg-sky-100" : "")
      }
    >
      {props.children}
    </div>
  );
}
