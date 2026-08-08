"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Paintbrush, Download, Sparkles, RefreshCw } from "lucide-react";

export const StarlightCanvasSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#fbbf24");
  const [brushSize] = useState(6);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Guardar el dibujo actual si hay uno para no perderlo al girar el celular
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx && canvas.width > 0) {
      tempCtx.drawImage(canvas, 0, 0);
    }

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Fondo inicial
    ctx.fillStyle = "#0c0d1e";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Restaurar el dibujo si existía
    if (tempCanvas.width > 0) {
      ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
    }
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Add glowing sparkles around line
    if (Math.random() > 0.4) {
      const sparkleX = x + (Math.random() - 0.5) * 16;
      const sparkleY = y + (Math.random() - 0.5) * 16;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(sparkleX, sparkleY, 2, 2);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#0c0d1e";
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "dibujo-estelar-20-anos.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20"
        >
          Expresión Creativa
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-4xl sm:text-6xl font-bold text-white mt-4"
        >
        Tu Lienzo de Polvo de Estrellas
        </motion.h2>
        <p className="text-slate-300 max-w-xl mx-auto mt-3 font-light text-sm sm:text-base">
          Dibuja, escribe un deseo o deja tu huella dorada en este espacio estelar interactivo.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-white/10 relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {/* Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
          {/* Color Palette */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1 font-medium">
              <Paintbrush className="w-3.5 h-3.5 text-amber-400" /> Color:
            </span>
            {[
              { name: "Oro Puro", value: "#fbbf24" },
              { name: "Oro Rosa", value: "#fda4af" },
              { name: "Plata Estelar", value: "#cbd5e1" },
              { name: "Bronce Cálido", value: "#b45309" },
              { name: "Blanco Diamante", value: "#ffffff" },
            ].map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-7 h-7 rounded-full transition-transform cursor-pointer border ${
                  color === c.value
                    ? "scale-125 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={clearCanvas}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Borrar Lienzo
            </button>
            <button
              onClick={downloadCanvas}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition-colors cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <Download className="w-3.5 h-3.5" /> Guardar Dibujo
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative rounded-2xl overflow-hidden cursor-crosshair border border-white/10">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full h-[450px] touch-none block"
          />
        </div>
      </div>
    </section>
  );
};
