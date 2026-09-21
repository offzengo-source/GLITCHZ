import React, { useState } from 'react';
import { ShoppingBag, User, Sparkles, Search, Menu, X } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenVip: () => void;
  onOpenContact: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenAccount,
  onOpenVip,
  onOpenContact,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems: { id: ProductCategory | 'HOME' | 'CONTACT'; label: string }[] = [
    { id: 'HOME', label: 'HOME' },
    { id: 'ALL', label: 'ALL' },
    { id: 'NEW', label: 'NEW' },
    { id: 'HOODIES-ZIP', label: 'HOODIES-ZIP' },
    { id: 'PANTS', label: 'PANTS' },
    { id: 'SHORT', label: 'SHORT' },
    { id: 'T-SHIRTS', label: 'T-SHIRTS' },
    { id: 'KNIT', label: 'KNIT' },
    { id: 'JACKETS', label: 'JACKETS' },
    { id: 'ACCESSORIES', label: 'ACCESSORIES' },
    { id: 'SALES', label: 'SALES' },
    { id: 'CONTACT', label: 'CONTACT' },
  ];

  const handleNavClick = (id: ProductCategory | 'HOME' | 'CONTACT') => {
    setMobileMenuOpen(false);
    if (id === 'HOME') {
      onSelectCategory('ALL');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'CONTACT') {
      onOpenContact();
    } else {
      onSelectCategory(id as ProductCategory);
      const targetEl = document.getElementById('products-section');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black border-b border-[#1b082e] transition-colors duration-200">
      {/* Discreet Announcement Bar */}
      <div className="bg-[#05020a] border-b border-[#150622] py-2 px-4 text-[11px] uppercase tracking-wider text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B00FF]" />
            <span className="text-white font-medium">DROP 004 DISPONIBLE</span>
            <span className="text-zinc-600 hidden sm:inline">—</span>
            <span className="text-zinc-400 hidden sm:inline">LIVRAISON OFFERTE DÈS 120€</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="header-top-vip-btn"
              onClick={onOpenVip}
              className="text-[#A855F7] hover:text-white transition-colors duration-150 font-medium flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#8B00FF]" />
              <span>ESPACE VIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo GLITCHZ - bold, clean, pure typography without distortion */}
          <div className="flex-shrink-0 flex items-center">
            <button
              id="header-logo-btn"
              onClick={() => handleNavClick('HOME')}
              className="text-left focus:outline-none group"
            >
              <span className="font-extrabold text-2xl sm:text-3xl tracking-[0.18em] text-white uppercase transition-colors duration-150 group-hover:text-zinc-200">
                GLITCHZ
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-3 overflow-x-auto py-2">
            {navItems.map((item) => {
              const isActive = (item.id === 'HOME' && selectedCategory === 'ALL') || selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id.toLowerCase()}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2 py-1 text-xs tracking-wider transition-colors duration-150 uppercase whitespace-nowrap font-medium ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-[#A855F7]'
                  } ${item.id === 'SALES' ? 'text-[#A855F7]' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#8B00FF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Input toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-black border border-[#8B00FF] px-3 py-1.5 w-44 sm:w-60 transition-all">
                  <Search className="w-3.5 h-3.5 text-[#A855F7] mr-2" />
                  <input
                    id="header-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherche..."
                    className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                    autoFocus
                  />
                  <button
                    id="header-close-search-btn"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="header-open-search-btn"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors duration-150"
                  aria-label="Recherche"
                  title="Rechercher"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* VIP Link Button */}
            <button
              id="header-vip-btn"
              onClick={onOpenVip}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs tracking-wider font-semibold text-[#A855F7] hover:text-white border border-[#8B00FF]/40 hover:border-[#8B00FF] transition-colors duration-150"
            >
              VIP
            </button>

            {/* My Account */}
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-2 text-zinc-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5 text-xs font-medium"
              title="My Account"
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">My Account</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-zinc-300 hover:text-white transition-colors duration-150"
              aria-label="Panier"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span
                  id="header-cart-count"
                  className="absolute -top-1 -right-1 bg-[#8B00FF] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-zinc-300 hover:text-white transition-colors duration-150"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-black border-b border-[#1b082e] px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1b082e]">
            {navItems.map((item) => {
              const isActive = (item.id === 'HOME' && selectedCategory === 'ALL') || selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id.toLowerCase()}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 text-xs tracking-wider transition-colors duration-150 uppercase ${
                    isActive
                      ? 'bg-[#150624] text-white font-bold border-l-2 border-[#8B00FF]'
                      : 'text-zinc-400 hover:text-white'
                  } ${item.id === 'SALES' ? 'text-[#A855F7]' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              id="mobile-nav-vip-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVip();
              }}
              className="flex items-center gap-2 text-xs text-[#A855F7] px-3 py-2.5 bg-black border border-[#8B00FF] w-full justify-center hover:bg-[#8B00FF] hover:text-white transition-colors duration-150"
            >
              <Sparkles className="w-4 h-4" />
              <span>PROGRAMME VIP & AVANT-PREMIÈRE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
