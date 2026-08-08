"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Star, Feather } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

interface FloatingLantern {
  id: number;
  message: string;
  x: number;
}

export const GrandmotherMemorialSection: React.FC = () => {
  const [lanterns, setLanterns] = useState<FloatingLantern[]>([]);
  const [nextIndex, setNextIndex] = useState(0);

  const releaseLantern = () => {
    const messages = birthdayData.grandmotherMemorial.lanternMessages;
    const msg = messages[nextIndex % messages.length];
    const newLantern: FloatingLantern = {
      id: Date.now(),
      message: msg,
      x: 15 + Math.random() * 70,
    };

    setLanterns((prev) => [...prev, newLantern]);
    setNextIndex((prev) => prev + 1);

    setTimeout(() => {
      setLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, 12000);
  };

  const handleViewportEnter = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ambient-mode", { detail: "memorial" }));
    }
  };

  const handleViewportLeave = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ambient-mode", { detail: "main" }));
    }
  };

  return (
    <motion.section 
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ amount: 0.3 }}
      className="relative py-28 px-4 max-w-5xl mx-auto z-10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Lanterns Container */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <AnimatePresence>
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: "-90%", opacity: [1, 1, 0.8, 0], scale: [1, 1.05, 0.95, 0.7] }}
              transition={{ duration: 10, ease: "easeOut" }}
              style={{ left: `${lantern.x}%` }}
              className="absolute bottom-0 flex flex-col items-center"
            >
              {/* Lantern Visual */}
              <div className="relative w-12 h-16 bg-gradient-to-t from-amber-500 via-amber-300 to-amber-100 rounded-t-xl rounded-b-md shadow-[0_0_35px_rgba(251,191,36,0.9)] flex items-center justify-center border border-amber-200/50">
                <div className="w-4 h-4 rounded-full bg-white blur-xs animate-ping" />
              </div>
              <span className="mt-2 text-[11px] font-medium text-amber-200 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-amber-400/30 whitespace-nowrap shadow-lg flex items-center gap-1.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                {lantern.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Feather className="w-3.5 h-3.5 text-amber-400" />
          <span>Espacio Conmemorativo</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-4xl sm:text-6xl font-bold text-white"
        >
          {birthdayData.grandmotherMemorial.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-amber-200/80 text-base sm:text-lg font-light mt-3 max-w-xl mx-auto"
        >
          {birthdayData.grandmotherMemorial.subtitle}
        </motion.p>
      </div>

      {/* Memorial Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card-gold p-8 sm:p-12 rounded-3xl relative text-center border border-amber-400/30 shadow-[0_0_50px_rgba(251,191,36,0.1)]"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-6 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          <Heart className="w-8 h-8 text-amber-300 fill-amber-300/30" />
        </div>

        <p className="text-amber-300 font-serif-title text-xl sm:text-2xl italic max-w-2xl mx-auto">
          "{birthdayData.grandmotherMemorial.dedication}"
        </p>

        {birthdayData.grandmotherMemorial.memorialPhotos[0] && (
          <div className="my-10 flex justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
              <img 
                src={birthdayData.grandmotherMemorial.memorialPhotos[0]} 
                alt="Memoria eterna de la Abuela" 
                className="w-full h-full object-cover grayscale-[30%] sepia-[20%] transition-all duration-700 hover:grayscale-0 hover:sepia-0 hover:scale-105"
              />
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        )}

        <div className="my-8 w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />

        <div className="space-y-4 text-slate-200 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {birthdayData.grandmotherMemorial.letterContent.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={releaseLantern}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_45px_rgba(251,191,36,0.8)] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Elevar un Farol de Luz al Cielo</span>
          </motion.button>
          <span className="text-xs text-amber-300/70 mt-3 font-light">
            Toca el botón para elevar una luz cálida en su memoria hacia las estrellas.
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
};
