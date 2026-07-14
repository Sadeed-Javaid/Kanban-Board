// import { useDraggable } from "@dnd-kit/core";

// function Card({ id, text, accent, onDelete }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

//   const style = {
//     borderLeftColor: accent,
//     ...(transform && {
//       transform: `translate(${transform.x}px, ${transform.y}px)`,
//     }),
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className="bg-paper border-l-4 rounded-md shadow-sm p-3 text-sm text-ink font-body cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow flex items-center justify-between gap-2"
//     >
//       <span>{text}</span>
//       {onDelete && (
//         <button
//           onPointerDown={(e) => e.stopPropagation()}
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete();
//           }}
//           className="text-ink/30 hover:text-coral text-xs shrink-0"
//         >
//           ✕
//         </button>
//       )}
//     </div>
//   );
// }

// export default Card;


import { useDraggable } from '@dnd-kit/core';

function Card({ id, text, accent, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    ...(transform && { transform: `translate(${transform.x}px, ${transform.y}px)` }),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-paper rounded-2xl border border-ink/10 p-4 text-sm text-ink font-body cursor-grab active:cursor-grabbing hover:shadow-md hover:border-ink/20 transition-shadow flex items-start justify-between gap-3"
    >
      <div className="flex items-start gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: accent }}
        />
        <span className="leading-relaxed">{text}</span>
      </div>
      {onDelete && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
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