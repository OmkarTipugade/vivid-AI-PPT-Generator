import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Prompt = {
  id: string;
  title: string;
  createdAt: string;
  outlines: OutlineCard[] | [];
};
type page = "create" | "creative-ai" | "create-scratch";
type PromptStore = {
  page: page;
  setPage: (page: page) => void;
  prompts: Prompt[] | [];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
};
const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: "create",
        setPage: (page: page) => {
          set({ page });
        },
        prompts: [],
        addPrompt: (prompt: Prompt) =>
          set((state) => ({ prompt, prompts: [prompt,...state.prompts] })),
        removePrompt: (id: string) => {
          set((state) => ({
            prompts: state.prompts.filter((prompt) => prompt.id !== id),
          }));
        },
      }),
      { name: "prompts" }
    )
  )
);

export default usePromptStore;
