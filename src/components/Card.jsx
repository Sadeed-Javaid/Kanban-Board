import { useDraggable } from '@dnd-kit/core';

function Card({ id, text }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white rounded-md shadow p-3 text-sm text-gray-800 cursor-grab"
    >
      {text}
    </div>
  );
}

export default Card;