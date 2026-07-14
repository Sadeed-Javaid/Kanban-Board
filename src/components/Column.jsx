// import { useDroppable } from "@dnd-kit/core";
// import Card from "./Card";

// const columnStyles = {
//   todo: { accent: "#E3A33E", label: "text-amber", border: "border-t-amber" },
//   inProgress: {
//     accent: "#3E7CB1",
//     label: "text-azure",
//     border: "border-t-azure",
//   },
//   done: { accent: "#4C9A6A", label: "text-moss", border: "border-t-moss" },
// };

// function Column({ id, title, cardIds, cards, onDeleteCard }) {
//   const { setNodeRef } = useDroppable({ id });
//   const style = columnStyles[id] ?? columnStyles.todo;

//   return (
//     <div
//       ref={setNodeRef}
//       className={`bg-white rounded-xl border-t-4 ${style.border} shadow-sm p-4 w-72 flex flex-col gap-3`}
//     >
//       <div className="flex items-center justify-between">
//         <h2 className="font-display font-semibold text-ink">{title}</h2>
//         <span className={`font-mono text-xs ${style.label}`}>
//           {cardIds.length}
//         </span>
//       </div>

//       {cardIds.length === 0 && (
//         <p className="font-mono text-xs text-ink/30 border border-dashed border-ink/15 rounded-lg py-6 text-center">
//           Nothing here yet
//         </p>
//       )}

//       {cardIds.map((cardId) => (
//         <Card
//           key={cardId}
//           id={cardId}
//           text={cards[cardId].text}
//           accent={style.accent}
//           onDelete={id === "done" ? () => onDeleteCard(cardId) : null}
//         />
//       ))}
//     </div>
//   );
// }

// export default Column;


import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";

const columnStyles = {
  todo: { accent: "#E3A33E", label: "text-amber" },
  inProgress: { accent: "#3E7CB1", label: "text-azure" },
  done: { accent: "#4C9A6A", label: "text-moss" },
};

function Column({ id, title, cardIds, cards, onDeleteCard }) {
  const { setNodeRef } = useDroppable({ id });
  const style = columnStyles[id] ?? columnStyles.todo;

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-2xl shadow-sm border border-ink/10 p-5 w-72 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between pb-3 border-b border-ink/10">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: style.accent }}
          />
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink/60">
            {title}
          </h2>
        </div>
        <span className={`font-mono text-xs ${style.label}`}>{cardIds.length}</span>
      </div>

      {cardIds.length === 0 && (
        <p className="font-mono text-xs text-ink/30 border border-dashed border-ink/15 rounded-xl py-6 text-center">
          Nothing here yet
        </p>
      )}

      {cardIds.map((cardId) => (
        <Card
          key={cardId}
          id={cardId}
          text={cards[cardId].text}
          accent={style.accent}
          onDelete={id === "done" ? () => onDeleteCard(cardId) : null}
        />
      ))}
    </div>
  );
}

export default Column;