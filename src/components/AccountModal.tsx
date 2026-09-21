import React, { useState } from 'react';
import { X, User, Package, MapPin, Sparkles, Clock } from 'lucide-react';
import { Order, VipMember } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  vipMember: VipMember | null;
  onOpenVip: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  vipMember,
  onOpenVip,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'PROFILE' | 'VIP'>('ORDERS');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="account-modal-container"
        className="relative z-10 w-full max-w-2xl bg-black border border-[#8B00FF]/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b082e] bg-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#150624] border border-[#8B00FF] flex items-center justify-center">
              <User className="w-4 h-4 text-[#A855F7]" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Mon Compte GLITCHZ
              </h2>
              <p className="text-[11px] text-zinc-400 font-light">
                {vipMember ? vipMember.email : 'alex.vane@gmail.com'}
              </p>
            </div>
          </div>

          <button
            id="account-close-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-[#1b082e] text-xs uppercase tracking-wider font-semibold">
          <button
            id="account-tab-orders"
            onClick={() => setActiveTab('ORDERS')}
            className={`py-3 px-2 text-center border-r border-[#1b082e] transition-colors duration-150 flex items-center justify-center gap-2 ${
              activeTab === 'ORDERS'
                ? 'bg-[#150624] text-white border-b-2 border-b-[#8B00FF]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 text-[#8B00FF]" />
            <span>Commandes ({orders.length})</span>
          </button>

          <button
            id="account-tab-profile"
            onClick={() => setActiveTab('PROFILE')}
            className={`py-3 px-2 text-center border-r border-[#1b082e] transition-colors duration-150 flex items-center justify-center gap-2 ${
              activeTab === 'PROFILE'
                ? 'bg-[#150624] text-white border-b-2 border-b-[#8B00FF]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#8B00FF]" />
            <span>Profil</span>
          </button>

          <button
            id="account-tab-vip"
            onClick={() => setActiveTab('VIP')}
            className={`py-3 px-2 text-center transition-colors duration-150 flex items-center justify-center gap-2 ${
              activeTab === 'VIP'
                ? 'bg-[#150624] text-[#A855F7] border-b-2 border-b-[#8B00FF]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#8B00FF]" />
            <span>Club VIP</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* ORDERS TAB */}
          {activeTab === 'ORDERS' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-black border border-[#1b082e] p-6">
                  <Package className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-1">Aucune commande récente</h3>
                  <p className="text-zinc-400 text-xs max-w-sm mx-auto mb-4 font-light">
                    Vos commandes de la collection GLITCHZ apparaîtront ici avec leur suivi en temps réel.
                  </p>
                  <button
                    id="account-shop-now-btn"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
                  >
                    Découvrir la collection
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    id={`order-card-${order.orderNumber}`}
                    className="p-4 bg-black border border-[#1b082e] hover:border-[#8B00FF]/60 transition-colors duration-150 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b082e] pb-2">
                      <div>
                        <span className="text-white font-bold">{order.orderNumber}</span>
                        <span className="text-zinc-500 mx-2">•</span>
                        <span className="text-zinc-400">{order.date}</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-[#150624] text-[#A855F7] border border-[#8B00FF]/50 text-[11px] font-semibold">
                        {order.status}
                      </span>
                    </div>

                    {/* Order items thumbnails */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-10 h-12 object-cover border border-[#27103d]"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="text-white font-medium line-clamp-1">{item.product.name}</div>
                              <div className="text-[11px] text-zinc-400 font-light">
                                Taille : {item.selectedSize} | Qte : {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-white">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking & Total footer */}
                    <div className="pt-2 border-t border-[#1b082e] flex flex-wrap items-center justify-between gap-2 text-[11px] font-light">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-[#8B00FF]" />
                        <span>Suivi : <strong className="text-white font-medium">{order.trackingCode}</strong></span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400">Total payé :</span>
                        <span className="font-bold text-sm text-white">
                          {order.total.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'PROFILE' && (
            <div className="space-y-6">
              <div className="p-4 bg-black border border-[#1b082e] space-y-3">
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                  Informations Personnelles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-medium">Nom complet</span>
                    <span className="text-white font-medium">Alexandre Vane</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-medium">Email</span>
                    <span className="text-white font-medium">{vipMember ? vipMember.email : 'alex.vane@gmail.com'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-medium">Téléphone</span>
                    <span className="text-white font-medium">+33 6 49 12 88 03</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-medium">Statut VIP</span>
                    <span className="text-[#A855F7] font-medium">Actif</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black border border-[#1b082e] space-y-3">
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                  Adresse de livraison enregistrée
                </h3>
                <p className="text-zinc-300 font-light">
                  Alexandre Vane<br />
                  14 Rue de Charonne<br />
                  75011 Paris, France
                </p>
              </div>
            </div>
          )}

          {/* VIP TAB */}
          {activeTab === 'VIP' && (
            <div className="space-y-6">
              <div className="p-6 bg-black border border-[#8B00FF] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8B00FF]" />
                    <span className="font-bold text-white text-base">
                      {vipMember ? vipMember.tier : 'MEMBRE PRIVILÈGE'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#8B00FF] text-white font-bold text-[10px] uppercase tracking-wider">
                    ACTIF
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#1b082e]">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-medium">Solde de Points</div>
                    <div className="text-xl font-extrabold text-white">
                      {vipMember ? vipMember.points : 450} <span className="text-xs font-normal text-[#8B00FF]">pts</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-medium">Code Privilège</div>
                    <div className="text-sm font-bold text-[#A855F7] font-mono">
                      {vipMember ? vipMember.memberCode : 'GLITCHZ10'}
                    </div>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-[#8B00FF]">✓</span>
                    <span>Accès prioritaire 24h avant chaque nouveau drop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#8B00FF]">✓</span>
                    <span>Livraison express offerte dès 60€ d'achat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#8B00FF]">✓</span>
                    <span>Invitations aux ventes privées et pop-up stores</span>
                  </li>
                </ul>

                {!vipMember && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenVip();
                    }}
                    className="w-full py-3 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold uppercase tracking-wider text-xs transition-colors duration-150"
                  >
                    Activer mon pass VIP
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
