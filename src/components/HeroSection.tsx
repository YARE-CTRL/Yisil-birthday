"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Calendar, Heart, ChevronDown, Sun } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export const HeroSection: React.FC = () => {
  const [daysCount, setDaysCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    // Animate counter up to 7305
    const target = birthdayData.daysLivedApprox;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDaysCount(target);
        clearInterval(timer);
      } else {
        setDaysCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-16" data-cy="hero-section">
      {/* Decorative Constellation Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y: yBadge }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
      >
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span>Para {birthdayData.name} • {birthdayData.lifePath.zodiac.sign} • 8 de Agosto de 2006</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ y: yText }}
        className="font-serif-title text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none max-w-5xl"
      >
        20 Años de Magia <br />
        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 bg-clip-text text-transparent text-glow-gold">
          Alrededor del Sol
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 text-slate-300 text-lg sm:text-xl max-w-2xl font-light leading-relaxed"
      >
        Un viaje cósmico creado especialmente para celebrar el día en que el mundo se volvió un lugar infinitamente más bonito gracias a ti.
      </motion.p>

      {/* Counter Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
        data-cy="hero-stats"
      >
        <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
          <div className="text-amber-400 text-3xl font-extrabold tracking-tight font-serif-title" data-cy="days-counter">
            {daysCount.toLocaleString()}
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Días Iluminando Vidas
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-rose-400/40 transition-colors">
          <div className="text-rose-400 text-3xl font-extrabold tracking-tight font-serif-title" data-cy="orbits-counter">
            20
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3 text-rose-400" /> Vueltas al Sol
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
          <div className="text-amber-300 text-3xl font-extrabold tracking-tight font-serif-title">
            ∞
          </div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40" /> Razones para Celebrarte
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#cosmic-day"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 inline-flex flex-col items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group"
        data-cy="scroll-link"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Descubre tu historia</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-amber-400 group-hover:scale-125 transition-transform" />
      </motion.a>
    </section>
  );
};
