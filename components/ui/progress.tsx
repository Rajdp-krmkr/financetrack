"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const safeValue = Math.min(Math.max(value, 0), max); // Ensure value is between 0 and max
    const progressWidth = (safeValue / max) * 100; // Convert value to percentage

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
