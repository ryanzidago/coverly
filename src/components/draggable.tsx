import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
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
      className="z-20"
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
