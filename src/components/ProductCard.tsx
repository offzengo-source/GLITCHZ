import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onQuickAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isSoldOut) return;
    onQuickAdd(product, selectedSize, product.colors[0]?.name || 'Standard');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col bg-black border border-[#8B00FF]/30 hover:border-[#8B00FF] transition-colors duration-200 cursor-pointer overflow-hidden"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
        {product.isSoldOut ? (
          <span className="px-2.5 py-1 bg-[#8B00FF] text-white font-bold text-[10px] tracking-widest uppercase">
            Sold Out
          </span>
        ) : product.isSale ? (
          <span className="px-2.5 py-1 bg-[#8B00FF] text-white font-bold text-[10px] tracking-widest uppercase">
            SALE
          </span>
        ) : product.isNew ? (
          <span className="px-2 py-0.5 bg-black border border-[#8B00FF]/50 text-white font-medium text-[9px] tracking-widest uppercase">
            NEW
          </span>
        ) : null}
      </div>

      {/* Product Image - Clean luxury streetwear presentation */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] ${
            product.isSoldOut ? 'opacity-40 grayscale' : ''
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-black border-t border-[#8B00FF]/20">
        <div>
          {/* Category */}
          <div className="text-[11px] tracking-wider text-zinc-400 uppercase mb-1 font-medium">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-white tracking-tight line-clamp-1 group-hover:text-[#A855F7] transition-colors duration-150">
            {product.name}
          </h3>
        </div>

        {/* Pricing and Action */}
        <div className="mt-4 pt-3 border-t border-[#1b082e]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base sm:text-lg text-white">
                {product.price} €
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {product.originalPrice} €
                </span>
              )}
            </div>

            {/* Quick Size selection */}
            {!product.isSoldOut && product.sizes.length > 1 && (
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    id={`size-btn-${product.id}-${size.toLowerCase()}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`px-1.5 py-0.5 text-[10px] uppercase font-medium border transition-colors duration-150 ${
                      selectedSize === size
                        ? 'bg-[#8B00FF] border-[#8B00FF] text-white'
                        : 'bg-black border-[#2a1040] text-zinc-400 hover:text-white hover:border-[#8B00FF]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean CTA Button */}
          <button
            id={`product-add-btn-${product.id}`}
            disabled={product.isSoldOut}
            onClick={handleQuickAddClick}
            className={`w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-2 ${
              product.isSoldOut
                ? 'bg-[#150724] border border-[#2a1040] text-zinc-400 cursor-not-allowed'
                : justAdded
                ? 'bg-black border border-[#8B00FF] text-[#A855F7]'
                : 'bg-black hover:bg-[#8B00FF] border border-[#8B00FF]/50 hover:border-[#8B00FF] text-white'
            }`}
          >
            {product.isSoldOut ? (
              <span>Sold Out</span>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter au panier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
