"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TruthfulnessScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number; // 0 to 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function TruthfulnessScore({
  score,
  size = "md",
  showLabel = true,
  className,
  ...props
}: TruthfulnessScoreProps) {
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHeight = () => {
    switch (size) {
      case "sm":
        return "h-2";
      case "lg":
        return "h-4";
      default:
        return "h-3";
    }
  };

  return (
    <div className={cn("w-full max-w-[200px]", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1 font-medium">
          <span>Truthfulness Score</span>
          <span
            className={cn(
              score >= 80 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600"
            )}
          >
            {score}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-slate-100 rounded-full overflow-hidden ring-1 ring-black/5", getHeight())}>
        <div
          className={cn("h-full transition-all duration-700 ease-out", getProgressColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
