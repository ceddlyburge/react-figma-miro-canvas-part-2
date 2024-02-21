import { DndContext, useDroppable } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import { Card } from "./App";
import { Draggable } from "./Draggable";

export const Canvas = ({
  cards,
  setCards,
}: {
  cards: Card[];
  setCards: (cards: Card[]) => void;
}) => {
  const saveDragEndPosition = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    setCards(
      cards.map((card) => {
        if (card.id === active.id) {
          return {
            ...card,
            coordinates: {
              x: card.coordinates.x + delta.x,
              y: card.coordinates.y + delta.y,
            },
          };
        }
        return card;
      })
    );
  };

  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      className="canvas"
      style={{
        position: "relative",
        height: "300px",
      }}
      ref={setNodeRef}
    >
      <DndContext onDragEnd={saveDragEndPosition}>
        {cards.map((card) => (
          <Draggable card={card} key={card.id} />
        ))}
      </DndContext>
    </div>
  );
};
