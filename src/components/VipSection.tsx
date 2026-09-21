import React, { useState } from 'react';
import { Check, Copy, ArrowRight, ShieldCheck, Tag, Clock } from 'lucide-react';
import { VipMember } from '../types';

interface VipSectionProps {
  vipMember: VipMember | null;
  onJoinVip: (email: string, name: string) => VipMember;
}

export const VipSection: React.FC<VipSectionProps> = ({ vipMember, onJoinVip }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [memberState, setMemberState] = useState<VipMember | null>(vipMember);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const newMember = onJoinVip(email.trim(), name.trim() || 'Membre VIP');
    setMemberState(newMember);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="vip-section"
      className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-black border-b border-[#1b082e]"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Featured VIP Block: Black background with crisp violet border */}
        <div className="bg-black border border-[#8B00FF] p-8 sm:p-12 lg:p-16">
          
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#A855F7] uppercase block mb-3">
              PROGRAMME DE FIDÉLITÉ
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
              CLUB PRIVILÈGE GLITCHZ
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              Bénéficiez d’un accès prioritaire aux drops limités et profitez de réductions exclusives réservées à nos membres.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            <div className="border border-[#1b082e] p-6 bg-black flex flex-col justify-between">
              <div>
                <Clock className="w-6 h-6 text-[#8B00FF] mb-4" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2">
                  Accès Anticipé aux Drops
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Recevez un lien privé 24h avant chaque lancement officiel pour commander les séries limitées.
                </p>
              </div>
            </div>

            <div className="border border-[#1b082e] p-6 bg-black flex flex-col justify-between">
              <div>
                <Tag className="w-6 h-6 text-[#8B00FF] mb-4" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2">
                  Réduction Exclusive -15%
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Code personnel permanent utilisable sur l’ensemble de vos commandes en ligne.
                </p>
              </div>
            </div>

            <div className="border border-[#1b082e] p-6 bg-black flex flex-col justify-between">
              <div>
                <ShieldCheck className="w-6 h-6 text-[#8B00FF] mb-4" />
                <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2">
                  Événements Privés
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Invitations prioritaires aux pop-up stores et présentations exclusives de nouvelles capsules.
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Form or Active State */}
          <div className="max-w-xl mx-auto">
            {memberState ? (
              <div className="text-center bg-black border border-[#8B00FF] p-6 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#150624] text-xs font-semibold text-[#A855F7] border border-[#8B00FF]/50">
                  <Check className="w-3.5 h-3.5" />
                  <span>MEMBRE VIP ACTIF</span>
                </div>

                <h3 className="font-bold text-lg text-white uppercase tracking-wider">
                  Votre Code Privilège
                </h3>
                
                <p className="text-xs text-zinc-400 font-light">
                  Appliquez ce code lors du paiement pour obtenir immédiatement 15% de réduction :
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <span className="font-mono text-xl font-bold text-white px-4 py-2 border border-[#8B00FF]/60 bg-black tracking-widest">
                    {memberState.memberCode}
                  </span>
                  <button
                    id="vip-copy-voucher-btn"
                    onClick={() => handleCopyCode(memberState.memberCode)}
                    className="px-5 py-2.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors duration-150"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier le code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">
                      Prénom *
                    </label>
                    <input
                      id="vip-input-name"
                      type="text"
                      required
                      placeholder="Votre prénom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white text-xs focus:outline-none transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">
                      Email *
                    </label>
                    <input
                      id="vip-input-email"
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white text-xs focus:outline-none transition-colors duration-150"
                    />
                  </div>
                </div>

                <button
                  id="vip-submit-btn"
                  type="submit"
                  className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>Rejoindre le club & obtenir -15%</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-500 text-center font-light">
                  Aucun spam. Données strictement confidentielles.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
