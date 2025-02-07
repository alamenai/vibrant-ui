"use client";

import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

const TypingBubbles = ({ className }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full",
        className
      )}
    >
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

export default TypingBubbles;
