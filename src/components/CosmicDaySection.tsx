"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";
import { Sparkles, Sun, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

const { lifePath } = birthdayData;

export const CosmicDaySection: React.FC = () => {
  return (
    <section id="cosmic-day" className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden">
      
      {/* Elementos de fondo elegantes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-slate-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-amber-400/30" />
            <Compass className="w-5 h-5 text-amber-400" />
            <div className="h-px w-8 bg-amber-400/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            {lifePath.title}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            {lifePath.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Tarjeta Zodiaco */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Sun className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
                <Sun className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-amber-100 mb-2 flex items-center gap-2">
                Signo {lifePath.zodiac.sign}
              </h3>
              <p className="text-slate-300 font-light leading-relaxed flex-grow">
                {lifePath.zodiac.description}
              </p>
            </div>
          </motion.div>

          {/* Tarjeta Numerología */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700">
              <Sparkles className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-slate-400/10 flex items-center justify-center mb-6 border border-slate-400/20">
                <Sparkles className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-2xl font-serif text-slate-100 mb-2">
                {lifePath.numerology.number}
              </h3>
              <p className="text-slate-300 font-light leading-relaxed flex-grow">
                {lifePath.numerology.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bloque de Responsabilidades y Futuro */}
        <div className="grid grid-cols-1 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-rose-100 mb-4">La Madurez de un Alma Fuerte</h3>
                <p className="text-slate-300 font-light leading-relaxed mb-6 text-lg">
                  {lifePath.responsibilities}
                </p>
              </div>
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <HeartHandshake className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-amber-100 mb-4">Lo que el Universo te Prepara</h3>
                <p className="text-slate-300 font-light leading-relaxed text-lg">
                  {lifePath.future}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
