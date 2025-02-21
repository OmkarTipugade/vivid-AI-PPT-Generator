import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import React from "react";

type Props = {
  slide: Slide;
  theme: Theme;
};
const ThumbnailPreview = ({ slide, theme }: Props) => {
  // WIP : Add the preview of slides
  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          {/* This is slide */}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
            <Image className="w-6 h-6 text-gray-50"/>
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
