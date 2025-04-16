"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  rotate: number;
}

interface InteractiveGridProps {
  className?: string;
  containerClassName?: string;
  points?: number;
}

export function InteractiveGrid({
  className = "",
  containerClassName = "",
  points = 40,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      return { width, height };
    };

    const initPoints = () => {
      const { width, height } = resizeCanvas();
      const cols = Math.floor(Math.sqrt(points));
      const rows = Math.floor(points / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      pointsRef.current = Array.from({ length: points }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = cellWidth * col + cellWidth / 2;
        const y = cellHeight * row + cellHeight / 2;
        const angle = Math.random() * Math.PI * 2;

        return {
          x,
          y,
          translateX: 0,
          translateY: 0,
          minX: cellWidth * col,
          minY: cellHeight * row,
          maxX: cellWidth * (col + 1),
          maxY: cellHeight * (row + 1),
          rotate: angle,
        };
      });
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      pointsRef.current.forEach((point) => {
        const distance = Math.sqrt(
          Math.pow(mousePosition.current.x - point.x, 2) +
            Math.pow(mousePosition.current.y - point.y, 2),
        );
        const maxDistance = 120;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.2;
          const angle = Math.atan2(
            mousePosition.current.y - point.y,
            mousePosition.current.x - point.x,
          );
          point.translateX = Math.cos(angle) * force * 20;
          point.translateY = Math.sin(angle) * force * 20;
          point.rotate = angle;
        } else {
          point.translateX *= 0.8;
          point.translateY *= 0.8;
        }

        ctx.save();
        ctx.translate(point.x + point.translateX, point.y + point.translateY);
        ctx.rotate(point.rotate);
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(4, 0);
        ctx.stroke();
        ctx.restore();
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    initPoints();
    draw();
    window.addEventListener("resize", initPoints);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", initPoints);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [points]);

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
    </div>
  );
}
