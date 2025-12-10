"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

interface IVideoPlayerProps {
  url: string;
  onReady?: () => void;
  onEnded?: () => void;
  className?: string;
}

export const VideoPlayer = ({
  url,
  onReady,
  className,
  onEnded,
}: IVideoPlayerProps) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  return (
    <div className="relative" style={{ paddingTop: "56.25%" }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        className={cn("absolute top-0 left-0", className)}
        controls
        onReady={onReady}
        onEnded={onEnded}
      />
    </div>
  );
};
