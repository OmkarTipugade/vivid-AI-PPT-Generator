"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAiStore from "@/store/useCreativeAiStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardList from "../common/card-list";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./recent-prompts";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/chatgpt";

type Props = {
  onBack: () => void;
};
const CreativeAI = ({ onBack }: Props) => {
  const router = useRouter();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const {prompts, addPrompt} = usePromptStore();
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAiStore();
  const [noOfCards, setNoOfCards] = useState(0);

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutlines = async() => {
    if(currentAiPrompt == "") {
      toast.error("Error", {
        description: "Please enter a prompt to generate an outline",
      });
      return;
    }
    setIsGenerating(true);
    const res = await generateCreativePrompt(currentAiPrompt);
    //WIP: use openAi and complete this stuf
  };
  const handleGenerateOutlines = () => {};
  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant={"outline"} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <motion.div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would like to create today?</p>
      </motion.div>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            placeholder="Enter Prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:right-0 shadow-none p-0 bg-transparent flex-grow"
            required
            value={currentAiPrompt || ""}
            onChange={(event) => {
              setCurrentAiPrompt(event.target.value);
            }}
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-full gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, id) => id + 1
                  ).map((num) => {
                    return (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="font-semibold"
                      >
                        {num} {num == 1 ? "Card" : "Cards"}
                      </SelectItem>
                    );
                  })
                )}
              </SelectContent>
            </Select>
            <Button
              variant={"destructive"}
              onClick={resetCards}
              size={"icon"}
              aria-label="Reset Cards"
              className="p-1"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutlines}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="animate-spin mr-2">Generating...</Loader2>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines.length > 0 && (
        <Button
          className="w-full"
          // onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <React.Fragment>
              <Loader2 className="animate-spin mr-2" />
              Generating...
            </React.Fragment>
          ) : (
            'Generate'
          )}
        </Button>
      )}
      {prompts.length > 0 &&<RecentPrompts/>}
    </motion.div>
  );
};

export default CreativeAI;
