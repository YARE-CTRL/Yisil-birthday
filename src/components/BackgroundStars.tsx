"use client";

import React, { useEffect, useRef } from "react";

export const BackgroundStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const generateStars = (w: number, h: number) =>
      Array.from({ length: Math.floor((w * h) / 3000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        gold: Math.random() > 0.7,
      }));

    let stars = generateStars(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = generateStars(width, height);
    };

    window.addEventListener("resize", handleResize);
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Ease mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep space gradient
      const bgGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGradient.addColorStop(0, "rgba(23, 20, 50, 0.6)");
      bgGradient.addColorStop(0.5, "rgba(12, 11, 28, 0.85)");
      bgGradient.addColorStop(1, "rgba(6, 6, 14, 0.98)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render & update stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }

        // Parallax effect based on mouse position
        const offsetX = (mouse.x - width / 2) * (star.size * 0.02);
        const offsetY = (mouse.y - height / 2) * (star.size * 0.02);

        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.size, 0, Math.PI * 2);

        if (star.gold) {
          ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0.1, star.alpha)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(251, 191, 36, 0.8)";
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, star.alpha)})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
