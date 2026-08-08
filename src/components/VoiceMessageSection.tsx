"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, Headphones, Clock, Film } from "lucide-react";

const VIDEO_SRC = "/video/mensaje-personal.mp4";

export const VoiceMessageSection: React.FC = () => {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check if video file exists
  useEffect(() => {
    fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        setVideoAvailable(res.ok);
      })
      .catch(() => setVideoAvailable(false))
      .finally(() => setIsChecking(false));
  }, []);

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto z-10" data-cy="voice-section">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20"
        >
          Solo Para Tus Ojos
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-title text-4xl sm:text-6xl font-bold text-white mt-4"
        >
          Un Mensaje Guardado Para Ti
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 max-w-md mx-auto mt-3 font-light text-sm sm:text-base"
        >
          Hay cosas que se dicen mejor mirándote a los ojos. Este mensaje fue grabado especialmente para ti.
        </motion.p>
      </div>

      {/* Central Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-8 sm:p-12 border border-amber-400/20 bg-amber-500/5 backdrop-blur-xl shadow-[0_0_60px_rgba(251,191,36,0.08)] flex flex-col items-center text-center"
      >

        <AnimatePresence mode="wait">
          {/* SEALED STATE */}
          {!isUnsealed && (
            <motion.div
              key="sealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6 w-full"
              data-cy="vinyl-sealed"
            >
              {/* Film Reel Visual */}
              <div className="relative w-48 h-48">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]" />
                {/* Groove rings */}
                {[36, 48, 60, 72].map((size) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-white/5"
                    style={{
                      inset: `${size}px`,
                    }}
                  />
                ))}
                {/* Label */}
                <div className="absolute inset-[56px] rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border border-amber-400/30 shadow-inner">
                  <Lock className="w-7 h-7 text-amber-200" />
                </div>
              </div>

              <div>
                <p className="text-slate-300 font-light text-sm leading-relaxed max-w-xs">
                  Este mensaje fue sellado con cuidado. Busca un momento tranquilo, ponte cómoda, y ábrelo.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsUnsealed(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_rgba(251,191,36,0.7)] transition-all cursor-pointer"
                data-cy="unseal-voice-button"
              >
                <Film className="w-4 h-4" />
                <span>Romper el sello y ver</span>
              </motion.button>
            </motion.div>
          )}

          {/* OPENED STATE */}
          {isUnsealed && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto"
              data-cy="vinyl-player"
            >
              {/* Video Player */}
              {videoAvailable ? (
                <div className="w-full rounded-2xl overflow-hidden border border-amber-400/20 shadow-[0_0_40px_rgba(251,191,36,0.1)]">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-2xl"
                    poster=""
                  >
                    <source src={VIDEO_SRC} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              ) : (
                // Video not yet uploaded placeholder
                <div className="w-full p-8 rounded-2xl border border-dashed border-amber-400/30 bg-amber-500/5 text-center" data-cy="audio-placeholder">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-amber-400 ml-1" />
                  </div>
                  <Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-amber-300 text-sm font-medium">
                    El mensaje personal llegará pronto
                  </p>
                  <p className="text-slate-400 text-xs font-light mt-1">
                    Vuelve a visitarme en unos días. Vale la pena la espera.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
