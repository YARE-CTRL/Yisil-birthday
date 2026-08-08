"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayData } from "@/config/birthdayData";

interface WelcomeGateProps {
  onEnter: () => void;
}

// Posiciones fijas para las partículas — definidas fuera del componente
// para evitar el hydration mismatch (Math.random() difiere entre servidor y cliente)
const PARTICLE_POSITIONS = [
  { left: "12%", top: "18%" }, { left: "78%", top: "22%" },
  { left: "35%", top: "70%" }, { left: "62%", top: "55%" },
  { left: "90%", top: "40%" }, { left: "20%", top: "85%" },
  { left: "55%", top: "15%" }, { left: "45%", top: "90%" },
  { left: "8%",  top: "50%" }, { left: "70%", top: "80%" },
  { left: "30%", top: "35%" }, { left: "85%", top: "65%" },
  { left: "50%", top: "48%" }, { left: "15%", top: "60%" },
  { left: "95%", top: "12%" }, { left: "40%", top: "25%" },
  { left: "68%", top: "38%" }, { left: "25%", top: "78%" },
  { left: "80%", top: "88%" }, { left: "58%", top: "72%" },
];

const PARTICLE_DELAYS = [0, 1.2, 0.5, 2.1, 0.8, 1.7, 0.3, 2.5, 1.0, 0.6,
                          1.4, 2.0, 0.2, 1.8, 0.9, 2.3, 0.4, 1.6, 2.8, 0.7];
const PARTICLE_DURATIONS = [3.5, 4.2, 5.0, 3.8, 4.7, 3.2, 5.5, 4.0, 3.6, 4.9,
                             5.2, 3.3, 4.5, 3.9, 5.8, 4.1, 3.7, 4.6, 5.1, 3.4];

export const WelcomeGate: React.FC<WelcomeGateProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">("idle");

  const handleTapGift = () => {
    if (phase !== "idle") return;
    setPhase("opening");

    // Burst de confeti dorado al abrir la caja
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.45 },
        colors: ["#fbbf24", "#fda4af", "#ffffff", "#f59e0b", "#d97706"],
        gravity: 0.7,
      });
      setPhase("revealed");
    }, 800);
  };

  const handleEnter = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#fbbf24", "#ffffff"],
    });
    setTimeout(() => onEnter(), 900);
  };

  return (
    <AnimatePresence>
      {phase !== "revealed" || true ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 bg-[#06060e] text-center overflow-hidden"
          data-cy="welcome-gate"
        >
          {/* Ambient glows */}
          <div className="absolute w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-rose-400/6 rounded-full blur-[100px] pointer-events-none translate-y-20" />

          {/* Partículas flotantes decorativas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-400/40"
                style={{ left: pos.left, top: pos.top }}
                animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: PARTICLE_DURATIONS[i],
                  repeat: Infinity,
                  delay: PARTICLE_DELAYS[i],
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* FASE 1: La caja de regalo cerrada */}
            {phase === "idle" && (
              <motion.div
                key="gift-closed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Etiqueta superior */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-semibold uppercase tracking-[0.2em]"
                >
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span>8 de Agosto de 2006</span>
                </motion.div>

                {/* La caja de regalo */}
                <motion.button
                  onClick={handleTapGift}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer group"
                  data-cy="seal-button"
                >
                  {/* Resplandor detrás de la caja */}
                  <div className="absolute inset-0 -m-8 bg-amber-400/15 rounded-full blur-3xl group-hover:bg-amber-400/25 transition-all duration-700" />
                  
                  {/* Anillo rotatorio decorativo */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 border border-dashed border-amber-400/20 rounded-3xl pointer-events-none"
                  />

                  {/* Caja principal */}
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                    {/* Cuerpo de la caja */}
                    <div className="absolute bottom-0 w-full h-[65%] bg-gradient-to-b from-amber-500/20 to-amber-600/30 border border-amber-400/30 rounded-xl rounded-t-none shadow-[0_20px_60px_rgba(251,191,36,0.2)]" />
                    
                    {/* Tapa de la caja */}
                    <motion.div
                      className="absolute top-0 w-[110%] h-[42%] bg-gradient-to-b from-amber-400/30 to-amber-500/20 border border-amber-400/40 rounded-xl rounded-b-none shadow-[0_-5px_30px_rgba(251,191,36,0.15)]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Moño / Lazo vertical */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-rose-400/60 via-rose-300/40 to-rose-400/60 z-10" />
                    {/* Moño / Lazo horizontal */}
                    <div className="absolute top-[38%] left-0 right-0 h-[3px] bg-gradient-to-r from-rose-400/60 via-rose-300/40 to-rose-400/60 z-10" />

                    {/* Icono central */}
                    <Gift className="relative z-20 w-10 h-10 sm:w-12 sm:h-12 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                  </div>
                </motion.button>

                {/* Texto de invitación */}
                <div className="flex flex-col items-center gap-3 max-w-sm">
                  <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Para <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 bg-clip-text text-transparent text-glow-gold">{birthdayData.name}</span>
                  </h1>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Toca la caja para abrirla.
                  </p>
                </div>
              </motion.div>
            )}

            {/* FASE 2: Apertura en progreso */}
            {phase === "opening" && (
              <motion.div
                key="gift-opening"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [0.8, 1.15, 1] }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.div
                  animate={{ rotate: [0, -8, 8, -5, 5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8 }}
                >
                  <Gift className="w-20 h-20 text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]" />
                </motion.div>
                <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              </motion.div>
            )}

            {/* FASE 3: Regalo abierto - Revelación */}
            {phase === "revealed" && (
              <motion.div
                key="gift-revealed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-rose-400 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.6)] border border-amber-200/50"
                >
                  <Sparkles className="w-9 h-9 text-slate-950" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif-title text-4xl sm:text-5xl font-bold text-white tracking-tight"
                >
                  Felices <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 bg-clip-text text-transparent text-glow-gold">20 Años</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-slate-300 text-sm sm:text-base font-light max-w-sm leading-relaxed"
                >
                  Preparé algo especial para ti. Tómate tu tiempo, pon música si quieres, y disfruta cada sección a tu ritmo.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="mt-2 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 text-slate-950 font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] transition-all cursor-pointer"
                  data-cy="unlock-button"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comenzar</span>
                </motion.button>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-[11px] text-amber-200/50 mt-2 font-light tracking-wide flex items-center gap-1.5"
                >
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> Creado con dedicado cariño
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
