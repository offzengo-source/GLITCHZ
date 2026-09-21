import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onVipClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center bg-black overflow-hidden border-b border-[#1b082e]">
      {/* Background High-End Editorial Imagery with Deep Black Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
          alt="GLITCHZ New Collection Campaign"
          className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      {/* Content Container - Generous negative space */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-20">
        
        {/* Subtle Category Pill */}
        <div className="mb-6">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#A855F7] uppercase px-3 py-1 border border-[#8B00FF]/40 bg-black/60">
            SÉRIE LIMITÉE — DROP 004
          </span>
        </div>

        {/* Clean, Massive Bold Title */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-none mb-6">
          NEW COLLECTION
        </h1>

        {/* Refined Minimal Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-10">
          Volumes architecturaux, coupes boxy épurées et cotons lourds 480 GSM. 
          Une vision contemporaine du vestiaire streetwear sans compromis.
        </p>

        {/* CTA Button "Découvrir" - Violet with subtle darkening on hover */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="px-10 py-4 bg-[#8B00FF] hover:bg-[#7700db] active:bg-[#6500bc] text-white font-semibold text-sm tracking-[0.15em] uppercase transition-colors duration-200"
          >
            Découvrir
          </button>
        </div>

      </div>

      {/* Discreet Scroll Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Faire défiler"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-[#A855F7] transition-colors duration-200 flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase z-10"
      >
        <span>SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
};
