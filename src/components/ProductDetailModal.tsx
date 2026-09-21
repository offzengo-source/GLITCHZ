import React, { useState } from 'react';
import { X, ShoppingBag, Truck, RefreshCw, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'FIT' | 'CARE'>('DETAILS');

  const handleAddToCart = () => {
    if (product.isSoldOut) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div
        id="product-detail-modal-container"
        className="relative z-10 w-full max-w-4xl bg-black border border-[#8B00FF]/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b082e] bg-black">
          <span className="text-xs font-semibold tracking-widest text-[#A855F7] uppercase">
            GLITCHZ — {product.category}
          </span>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[82vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-black border-b md:border-b-0 md:border-r border-[#1b082e] flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black border border-[#2b0f44] mb-4">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`modal-thumb-btn-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 flex-shrink-0 border overflow-hidden transition-colors duration-150 ${
                      activeImageIndex === idx
                        ? 'border-[#8B00FF]'
                        : 'border-[#1b082e] opacity-60 hover:opacity-100 hover:border-[#8B00FF]/50'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Buy Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Title & Price */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <Star className="w-3.5 h-3.5 text-[#8B00FF] fill-[#8B00FF]" />
                  <span>{product.rating}</span>
                  <span>({product.reviewsCount} avis)</span>
                </div>
              </div>

              <h1 className="font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {product.price} €
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {product.originalPrice} €
                  </span>
                )}
                <span className="text-xs text-zinc-500">TVA incluse</span>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2 font-medium">
                  Coloris : <span className="text-white">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      id={`modal-color-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-colors duration-150 ${
                        selectedColor === c.name
                          ? 'border-[#8B00FF] bg-[#150624] text-white'
                          : 'border-[#2b0f44] bg-black text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-zinc-700" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {!product.isSoldOut && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
                    Taille :
                  </label>
                  <span className="text-[11px] text-[#A855F7] hover:underline cursor-pointer">
                    Guide des tailles
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      id={`modal-size-${sz.toLowerCase()}`}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-semibold uppercase transition-colors duration-150 border ${
                        selectedSize === sz
                          ? 'bg-[#8B00FF] border-[#8B00FF] text-white'
                          : 'bg-black border-[#2b0f44] text-zinc-300 hover:border-[#8B00FF] hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA */}
            <div className="space-y-3 pt-2">
              {!product.isSoldOut && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Quantité :</span>
                  <div className="flex items-center border border-[#2b0f44] bg-black">
                    <button
                      id="modal-qty-minus-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs text-white min-w-[32px] text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      id="modal-qty-plus-btn"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-light">
                    {product.stockCount} disponibles
                  </span>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                id="modal-add-to-cart-btn"
                disabled={product.isSoldOut}
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-3 ${
                  product.isSoldOut
                    ? 'bg-[#150724] border border-[#2b0f44] text-zinc-500 cursor-not-allowed'
                    : justAdded
                    ? 'bg-black border border-[#8B00FF] text-[#A855F7]'
                    : 'bg-[#8B00FF] hover:bg-[#7700db] text-white'
                }`}
              >
                {product.isSoldOut ? (
                  <span>Sold Out</span>
                ) : justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#A855F7]" />
                    <span>Ajouté au panier</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier • {(product.price * quantity).toFixed(2)} €</span>
                  </>
                )}
              </button>
            </div>

            {/* Specifications Tabs */}
            <div className="border-t border-[#1b082e] pt-4">
              <div className="flex border-b border-[#1b082e] mb-3">
                <button
                  id="tab-details-btn"
                  onClick={() => setActiveTab('DETAILS')}
                  className={`pb-2 px-2 text-xs uppercase tracking-wider transition-colors duration-150 ${
                    activeTab === 'DETAILS' ? 'text-white border-b-2 border-[#8B00FF] font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Caractéristiques
                </button>
                <button
                  id="tab-fit-btn"
                  onClick={() => setActiveTab('FIT')}
                  className={`pb-2 px-2 text-xs uppercase tracking-wider transition-colors duration-150 ${
                    activeTab === 'FIT' ? 'text-white border-b-2 border-[#8B00FF] font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Coupe & Taille
                </button>
                <button
                  id="tab-care-btn"
                  onClick={() => setActiveTab('CARE')}
                  className={`pb-2 px-2 text-xs uppercase tracking-wider transition-colors duration-150 ${
                    activeTab === 'CARE' ? 'text-white border-b-2 border-[#8B00FF] font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Entretien
                </button>
              </div>

              {activeTab === 'DETAILS' && (
                <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                  <li>• Matière : {product.details.composition}</li>
                  <li>• Grammage : {product.details.weight}</li>
                  <li>• Provenance : {product.details.origin}</li>
                  {product.details.features.map((feat, i) => (
                    <li key={i} className="text-zinc-400">• {feat}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'FIT' && (
                <div className="text-xs text-zinc-300 space-y-2 font-light">
                  <p><strong className="text-white font-medium">Silhouette :</strong> {product.details.fit}</p>
                  <p className="text-zinc-400">
                    Prenez votre taille habituelle pour une coupe décontractée, ou une taille au-dessus pour un tombé plus ample.
                  </p>
                </div>
              )}

              {activeTab === 'CARE' && (
                <div className="text-xs text-zinc-300 space-y-1.5 font-light">
                  <p>• Lavage délicat en machine à 30°C sur l’envers</p>
                  <p>• Séchage à l'air libre recommandé</p>
                  <p>• Repassage doux sur l’envers</p>
                </div>
              )}
            </div>

            {/* Reassurance pills */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1b082e] text-[11px] text-zinc-400 font-light">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#8B00FF]" />
                <span>Expédition 24/48h</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#8B00FF]" />
                <span>Retours 14 jours</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
