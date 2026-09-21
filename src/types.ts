export type ProductCategory =
  | 'ALL'
  | 'NEW'
  | 'HOODIES-ZIP'
  | 'PANTS'
  | 'SHORT'
  | 'T-SHIRTS'
  | 'KNIT'
  | 'JACKETS'
  | 'ACCESSORIES'
  | 'SALES';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isSoldOut?: boolean;
  isSale?: boolean;
  badge?: string;
  description: string;
  details: {
    composition: string;
    fit: string;
    weight: string;
    origin: string;
    features: string[];
  };
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  images: string[];
  stockCount: number;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmée' | 'En préparation' | 'Expédiée' | 'Livrée';
  trackingCode: string;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface VipMember {
  email: string;
  fullName: string;
  tier: 'MEMBRE' | 'VIP' | 'PRIVILEGE' | 'INITIATE' | 'CYBER_VIP' | 'UNDERGROUND_CORE';
  points: number;
  memberCode: string;
  joinedDate: string;
}
