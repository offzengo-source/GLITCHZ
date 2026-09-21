import React from 'react';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const ReassuranceSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Paiement sécurisé',
      desc: 'Transactions chiffrées SSL 256-bit et protocoles 3D Secure conformes.',
    },
    {
      icon: Truck,
      title: 'Livraison rapide',
      desc: 'Expédition sous 24-48h avec suivi détaillé en temps réel.',
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      desc: 'Assistance client dédiée disponible à tout moment pour vous renseigner.',
    },
    {
      icon: RotateCcw,
      title: 'Retours 14 jours',
      desc: 'Délai de rétractation de 14 jours pour échanger ou demander un remboursement.',
    },
  ];

  return (
    <section className="w-full bg-black py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b082e]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start border-l border-[#8B00FF]/40 pl-5 transition-colors duration-150"
              >
                <div className="text-[#8B00FF] mb-3">
                  <Icon className="w-5 h-5 text-[#8B00FF]" />
                </div>

                <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">
                  {p.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
