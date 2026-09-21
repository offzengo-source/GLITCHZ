import React, { useState } from 'react';
import { X, Check, ArrowRight, Lock, CreditCard, Truck } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  appliedDiscountCode: string;
  discountPercent: number;
  onOrderCreated: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
  appliedDiscountCode,
  discountPercent,
  onOrderCreated,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'SHIPPING' | 'PAYMENT' | 'SUCCESS'>('SHIPPING');

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: 'Alexandre',
    lastName: 'Vane',
    email: 'alex.vane@gmail.com',
    phone: '+33 6 49 12 88 03',
    address: '14 Rue de Charonne',
    city: 'Paris',
    postalCode: '75011',
    country: 'France',
    shippingMethod: 'express', // express or relay
    cardNumber: '4242 •••• •••• 9821',
    cardExp: '08/28',
    cardCvc: '884',
    cardName: 'ALEXANDRE VANE',
    paymentMethod: 'card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = formData.shippingMethod === 'express' && subtotal < 120 ? 7.90 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PAYMENT');
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `GZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingCode = `DHL-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        total,
        status: 'En préparation',
        trackingCode,
        customer: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      };

      setCreatedOrder(newOrder);
      onOrderCreated(newOrder);
      onClearCart();
      setIsProcessing(false);
      setStep('SUCCESS');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0" onClick={step === 'SUCCESS' ? onClose : undefined} />

      <div
        id="checkout-modal-container"
        className="relative z-10 w-full max-w-2xl bg-black border border-[#8B00FF]/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b082e] bg-black">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-lg text-white uppercase tracking-wider">GLITCHZ</span>
            <span className="text-zinc-600">—</span>
            <span className="text-xs text-[#A855F7] font-medium uppercase tracking-wider">Commande sécurisée</span>
          </div>

          <button
            id="checkout-close-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'SUCCESS' && (
          <div className="grid grid-cols-2 border-b border-[#1b082e] text-xs uppercase tracking-wider font-semibold">
            <div className={`p-3 text-center border-r border-[#1b082e] ${step === 'SHIPPING' ? 'bg-[#150624] text-white' : 'text-zinc-500'}`}>
              1. Livraison
            </div>
            <div className={`p-3 text-center ${step === 'PAYMENT' ? 'bg-[#150624] text-white' : 'text-zinc-500'}`}>
              2. Paiement
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Shipping Form */}
          {step === 'SHIPPING' && (
            <form onSubmit={handleNextToPayment} className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B00FF]" />
                  <span>Adresse de livraison</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Prénom *</label>
                    <input
                      id="checkout-first-name"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Nom *</label>
                    <input
                      id="checkout-last-name"
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Email *</label>
                    <input
                      id="checkout-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Téléphone *</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Adresse *</label>
                    <input
                      id="checkout-address"
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Ville *</label>
                    <input
                      id="checkout-city"
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Code Postal *</label>
                    <input
                      id="checkout-postal"
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] px-3 py-2.5 text-white focus:outline-none transition-colors duration-150"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method Choice */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Mode d'expédition
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors duration-150 ${
                      formData.shippingMethod === 'express'
                        ? 'border-[#8B00FF] bg-[#150624]'
                        : 'border-[#2b0f44] bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#8B00FF]"
                    />
                    <div>
                      <div className="font-semibold text-white">Livraison Express 24-48h</div>
                      <div className="text-zinc-400 text-[11px] font-light">Suivi en direct & remise contre signature</div>
                      <div className="text-[#A855F7] mt-1 font-medium">
                        {subtotal >= 120 ? 'Offerte' : '7.90 €'}
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors duration-150 ${
                      formData.shippingMethod === 'relay'
                        ? 'border-[#8B00FF] bg-[#150624]'
                        : 'border-[#2b0f44] bg-black'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="relay"
                      checked={formData.shippingMethod === 'relay'}
                      onChange={handleInputChange}
                      className="mt-0.5 accent-[#8B00FF]"
                    />
                    <div>
                      <div className="font-semibold text-white">Point Relais</div>
                      <div className="text-zinc-400 text-[11px] font-light">Retrait sécurisé à proximité</div>
                      <div className="text-[#A855F7] mt-1 font-medium">Gratuit</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Recap Mini */}
              <div className="p-4 bg-[#05020a] border border-[#1b082e] flex items-center justify-between text-xs">
                <span className="text-zinc-400">{items.length} articles • Total :</span>
                <span className="text-base font-bold text-white">{total.toFixed(2)} €</span>
              </div>

              <button
                id="checkout-step-payment-btn"
                type="submit"
                className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold text-xs tracking-wider uppercase transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <span>Continuer vers le paiement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Simulator */}
          {step === 'PAYMENT' && (
            <form onSubmit={handleProcessOrder} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#8B00FF]" />
                    <span>Paiement sécurisé</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep('SHIPPING')}
                    className="text-xs text-[#A855F7] hover:underline"
                  >
                    ← Modifier coordonnées
                  </button>
                </div>

                {/* Payment methods selector */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2.5 px-3 border transition-colors duration-150 flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'card'
                        ? 'bg-[#150624] border-[#8B00FF] text-white'
                        : 'bg-black border-[#2b0f44] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#8B00FF]" />
                    <span>Carte</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                    className={`py-2.5 px-3 border transition-colors duration-150 flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'apple'
                        ? 'bg-[#150624] border-[#8B00FF] text-white'
                        : 'bg-black border-[#2b0f44] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
                    className={`py-2.5 px-3 border transition-colors duration-150 flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'crypto'
                        ? 'bg-[#150624] border-[#8B00FF] text-white'
                        : 'bg-black border-[#2b0f44] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>PayPal</span>
                  </button>
                </div>

                {/* Card input fields */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Numéro de carte</label>
                    <input
                      id="checkout-card-number"
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Expiration</label>
                    <input
                      id="checkout-card-exp"
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-2.5 text-white text-center focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">CVC</label>
                    <input
                      id="checkout-card-cvc"
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-2.5 text-white text-center focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Total Recap */}
              <div className="p-4 bg-[#05020a] border border-[#1b082e] space-y-2 text-xs font-light">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total articles :</span>
                  <span className="text-white font-medium">{subtotal.toFixed(2)} €</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A855F7]">
                    <span>Code {appliedDiscountCode} :</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Frais de port :</span>
                  <span className="text-white font-medium">{shippingCost === 0 ? 'Offerts' : `${shippingCost.toFixed(2)} €`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1b082e]">
                  <span>Total à régler :</span>
                  <span className="text-base text-white">{total.toFixed(2)} €</span>
                </div>
              </div>

              <button
                id="checkout-pay-submit-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] disabled:bg-[#1b082e] text-white font-semibold text-xs tracking-wider uppercase transition-colors duration-150 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Traitement sécurisé en cours...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Payer {total.toFixed(2)} €</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Order Confirmed Screen */}
          {step === 'SUCCESS' && createdOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-[#150624] border border-[#8B00FF] mx-auto flex items-center justify-center">
                <Check className="w-7 h-7 text-[#A855F7]" />
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest text-[#A855F7] uppercase block mb-1">
                  COMMANDE CONFIRMÉE
                </span>
                <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                  Merci pour votre commande
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto font-light leading-relaxed">
                  Votre commande a bien été enregistrée et est en cours de préparation dans notre atelier. 
                  Un email de confirmation a été envoyé à <strong className="text-white font-medium">{createdOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Card Recap */}
              <div className="bg-[#05020a] border border-[#1b082e] p-5 text-left text-xs space-y-3 font-light">
                <div className="flex justify-between border-b border-[#1b082e] pb-2">
                  <span className="text-zinc-400">Numéro de commande :</span>
                  <span className="text-white font-bold">{createdOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#1b082e] pb-2">
                  <span className="text-zinc-400">Numéro de suivi :</span>
                  <span className="text-white font-bold">{createdOrder.trackingCode}</span>
                </div>
                <div className="flex justify-between border-b border-[#1b082e] pb-2">
                  <span className="text-zinc-400">Adresse de livraison :</span>
                  <span className="text-white text-right">
                    {createdOrder.customer.address}, {createdOrder.customer.postalCode} {createdOrder.customer.city}
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-white">
                  <span>Montant réglé :</span>
                  <span className="text-[#A855F7]">{createdOrder.total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="order-success-close-btn"
                  onClick={onClose}
                  className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
                >
                  Retourner à la boutique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
