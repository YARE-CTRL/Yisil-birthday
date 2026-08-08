"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Wind, Flame, Award } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export const BirthdayCakeSection: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>(Array(20).fill(true));
  const [isLetterUnlocked, setIsLetterUnlocked] = useState(false);

  const extinguishCandle = (index: number) => {
    if (!candles[index]) return;

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every((c) => !c)) {
      triggerCelebration();
    }
  };

  const blowAllCandles = () => {
    setCandles(Array(20).fill(false));
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setIsLetterUnlocked(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#fbbf24", "#f472b6", "#ffffff", "#f59e0b"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const remainingCandles = candles.filter((c) => c).length;

  return (
    <section className="relative py-28 px-4 max-w-5xl mx-auto z-10 text-center" data-cy="cake-section">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-rose-400 text-xs font-semibold uppercase tracking-widest bg-rose-400/10 px-4 py-1.5 rounded-full border border-rose-400/20"
      >
        El Deseo de los 20 Años
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif-title text-4xl sm:text-7xl font-bold text-white mt-4"
      >
        Sopla las 20 Velas
      </motion.h2>

      <p className="text-slate-300 max-w-xl mx-auto mt-3 font-light text-base sm:text-lg">
        Toca las velas para apagar cada llama, pedir un gran deseo y desbloquear tu carta final de cumpleaños.
      </p>

      {/* Counter indicator */}
      <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-amber-300 font-mono text-sm" data-cy="candle-counter">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>
          {remainingCandles > 0
            ? `Quedan ${remainingCandles} velas encendidas`
            : "Todas las velas están apagadas"}
        </span>
      </div>

      {/* Cake Container */}
      <div className="my-14 relative max-w-xl mx-auto flex flex-col items-center">
        {/* Candles Grid Layout above cake */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap max-w-md mx-auto mb-[-12px] z-20 px-4">
          {candles.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => extinguishCandle(idx)}
              className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
              title={`Vela #${idx + 1}: ${isLit ? "Toca para apagar" : "Apagada"}`}
              data-cy="candle-button"
            >
              {/* Flame */}
              <div className="h-8 flex items-center justify-center">
                {isLit ? (
                  <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-amber-300 to-amber-100 rounded-full animate-flame shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                ) : (
                  <div className="w-1.5 h-3 bg-slate-500 rounded-full opacity-60 flex flex-col items-center">
                    <div className="w-2 h-2 bg-slate-400/40 rounded-full blur-xs -mt-2 animate-ping" />
                  </div>
                )}
              </div>

              {/* Candle Stick */}
              <div
                className={`w-3.5 h-12 rounded-t-sm border-x border-t transition-colors ${
                  isLit
                    ? "bg-gradient-to-b from-rose-300 to-rose-400 border-rose-200 shadow-md"
                    : "bg-slate-700 border-slate-600 opacity-60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* SVG Tiered Cake Illustration */}
        <div className="w-full max-w-md relative z-10 drop-shadow-[0_10px_40px_rgba(244,114,182,0.3)]">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            <ellipse cx="200" cy="185" rx="190" ry="12" fill="#334155" opacity="0.6" />
            <ellipse cx="200" cy="180" rx="180" ry="12" fill="#e2e8f0" opacity="0.9" />

            <path d="M 50,120 L 50,175 Q 200,195 350,175 L 350,120 Z" fill="#f472b6" />
            <ellipse cx="200" cy="120" rx="150" ry="18" fill="#fb7185" />
            <path d="M 50,120 Q 75,140 100,120 Q 125,145 150,120 Q 175,140 200,120 Q 225,145 250,120 Q 275,140 300,120 Q 325,145 350,120" fill="#fff" opacity="0.9" />

            <path d="M 90,60 L 90,115 Q 200,135 310,115 L 310,60 Z" fill="#fbcfe8" />
            <ellipse cx="200" cy="60" rx="110" ry="15" fill="#f472b6" />
            <path d="M 90,60 Q 120,80 150,60 Q 180,80 210,60 Q 240,80 270,60 Q 290,75 310,60" fill="#fff" opacity="0.9" />

            <circle cx="150" cy="90" r="3" fill="#fbbf24" />
            <circle cx="200" cy="95" r="4" fill="#fbbf24" />
            <circle cx="250" cy="90" r="3" fill="#fbbf24" />
            <circle cx="130" cy="150" r="4" fill="#fbbf24" />
            <circle cx="200" cy="155" r="5" fill="#fbbf24" />
            <circle cx="270" cy="150" r="4" fill="#fbbf24" />
          </svg>
        </div>

        {/* Action Button to blow all candles */}
        {remainingCandles > 0 && (
          <button
            onClick={blowAllCandles}
            className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:scale-105 transition-all cursor-pointer"
            data-cy="blow-all-button"
          >
            <Wind className="w-4 h-4" />
            <span>Apagar las 20 Velas</span>
          </button>
        )}
      </div>

      {/* Secret Final Birthday Letter Modal */}
      <AnimatePresence>
        {isLetterUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-rose p-8 sm:p-12 rounded-3xl max-w-3xl mx-auto mt-12 border border-rose-400/40 text-left relative overflow-hidden shadow-[0_0_60px_rgba(244,114,182,0.3)]"
            data-cy="final-letter"
          >
            <div className="flex items-center gap-3 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-5 h-5 text-rose-400" />
              <span>Carta Secreta Desbloqueada</span>
            </div>

            <h3 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-6">
              {birthdayData.finalLetter.title}
            </h3>

            <div className="space-y-4 text-slate-200 font-light text-base sm:text-lg leading-relaxed">
              {birthdayData.finalLetter.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-amber-300 font-serif-title text-xl">
              <span>{birthdayData.finalLetter.signOff}</span>
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
