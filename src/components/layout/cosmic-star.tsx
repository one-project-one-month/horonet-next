import React, { useEffect, useRef } from "react";

export default function CosmicStar() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx)
      return;
    const { width, height } = { width: window.innerWidth, height: window.innerHeight };
    if (canvas.current) {
      ctx.clearRect(0, 0, width, height);
      canvas.current.width = width;
      canvas.current.height = height;
    }

    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${(Math.random() * 0.5) + 0.1})`;
      const { x, y } = { x: Math.random() * width, y: Math.random() * height };
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);
  return (
    <div className="fixed z-[-1] inset-0 overflow-hidden">
      <canvas ref={canvas} className="w-full min-h-dvh block object-cover">
      </canvas>
    </div>
  );
}
