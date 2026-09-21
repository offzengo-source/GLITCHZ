import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('glitchz_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('glitchz_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('glitchz_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      id="cookie-consent-banner"
      aria-label="Gestion des cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 bg-black border border-[#8B00FF]/60 p-4 text-xs text-zinc-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="font-bold text-white uppercase tracking-wider text-[11px]">
          Cookies & Confidentialité
        </span>
        <button
          onClick={handleDecline}
          className="text-zinc-500 hover:text-white transition-colors duration-150 p-0.5"
          aria-label="Fermer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-zinc-400 font-light leading-relaxed mb-3">
        Nous utilisons des cookies essentiels pour mémoriser votre panier, votre sélection de devises et sécuriser vos transactions.
      </p>

      <div className="flex items-center gap-2">
        <button
          id="cookie-accept-btn"
          onClick={handleAccept}
          className="px-3.5 py-1.5 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold text-[10px] uppercase tracking-wider transition-colors duration-150"
        >
          Accepter
        </button>
        <button
          id="cookie-decline-btn"
          onClick={handleDecline}
          className="px-3 py-1.5 bg-black border border-[#2b0f44] hover:border-zinc-500 text-zinc-400 hover:text-white text-[10px] uppercase tracking-wider transition-colors duration-150"
        >
          Refuser
        </button>
      </div>
    </aside>
  );
};
