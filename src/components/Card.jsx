import { useDraggable } from '@dnd-kit/core';

function Card({ id, text, accent, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    borderLeftColor: accent,
    ...(transform && { transform: `translate(${transform.x}px, ${transform.y}px)` }),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-paper border-l-4 rounded-md shadow-sm p-3 text-sm text-ink font-body cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow flex items-center justify-between gap-2"
    >
      <span>{text}</span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-ink/30 hover:text-coral text-xs shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Card;