import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: () => void;
  appliedDiscountCode: string;
  onApplyDiscountCode: (code: string) => { success: boolean; message: string };
  discountPercent: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  appliedDiscountCode,
  onApplyDiscountCode,
  discountPercent,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const FREE_SHIPPING_THRESHOLD = 120;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 7.90;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = onApplyDiscountCode(inputCode.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setInputCode('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-black border-l border-[#1b082e] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#1b082e] bg-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#8B00FF]" />
              <span className="font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                Panier ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <button
              id="cart-close-btn"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#05020a] border-b border-[#1b082e] text-xs">
            {missingForFreeShipping > 0 ? (
              <p className="text-zinc-300 mb-2 font-light">
                Plus que <strong className="text-white font-semibold">{missingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte
              </p>
            ) : (
              <p className="text-[#A855F7] font-medium flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8B00FF]" />
                Livraison offerte disponible
              </p>
            )}
            <div className="w-full bg-[#1b082e] h-1">
              <div
                className="bg-[#8B00FF] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-14 h-14 mx-auto mb-4 border border-[#27103d] flex items-center justify-center bg-black">
                  <ShoppingBag className="w-6 h-6 text-zinc-500" />
                </div>
                <h3 className="font-bold text-base text-white uppercase tracking-wider mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6 font-light">
                  Découvrez la nouvelle collection GLITCHZ et ajoutez vos articles préférés.
                </p>
                <button
                  id="cart-empty-shop-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
                >
                  Découvrir
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  id={`cart-item-${item.cartItemId}`}
                  className="flex gap-4 p-3 bg-black border border-[#1b082e] hover:border-[#8B00FF]/50 transition-colors duration-150"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover border border-[#27103d] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          id={`cart-remove-${item.cartItemId}`}
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-zinc-500 hover:text-white transition-colors p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-zinc-400 mt-1 space-x-2 font-light">
                        <span>Taille : <strong className="text-white font-medium">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1b082e]">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#2b0f44] bg-black">
                        <button
                          id={`cart-minus-${item.cartItemId}`}
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs text-white min-w-[24px] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          id={`cart-plus-${item.cartItemId}`}
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-white">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary / Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-black border-t border-[#1b082e] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCode} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="cart-promo-input"
                      type="text"
                      placeholder="Code de réduction"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-black border border-[#2b0f44] focus:border-[#8B00FF] text-xs text-white uppercase placeholder:normal-case placeholder:text-zinc-500 focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <button
                    id="cart-promo-apply-btn"
                    type="submit"
                    className="px-4 py-2 bg-black hover:bg-[#8B00FF] text-white border border-[#8B00FF]/60 hover:border-[#8B00FF] text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
                  >
                    Appliquer
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-[#A855F7]' : 'text-red-400'}`}>
                    {promoMessage.text}
                  </p>
                )}

                {appliedDiscountCode && (
                  <div className="flex items-center justify-between text-[11px] text-[#A855F7] bg-[#150624] px-3 py-1.5 border border-[#8B00FF]/40">
                    <span>Code : <strong>{appliedDiscountCode}</strong> (-{discountPercent}%)</span>
                    <span className="text-white font-bold">-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-zinc-400 border-t border-[#1b082e] pt-3 font-light">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-white font-medium">{subtotal.toFixed(2)} €</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A855F7]">
                    <span>Réduction ({discountPercent}%)</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-white font-medium">
                    {shipping === 0 ? <span className="text-[#A855F7]">Offerte</span> : `${shipping.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1b082e]">
                  <span>Total</span>
                  <span className="text-base text-white">{total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Checkout Button in Violet */}
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold text-xs tracking-wider uppercase transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <span>Commander</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B00FF]" />
                <span>Paiement sécurisé et chiffré SSL</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
