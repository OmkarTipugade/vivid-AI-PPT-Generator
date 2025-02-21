import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (event: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHanders: {
    onDragStart: (event: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (event: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};
const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHanders,
  onDragOver,
  dragOverStyles,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      <div
        draggable
        onDragOver={onDragOver}
        style={dragOverStyles}
        {...dragHanders}
      >
        <UICard
          className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90  ${
            isEditing || isSelected ? "border-primary bg-transparent" : ""
          }`}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex justify-between items-center">
            {isEditing ? (
              <input
                ref={inputRef}
                value={editText}
                className="text-base sm:text-lg"
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                onChange={(event) => onEditChange(event.target.value)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary-20 ${
                    isEditing || isSelected
                      ? "bg-secondary-90 dark:text-black"
                      : ""
                  }`}
                >
                  {card.order}
                </span>
                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={(event) => {
                event.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
