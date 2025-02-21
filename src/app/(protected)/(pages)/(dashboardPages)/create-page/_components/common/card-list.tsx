"use client";
import { OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Card from "./Card";
import { title } from "process";
import AddCardButton from "./add-card-button";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  addOutline,
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  const handleOnDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };

  const handleOnDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!draggedItem || dragOverIndex === null) {
      return;
    }
    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id
    );

    if(dragOverIndex===-1 || draggedIndex===dragOverIndex) {
        return;
    }
    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
        dragOverIndex > draggedIndex? dragOverIndex-1 : dragOverIndex,0, removedCard
    )
    addMultipleOutlines(updatedCards.map((Card, id)=>({...Card, order: id+1})))
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const onCardUpdate = (id: string, newTitle: string) =>{
    addMultipleOutlines(outlines.map((card)=> card.id? {...card, title: newTitle}:card));
    setEditingCard(null);
    setSelectedCard(null);
    setEditText('');
  };

  const onDeleteClick = (id: string) => {
    addMultipleOutlines(outlines.filter((card)=>card.id !==id).map((card,index)=>({...card,order: index+1})));
  }

  const onDragStart =(event: React.DragEvent, card: OutlineCard) => {
    setDraggedItem(card);
    event.dataTransfer.effectAllowed = 'move';

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = event.clientY-rect.top;

    const draggedElement = event.currentTarget as HTMLElement;
    draggedElement.style.position = 'absolute';
    draggedElement.style.top= '-1000px';
    draggedElement.style.opacity= '0.8'
    draggedElement.style.width = `${(event.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(draggedElement);
    event.dataTransfer.setDragImage(draggedElement, 0, dragOffsetY.current)

    setTimeout(()=>{
      setDragOverIndex(outlines.findIndex((c)=>c.id === card.id));
      document.body.removeChild(draggedElement);
    },0)
  }

  const onDragEnd =()=> {
    setDraggedItem(null);
    setDragOverIndex(null);
  }

  const getDragOverStyles = (cardIndex: number) => {
    if(dragOverIndex===null || draggedItem==null) return{};

    if(cardIndex===dragOverIndex ||cardIndex===dragOverIndex-1) {
      return {
        borderTop: '2px solid #000',
        marginTop: '0.5rem',
        transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }
    } 

    return {}
  }
  return (
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(event) => {
        event.preventDefault();
        if (
          outlines.length === 0 ||
          event.clientY >
            event.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          handleOnDragOver(event, outlines.length);
        }
      }}
      onDrop={() => {}}
    >
        <AnimatePresence>
            {outlines.map((card,id)=><React.Fragment key={card.id}>
                <Card
                    onDragOver={(event)=> handleOnDragOver(event, id)}
                    card={card}
                    isEditing={editingCard === card.id}
                    isSelected={selectedCard === card.id}
                    editText={editText}
                    onEditChange={onEditChange}
                    onEditBlur={()=>{onCardUpdate(card.id,editText)}}
                    onEditKeyDown={(event)=> {
                        if(event.key === 'Enter') {
                            onCardUpdate(card.id,editText);
                        }}
                    }
                    onCardClick={() => onCardSelect(card.id)}
                    onCardDoubleClick={()=>onCardDoubleClick(card.id, card.title)}
                    onDeleteClick={()=>onDeleteClick(card.id)}
                    dragHanders={{
                        onDragStart: (event) =>
                            onDragStart(event,card)
                        ,
                        onDragEnd:onDragEnd,
                    }}
                    dragOverStyles={getDragOverStyles(id)}
                />
                <AddCardButton
                //  onAddCard={()=>onAddCard(index)}
                 />
            </React.Fragment>)}
        </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
