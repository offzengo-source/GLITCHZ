import React, { useState, useEffect } from 'react';
import { GLITCHZ_PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, Order, VipMember } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { VipSection } from './components/VipSection';
import { ReassuranceSection } from './components/ReassuranceSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { ContactModal } from './components/ContactModal';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';

const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-init-1',
    orderNumber: 'GZ-894210',
    date: '14 Septembre 2026',
    items: [
      {
        cartItemId: 'sample-1',
        product: GLITCHZ_PRODUCTS[3], // ARCHIVE MINIMAL TEE
        selectedSize: 'L',
        selectedColor: 'Onyx Black',
        quantity: 1,
      },
    ],
    subtotal: 65,
    discount: 6.5,
    shipping: 0,
    total: 58.5,
    status: 'Livrée',
    trackingCode: 'DHL-99214712',
    customer: {
      fullName: 'Alexandre Vane',
      email: 'alex.vane@gmail.com',
      address: '14 Rue de Charonne',
      city: 'Paris',
      postalCode: '75011',
      country: 'France',
    },
  },
];

export default function App() {
  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Cart State (stored in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('glitchz_cart');
      return saved ? JSON.parse(saved) : [
        // Seed 1 piece initially so the user immediately sees a working cart preview!
        {
          cartItemId: 'cart-init-item',
          product: GLITCHZ_PRODUCTS[0], // CYBER HOODIE ZIP
          selectedSize: 'L',
          selectedColor: 'Pure Obsidian',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  // Discount / Coupons
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('GLITCHZ10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  // Orders State (stored in localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('glitchz_orders');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  // VIP Member state (stored in localStorage)
  const [vipMember, setVipMember] = useState<VipMember | null>(() => {
    try {
      const saved = localStorage.getItem('glitchz_vip_member');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('glitchz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('glitchz_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (vipMember) {
      localStorage.setItem('glitchz_vip_member', JSON.stringify(vipMember));
    }
  }, [vipMember]);

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`${product.name} (${size}) ajouté au panier !`);
  };

  const handleQuickAdd = (product: Product, size: string, color: string) => {
    handleAddToCart(product, size, color, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyDiscountCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GLITCHZ10') {
      setAppliedDiscountCode('GLITCHZ10');
      setDiscountPercent(10);
      return { success: true, message: 'Code GLITCHZ10 validé : -10% sur votre commande !' };
    }
    if (cleanCode === 'VIP15' || cleanCode.startsWith('GLITCH-VIP-')) {
      setAppliedDiscountCode(cleanCode);
      setDiscountPercent(15);
      return { success: true, message: `Code VIP ${cleanCode} activé : -15% privilège !` };
    }
    return { success: false, message: 'Code promo inconnu ou expiré.' };
  };

  // VIP Join
  const handleJoinVip = (email: string, name: string): VipMember => {
    const memberCode = `GLITCH-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMember: VipMember = {
      email,
      fullName: name,
      tier: 'PRIVILEGE',
      points: 500,
      memberCode,
      joinedDate: new Date().toLocaleDateString('fr-FR'),
    };
    setVipMember(newMember);
    setAppliedDiscountCode(memberCode);
    setDiscountPercent(15);
    showToast(`Bienvenue au Club VIP GLITCHZ ! Code -15% activé (${memberCode})`);
    return newMember;
  };

  const handleOrderCreated = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    showToast(`Commande ${order.orderNumber} confirmée avec succès !`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#8B00FF] selection:text-white font-sans antialiased relative">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-8 right-6 z-50 bg-black border border-[#8B00FF] px-4 py-3 text-xs text-white flex items-center gap-2.5 transition-all"
        >
          <div className="w-5 h-5 bg-[#8B00FF] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenVip={() => {
          const el = document.getElementById('vip-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Fullscreen Cyber Hero */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onVipClick={() => {
            const el = document.getElementById('vip-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Streetwear Products Catalog */}
        <ProductGrid
          products={GLITCHZ_PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onOpenDetail={(product) => setSelectedProductForDetail(product)}
          onQuickAdd={handleQuickAdd}
        />

        {/* VIP & Loyalty Section */}
        <VipSection
          vipMember={vipMember}
          onJoinVip={handleJoinVip}
        />

        {/* Reassurance Pillars (Payment, Delivery, Returns, Support) */}
        <ReassuranceSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenVip={() => {
          const el = document.getElementById('vip-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscountCode={appliedDiscountCode}
        onApplyDiscountCode={handleApplyDiscountCode}
        discountPercent={discountPercent}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
        appliedDiscountCode={appliedDiscountCode}
        discountPercent={discountPercent}
        onOrderCreated={handleOrderCreated}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={orders}
        vipMember={vipMember}
        onOpenVip={() => {
          setIsAccountOpen(false);
          const el = document.getElementById('vip-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
