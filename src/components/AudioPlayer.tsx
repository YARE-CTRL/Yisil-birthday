"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<"main" | "memorial">("main");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar MP3 (Main Mode)
  useEffect(() => {
    audioRef.current = new Audio("audio/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Escuchar eventos de cambio de modo (cuando hace scroll a la sección del Memorial)
  useEffect(() => {
    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "memorial") setMode("memorial");
      if (customEvent.detail === "main") setMode("main");
    };

    window.addEventListener("ambient-mode", handleModeChange);
    return () => window.removeEventListener("ambient-mode", handleModeChange);
  }, []);

  // Controladores del Sintetizador (Memorial Mode)
  const startAmbientSynth = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]; // Escala pentatónica

    const playSoftNote = () => {
      if (!ctx || ctx.state === "closed") return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const note = notes[Math.floor(Math.random() * notes.length)];
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05 * volume, ctx.currentTime + 1.5); // Escalar con el volumen
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 4.6);
    };

    playSoftNote();
    intervalRef.current = setInterval(playSoftNote, 2200);
  };

  const stopAmbientSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Motor principal que orquesta qué debe sonar basado en el state
  useEffect(() => {
    if (!isPlaying) {
      // Apagar todo
      if (audioRef.current) audioRef.current.pause();
      stopAmbientSynth();
      return;
    }

    // Está reproduciendo
    if (mode === "main") {
      stopAmbientSynth();
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.warn("Música de fondo no encontrada aún.", err);
          setIsPlaying(false);
        });
      }
    } else if (mode === "memorial") {
      if (audioRef.current) audioRef.current.pause();
      startAmbientSynth();
    }
  }, [isPlaying, mode]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      stopAmbientSynth();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div 
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Control de volumen */}
      <div 
        className={`overflow-hidden transition-all duration-500 flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 px-3 py-2 ${
          isHovered ? "w-28 opacity-100 mr-1" : "w-0 opacity-0 px-0 border-transparent mr-0"
        }`}
      >
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
          title="Ajustar volumen"
        />
      </div>

      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
          isPlaying
            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse"
            : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
        }`}
        title={isPlaying ? "Pausar música ambiental" : "Activar música ambiental"}
      >
        <Music className="w-4 h-4 text-amber-400" />
        <span>{isPlaying ? "Música Encendida" : "Música Ambiental"}</span>
        {isPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
      </button>
    </div>
  );
};
