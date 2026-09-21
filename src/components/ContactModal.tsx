import React, { useState } from 'react';
import { X, Send, Check, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Commande & Suivi',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="contact-modal-container"
        className="relative z-10 w-full max-w-lg bg-black border border-[#8B00FF]/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b082e] bg-black">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#8B00FF]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              Contact & Support Client
            </span>
          </div>

          <button
            id="contact-close-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-[#150624] border border-[#8B00FF] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6 text-[#A855F7]" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Message envoyé
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto font-light leading-relaxed">
                Notre équipe vous répondra dans les plus brefs délais sous 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Votre nom *</label>
                <input
                  id="contact-name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alexandre Vane"
                  className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors duration-150"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Votre email *</label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alexandre@exemple.com"
                  className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors duration-150"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Sujet</label>
                <select
                  id="contact-subject-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white focus:outline-none transition-colors duration-150"
                >
                  <option value="Commande & Suivi">Suivi de commande & livraison</option>
                  <option value="Échange de taille">Retour ou échange de taille</option>
                  <option value="Programme VIP">Question sur le programme VIP</option>
                  <option value="Collaboration">Collaboration & presse</option>
                  <option value="Autre">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1 font-medium">Message *</label>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Indiquez votre numéro de commande si applicable..."
                  className="w-full bg-black border border-[#2b0f44] focus:border-[#8B00FF] p-3 text-white placeholder:text-zinc-600 focus:outline-none resize-none transition-colors duration-150"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold uppercase tracking-wider text-xs transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <span>Envoyer le message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
