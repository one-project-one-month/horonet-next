import React from "react";

export default function TextLoading({ length = 3 }: { length?: number }) {
  return (
    <span className="flex">
      {
        Array.from({ length }, (_, i) => (
          <span key={i} className="animate-caret-blink text-sm leading-10 text-background/50" style={{ animationDelay: `${i * 100}ms` }}>•</span>
        ))
      }
    </span>
  );
}
