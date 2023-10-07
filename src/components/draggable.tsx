import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: props.id,
      data: props.data,
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={props.className + (isDragging ? " z-1" : "")}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
