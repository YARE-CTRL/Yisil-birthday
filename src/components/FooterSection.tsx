"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative py-12 px-4 z-10 border-t border-white/10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>20 Años de Magia • 8 de Agosto de 2006</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <p className="text-slate-400 text-xs font-light flex items-center gap-1.5">
          Creado con dedicado cariño <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" /> para Lorena.
        </p>
      </div>
    </footer>
  );
};
