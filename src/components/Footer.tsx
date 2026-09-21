import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenContact: () => void;
  onOpenVip: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenContact,
  onOpenVip,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 3500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-[#1b082e] text-zinc-400 text-xs">
      
      {/* Newsletter Section: Black background with crisp violet border */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b082e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#A855F7] uppercase block mb-2">
              NEWSLETTER
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
              REJOIGNEZ LA COMMUNAUTÉ
            </h3>
            <p className="text-xs text-zinc-400 font-light max-w-md leading-relaxed">
              Inscrivez-vous pour recevoir en avant-première nos sorties de drops et nos éditoriaux exclusifs.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {/* Input with black background and violet border */}
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="bg-black border border-[#8B00FF] px-4 py-3 text-white text-xs w-full sm:w-80 focus:outline-none placeholder-zinc-500"
            />
            <button
              id="footer-newsletter-btn"
              type="submit"
              className="px-6 py-3 bg-[#8B00FF] hover:bg-[#7700db] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Inscrit</span>
                </>
              ) : (
                <>
                  <span>S'inscrire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links & Navigation */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-3">
            <span className="font-extrabold text-2xl tracking-[0.18em] text-white uppercase block">
              GLITCHZ
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Streetwear contemporain haut de gamme. Pièces confectionnées en éditions limitées dans des matières d’exception.
            </p>
            <div className="text-[11px] text-zinc-500 pt-2">
              Paris — France
            </div>
          </div>

          {/* Navigation Links: (About, FAQ, Shipping, Returns, Terms, Privacy) */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ALL');
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors duration-150"
                >
                  New Collection
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVip}
                  className="hover:text-white transition-colors duration-150 text-[#A855F7]"
                >
                  Programme VIP
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors duration-150"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="hover:text-white transition-colors duration-150"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('faq')}
                  className="hover:text-white transition-colors duration-150"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service: Shipping, Returns */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Service Client
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <button
                  onClick={() => setActiveModal('shipping')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('returns')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media & Follow */}
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4">
              Réseaux Sociaux
            </h4>
            <ul className="space-y-2.5 font-light mb-6">
              <li>
                <a href="#instagram" className="hover:text-[#A855F7] transition-colors duration-150">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#tiktok" className="hover:text-[#A855F7] transition-colors duration-150">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#x" className="hover:text-[#A855F7] transition-colors duration-150">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-[#A855F7] transition-colors duration-150">
                  YouTube
                </a>
              </li>
            </ul>

            <div className="text-[11px] text-zinc-500 font-light">
              Assistance : support@glitchz.com
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Mentions */}
        <div className="pt-12 mt-12 border-t border-[#1b082e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {currentYear} GLITCHZ. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveModal('mentions')} className="hover:text-zinc-300 transition-colors duration-150">
              Mentions Légales
            </button>
            <span>•</span>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-zinc-300 transition-colors duration-150">
              Données Personnelles
            </button>
          </div>
        </div>

      </div>

      {/* Simple Information Modal for Footer Links */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border border-[#8B00FF] max-w-lg w-full p-6 sm:p-8 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#1b082e]">
              <h3 className="font-bold text-base text-white uppercase tracking-wider">
                {activeModal === 'about' && 'About GLITCHZ'}
                {activeModal === 'faq' && 'Foire Aux Questions'}
                {activeModal === 'shipping' && 'Shipping & Delivery'}
                {activeModal === 'returns' && 'Returns & Exchanges'}
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'mentions' && 'Mentions Légales'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-zinc-300 space-y-3 font-light leading-relaxed max-h-96 overflow-y-auto pr-2">
              {activeModal === 'about' && (
                <>
                  <p>GLITCHZ est une maison de streetwear indépendante fondée à Paris, dédiée aux coupes structurées, matières nobles et silhouettes minimalistes sombres.</p>
                  <p>Chaque pièce est produite en quantités restreintes avec un grammage lourd certifié (480 GSM pour les molletons, 280 GSM pour le jersey).</p>
                </>
              )}
              {activeModal === 'faq' && (
                <>
                  <p><strong>Quels sont les délais de livraison ?</strong> En France métropolitaine, vos commandes sont livrées sous 24 à 48 heures ouvrées.</p>
                  <p><strong>Quelle taille choisir ?</strong> Nos coupes sont modernes et légèrement boxy. Nous conseillons de prendre votre taille habituelle pour un tombé naturel, ou une taille au-dessus pour un porté oversize.</p>
                </>
              )}
              {activeModal === 'shipping' && (
                <>
                  <p>Livraison offerte en France et dans l'Union Européenne dès 120€ d'achat.</p>
                  <p>Toutes les commandes sont emballées avec soin dans des housses protectrices et expédiées sous pli renforcé.</p>
                </>
              )}
              {activeModal === 'returns' && (
                <>
                  <p>Vous disposez d'un délai légal de 14 jours à compter de la réception de votre colis pour effectuer un retour ou un échange de taille.</p>
                  <p>Les articles doivent être retournés neufs, non portés, non lavés et avec leurs étiquettes d'origine intactes.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p>Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur le site officiel GLITCHZ.</p>
                  <p>Toute commande passée implique l'adhésion entière et sans réserve aux présentes conditions.</p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p>Nous respectons scrupuleusement la confidentialité de vos informations personnelles conformément au RGPD.</p>
                  <p>Vos données sont exclusivement utilisées pour la gestion et le bon acheminement de vos commandes.</p>
                </>
              )}
              {activeModal === 'mentions' && (
                <>
                  <p>GLITCHZ Paris SARL — Capital social : 50 000 € — RCS Paris B 912 345 678.</p>
                  <p>Siège social : 12 rue de Richelieu, 75001 Paris, France.</p>
                  <p>Directeur de la publication : Direction GLITCHZ.</p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#1b082e] text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
