import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Check, X } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: string) => void;
}

type SortOption = 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onOpenDetail,
  onQuickAdd,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('NEWEST');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(160);

  // Defined categories matching user's exact request:
  // "Catégories : Hoodies, Vestes, Joggings, T-shirts, Jeans, Polos, Accessoires"
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'ALL', label: 'All' },
    { id: 'HOODIES-ZIP', label: 'Hoodies' },
    { id: 'JACKETS', label: 'Vestes' },
    { id: 'PANTS', label: 'Joggings & Pants' },
    { id: 'T-SHIRTS', label: 'T-shirts & Polos' },
    { id: 'KNIT', label: 'Mailles' },
    { id: 'SHORT', label: 'Shorts' },
    { id: 'ACCESSORIES', label: 'Accessoires' },
    { id: 'SALES', label: 'Sales' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === 'NEW') {
          if (!p.isNew) return false;
        } else if (selectedCategory === 'SALES') {
          if (!p.isSale) return false;
        } else if (selectedCategory !== 'ALL') {
          if (p.category !== selectedCategory) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Availability filter
        if (inStockOnly && p.isSoldOut) {
          return false;
        }

        // Price filter (60€ - 160€)
        if (p.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') return a.price - b.price;
        if (sortBy === 'PRICE_DESC') return b.price - a.price;
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  return (
    <section id="products-section" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1b082e]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1b082e]">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#A855F7] uppercase block mb-2">
              CATALOGUE OFFICIEL
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              NEW COLLECTION
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-6 text-xs text-zinc-400">
            <span>{filteredProducts.length} pièces</span>
            
            {/* View all button underlined in violet */}
            <button
              id="view-all-top-btn"
              onClick={() => onSelectCategory('ALL')}
              className={`font-semibold tracking-wider uppercase pb-1 transition-colors duration-150 border-b ${
                selectedCategory === 'ALL'
                  ? 'border-[#8B00FF] text-white'
                  : 'border-transparent text-zinc-400 hover:text-white hover:border-[#8B00FF]'
              }`}
            >
              View all
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id.toLowerCase()}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-150 whitespace-nowrap font-medium border ${
                  isSelected
                    ? 'bg-[#8B00FF] text-white border-[#8B00FF]'
                    : 'bg-black text-zinc-400 hover:text-white border-[#240c38] hover:border-[#8B00FF]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-black border border-[#1b082e] p-4 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Left Controls: Availability & Price Slider */}
          <div className="flex flex-wrap items-center gap-6">
            
            {/* In-Stock Filter */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-300 hover:text-white">
              <input
                id="filter-in-stock-checkbox"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="hidden"
              />
              <span className={`w-4 h-4 border flex items-center justify-center transition-colors duration-150 ${
                inStockOnly ? 'bg-[#8B00FF] border-[#8B00FF]' : 'border-[#33114d] bg-black'
              }`}>
                {inStockOnly && <Check className="w-3 h-3 text-white" />}
              </span>
              <span>En stock uniquement</span>
            </label>

            {/* Price Max Slider (60€ - 160€) */}
            <div className="flex items-center gap-2.5">
              <span className="text-zinc-400">Prix max :</span>
              <input
                id="filter-price-slider"
                type="range"
                min="60"
                max="160"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#8B00FF] w-28 cursor-pointer bg-zinc-800"
              />
              <span className="text-white font-semibold min-w-[42px]">{maxPrice} €</span>
            </div>

            {/* Active search tag */}
            {searchQuery && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#160624] border border-[#8B00FF]/40 text-[#A855F7]">
                <span>Recherche: "{searchQuery}"</span>
                <button
                  id="clear-search-query-btn"
                  onClick={onClearSearch}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Sort selector */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Trier par :</span>
            <select
              id="sort-products-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-black border border-[#240c38] focus:border-[#8B00FF] text-white px-3 py-1.5 text-xs focus:outline-none"
            >
              <option value="NEWEST">Nouveautés</option>
              <option value="PRICE_ASC">Prix croissant (60€ - 160€)</option>
              <option value="PRICE_DESC">Prix décroissant (160€ - 60€)</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-black border border-[#1b082e] p-8">
            <div className="text-lg font-bold text-white mb-2">Aucun article trouvé</div>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
              Aucun produit ne correspond à vos filtres actuels.
            </p>
            <button
              id="reset-all-filters-btn"
              onClick={() => {
                onSelectCategory('ALL');
                setMaxPrice(160);
                setInStockOnly(false);
                onClearSearch();
              }}
              className="px-6 py-2.5 bg-[#8B00FF] hover:bg-[#7700db] text-white text-xs uppercase font-semibold tracking-wider transition-colors duration-150"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Bouton "View all" souligné en violet en bas de grille */}
        <div className="mt-16 text-center">
          <button
            id="view-all-bottom-btn"
            onClick={() => {
              onSelectCategory('ALL');
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block text-white hover:text-[#A855F7] font-semibold text-sm tracking-[0.2em] uppercase pb-1.5 border-b-2 border-[#8B00FF] transition-colors duration-200"
          >
            View all
          </button>
        </div>

      </div>
    </section>
  );
};
