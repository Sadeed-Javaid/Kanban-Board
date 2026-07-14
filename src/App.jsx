import { useState, useEffect, useRef } from "react";
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

  const taskInputRef = useRef(null);

  function scrollToTaskInput() {
    taskInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    taskInputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div>
      <Navbar onStartTask={scrollToTaskInput} />
      <Hero onStartTask={scrollToTaskInput} />
      <HowItWorks />
      {/* <div className="flex flex-col justify-center items-center">
        <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-5 my-10 max-w-xl">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/40">
            New task
          </label>

          <textarea
            ref={taskInputRef}
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              }
            }}
            placeholder="What needs doing?"
            rows={3}
            className="w-full mt-2 resize-none border-none bg-transparent text-ink font-body text-base leading-relaxed focus:outline-none placeholder:text-ink/30"
          />

          <div className="flex justify-between items-center mt-3 gap-2 pt-3 border-t border-ink/10">
            <span className="font-mono text-xs text-ink/30">
              Enter to add · Shift+Enter for a new line
            </span>
            <button
              onClick={handleAddCard}
              className="bg-coral text-white font-mono text-xs uppercase tracking-wider rounded-full px-6 py-2.5 hover:opacity-90 active:scale-95 transition"
            >
              Add task
            </button>
          </div>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-5 flex-wrap mb-10 ">
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
      </div> */}
      <section id="board" className="relative bg-paper overflow-hidden">
        {/* colorful ambient blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-azure/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-moss/25 rounded-full blur-3xl" />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #17203A14 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 py-20 relative">
          <div className="text-center mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-moss bg-moss/10 border border-moss/30 rounded-full px-3 py-1">
              Your workspace
            </span>
            <h2 className="font-display text-4xl font-semibold text-ink mt-4">
              Today's board
            </h2>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-5 my-10 max-w-xl">
              <label className="font-mono text-xs uppercase tracking-wider text-ink/40">
                New task
              </label>

              <textarea
                ref={taskInputRef}
                value={newCardText}
                onChange={(e) => setNewCardText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddCard();
                  }
                }}
                placeholder="What needs doing?"
                rows={3}
                className="w-full mt-2 resize-none border-none bg-transparent text-ink font-body text-base leading-relaxed focus:outline-none placeholder:text-ink/30"
              />

              <div className="flex justify-between items-center mt-3 gap-2 pt-3 border-t border-ink/10">
                <span className="font-mono text-xs text-ink/30">
                  Enter to add · Shift+Enter for a new line
                </span>
                <button
                  onClick={handleAddCard}
                  className="bg-coral text-white font-mono text-xs uppercase tracking-wider rounded-full px-6 py-2.5 hover:opacity-90 active:scale-95 transition"
                >
                  Add task
                </button>
              </div>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
              <div className="flex gap-5 flex-wrap mb-10">
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
        </div>
      </section>
    </div>
  );
}

export default App;
