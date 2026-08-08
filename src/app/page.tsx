"use client";

import React, { useState } from "react";
import { WelcomeGate } from "@/components/WelcomeGate";
import { BackgroundStars } from "@/components/BackgroundStars";
import { AudioPlayer } from "@/components/AudioPlayer";
import { HeroSection } from "@/components/HeroSection";
import { CosmicDaySection } from "@/components/CosmicDaySection";
import { GrandmotherMemorialSection } from "@/components/GrandmotherMemorialSection";
import { Interactive20ReasonsSection } from "@/components/Interactive20ReasonsSection";
import { VoiceMessageSection } from "@/components/VoiceMessageSection";

import { StarlightCanvasSection } from "@/components/StarlightCanvasSection";
import { BirthdayCakeSection } from "@/components/BirthdayCakeSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#090a16] text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden">
      {/* Cielo estrellado interactivo */}
      <BackgroundStars />

      {/* Pantalla de bienvenida */}
      {!hasEntered && <WelcomeGate onEnter={() => setHasEntered(true)} />}

      {/* Experiencia principal */}
      {hasEntered && (
        <>
          <AudioPlayer />
          <HeroSection />
          <CosmicDaySection />
          <GrandmotherMemorialSection />
          <Interactive20ReasonsSection />

          {/* Módulo especial: Voz Guardada */}
          <VoiceMessageSection />


          <StarlightCanvasSection />
          <BirthdayCakeSection />
          <FooterSection />
        </>
      )}
    </main>
  );
}
