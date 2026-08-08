"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, CheckCircle2 } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export const Interactive20ReasonsSection: React.FC = () => {
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());

  const toggleReason = (index: number) => {
    setOpenedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const openAll = () => {
    const all = new Set(birthdayData.reasons20.map((_, i) => i));
    setOpenedSet(all);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10" data-cy="reasons-section">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-rose-400 text-xs font-semibold uppercase tracking-widest bg-rose-400/10 px-4 py-1.5 rounded-full border border-rose-400/20"
        >
          20 Años • 20 Destellos
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif-title text-4xl sm:text-6xl font-bold text-white mt-4"
        >
          20 Razones para Celebrarte
        </motion.h2>
        <p className="text-slate-300 max-w-xl mx-auto mt-4 font-light text-base sm:text-lg">
          Haz clic en cada tarjeta para abrir un sobre y descubrir un motivo especial.
        </p>

        <button
          onClick={openAll}
          className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-full transition-colors cursor-pointer"
          data-cy="open-all-button"
        >
          <Sparkles className="w-3.5 h-3.5" /> Abrir los 20 sobres juntos
        </button>
      </div>

      {/* Grid of 20 Interactive Envelopes / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {birthdayData.reasons20.map((reason, idx) => {
          const isOpen = openedSet.has(idx);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 8) * 0.05 }}
              onClick={() => toggleReason(idx)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-500 relative min-h-[140px] flex flex-col justify-between select-none ${
                isOpen
                  ? "glass-card-rose border-rose-400/50 shadow-[0_0_20px_rgba(244,114,182,0.2)] scale-[1.02]"
                  : "glass-card border-white/10 hover:border-amber-400/40 hover:scale-[1.01]"
              }`}
              data-cy="reason-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">
                  Sobre #{idx + 1}
                </span>
                {isOpen ? (
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                ) : (
                  <Gift className="w-4 h-4 text-amber-400" />
                )}
              </div>

              <div className="my-3">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.p
                      key="open"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium text-rose-100 leading-snug"
                    >
                      {reason}
                    </motion.p>
                  ) : (
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-slate-400 font-light flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400/70" />
                      <span>Abrir mensaje</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-[10px] uppercase font-semibold text-right">
                {isOpen ? (
                  <span className="text-rose-300 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3 text-rose-400" /> Revelado
                  </span>
                ) : (
                  <span className="text-amber-300/60">Abrir</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
