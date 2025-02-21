"use client";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThumbnailPreview from "./thumbnai-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../dialog-box";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  themeName: string;
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted: boolean;
  slideData: JsonValue;
};
const ProjectCard = ({
  themeName,
  projectId,
  title,
  createdAt,
  isDeleted,
  slideData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { setSlides } = useSlideStore();
  const theme = themes.find((theme) => theme.name === themeName || themes[0]);

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found.",
      });
      return;
    }

    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong.",
        });
        setLoading(false);
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: " Project recovered successfully.",
      });
    } catch (error) {
      console.error("ERROR", error);
      toast.error("Oppse!", {
        description: "Something went wrong. Please contact support.",
      });
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found.",
      });
      return;
    }

    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Failed to delete project.",
        });
        setLoading(false);
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully.",
      });
    } catch (error) {
      console.error("ERROR", error);
      toast.error("Oppse!", {
        description: "Something went wrong. Please contact support.",
      });
      setLoading(false);
    }
  };
  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview
          theme={theme}
          // WIP: Add slide data
          // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}This is the title of the my created project
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and recover your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  disabled={loading}
                  className="bg-background-80 dark:bg-background-90"
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and send to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  disabled={loading}
                  className="bg-background-80 dark:bg-background-90"
                >
                  Delete
                </Button>
              </AlertDialogBox>
           )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
