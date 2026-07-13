import { useState, useEffect } from "react";
import Column from "./components/Column";
import { DndContext } from "@dnd-kit/core";
import "./App.css";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

const initialColumns = {
  todo: { id: "todo", title: "To Do", cardIds: ["1", "2"] },
  inProgress: { id: "inProgress", title: "In Progress", cardIds: [] },
  done: { id: "done", title: "Done", cardIds: [] },
};

const initialCards = {
  1: { id: "1", text: "Learn useState" },
  2: { id: "2", text: "Learn useEffect" },
};

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : initialColumns;
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : initialCards;
  });
  const [newCardText, setNewCardText] = useState("");

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return; // dropped outside any valid column

    const cardId = active.id;
    const targetColumnId = over.id;

    // Step 1: find which column currently holds this card
    const sourceColumn = Object.values(columns).find((col) =>
      col.cardIds.includes(cardId),
    );

    if (!sourceColumn || sourceColumn.id === targetColumnId) return; // no-op

    // Step 2 + 3: remove from source, add to target
    setColumns({
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        cardIds: sourceColumn.cardIds.filter((id) => id !== cardId),
      },
      [targetColumnId]: {
        ...columns[targetColumnId],
        cardIds: [...columns[targetColumnId].cardIds, cardId],
      },
    });
  }

  function handleDeleteCard(cardId) {
    // find which column currently holds this card
    const sourceColumn = Object.values(columns).find((col) =>
      col.cardIds.includes(cardId),
    );
    if (!sourceColumn) return;

    // remove the card's id from its column
    setColumns({
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        cardIds: sourceColumn.cardIds.filter((id) => id !== cardId),
      },
    });

    // remove the card itself from the cards lookup
    const updatedCards = { ...cards };
    delete updatedCards[cardId];
    setCards(updatedCards);
  }

  function handleAddCard() {
    if (newCardText.trim() === "") retunr;

    const id = String(Date.now());
    const newCard = { id, text: newCardText };

    setCards({ ...cards, [id]: newCard });

    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        cardIds: [...columns.todo.cardIds, id],
      },
    });

    setNewCardText("");
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <div className="flex items-center gap-2 mb-10 max-w-md">
        <input
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="What needs doing?"
          className="border border-ink/15 bg-white rounded-full px-4 py-2 text-sm font-body flex-1 focus:outline-none focus:ring-2 focus:ring-azure/40"
        />
        <button
          onClick={handleAddCard}
          className="bg-ink text-paper font-mono text-xs uppercase tracking-wider rounded-full px-5 py-2.5 hover:opacity-90 transition"
        >
          Add
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 flex-wrap">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cardIds={column.cardIds}
              cards={cards}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
