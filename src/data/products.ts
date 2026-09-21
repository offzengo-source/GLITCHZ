import { Product, ProductCategory } from '../types';

export const GLITCHZ_PRODUCTS: Product[] = [
  {
    id: 'glitch-hoodie-01',
    code: 'GZ-HD01-BLK',
    name: 'HEAVY ZIP HOODIE 480 GSM',
    category: 'HOODIES-ZIP',
    price: 145,
    isNew: true,
    badge: 'NEW DROP',
    description: 'Hoodie zippé coupe boxy oversize confectionné en molleton lourd 480 GSM. Double zip métallique noir mat, finitions bords-côtes renforcées et discret logo GLITCHZ brodé en violet sur la poitrine.',
    details: {
      composition: '100% Coton biologique peigné 480 GSM',
      fit: 'Coupe Boxy Oversize',
      weight: '480 GSM Molleton Lourd',
      origin: 'Confectionné au Portugal',
      features: [
        'Fermeture zippée bidirectionnelle YKK noir mat',
        'Broderie logo GLITCHZ violet haute densité sur le torse',
        'Finitions bord-côtes 2x2 aux poignets et à l’ourlet',
        'Poches plaquées biseautées et passepoil intérieur'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Pur', hex: '#000000' },
      { name: 'Violet Nuit', hex: '#3b0764' }
    ],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 14,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'glitch-jacket-01',
    code: 'GZ-JK01-TEC',
    name: 'TACTICAL CROPPED JACKET',
    category: 'JACKETS',
    price: 160,
    isNew: true,
    badge: 'LIMITED',
    description: 'Veste structurée en toile technique déperlante triple couche. Coupe cropped contemporaine, empiècements géométriques nets et tirettes de zip accentuées de violet.',
    details: {
      composition: '100% Nylon technique résistant à l’abrasion',
      fit: 'Coupe Boxy Cropped',
      weight: 'Toile technique 3 couches',
      origin: 'Confectionné au Portugal',
      features: [
        'Zips étanches avec tirettes minimalistes violettes',
        'Col cheminée structuré avec fermeture pressionnée',
        'Poches poitrine asymétriques à accès rapide',
        'Doublure satinée respirante ton sur ton'
      ]
    },
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Noir Profond', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 8,
    rating: 5.0,
    reviewsCount: 26
  },
  {
    id: 'glitch-pants-01',
    code: 'GZ-PT01-CRG',
    name: 'WIDE LEG CARGO PANTS',
    category: 'PANTS',
    price: 135,
    isNew: true,
    description: 'Pantalon cargo taille haute à jambe large et tombé droit. Tissu sergé de coton peigné haut de gamme avec poches volumétriques plates et pattes de serrage.',
    details: {
      composition: '98% Coton Sergé Lourd, 2% Élasthanne',
      fit: 'Wide Leg / Jambe Large Droite',
      weight: '380 GSM Sergé Robuste',
      origin: 'Confectionné au Portugal',
      features: [
        '6 poches ergonomiques structurées',
        'Pattes d’ajustement latérales à la taille',
        'Plis d’aisance aux genoux',
        'Boutonnerie gravée GLITCHZ noir mat'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Minéral', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 11,
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'glitch-pants-03',
    code: 'GZ-PT03-JOG',
    name: 'PREMIUM FLEECE JOGGERS',
    category: 'PANTS',
    price: 115,
    isSoldOut: true,
    description: 'Jogging haut de gamme en molleton de coton lourd non gratté. Tombé droit épuré, ceinture élastique épaisse à cordons de serrage à embouts violets.',
    details: {
      composition: '100% Coton biologique 450 GSM',
      fit: 'Relaxed Straight Fit',
      weight: '450 GSM Molleton Peigné',
      origin: 'Confectionné au Portugal',
      features: [
        'Cordon tubulaire lourd avec embouts en alliage violet',
        'Deux poches cavalières profondes et une poche plaquée dos',
        'Montage sans coutures latérales pour un tombé fluide'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Sombre', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 0,
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: 'glitch-tee-01',
    code: 'GZ-TE01-NTO',
    name: 'BOXY HEAVYWEIGHT TEE 320 GSM',
    category: 'T-SHIRTS',
    price: 65,
    isNew: true,
    badge: 'BESTSELLER',
    description: 'T-shirt signature coupe boxy carrée. Coton peigné 320 GSM ultra-dense, col montant renforcé 3 cm et logo GLITCHZ imprimé ton sur ton au dos.',
    details: {
      composition: '100% Coton peigné cardé 320 GSM',
      fit: 'Coupe Boxy Tombante',
      weight: '320 GSM Ultra Lourd',
      origin: 'Confectionné au Portugal',
      features: [
        'Col rond montant serré 3 cm double piqûre',
        'Épaules tombantes et emmanchures basses',
        'Étiquette tissée intérieure violette numérotée'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Intégral', hex: '#000000' },
      { name: 'Violet Nuit', hex: '#3b0764' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 20,
    rating: 4.9,
    reviewsCount: 56
  },
  {
    id: 'glitch-polo-01',
    code: 'GZ-PL01-PIQ',
    name: 'MINIMALIST HEAVY PIQUÉ POLO',
    category: 'T-SHIRTS',
    price: 90,
    isNew: true,
    description: 'Polo contemporain en piqué de coton 280 GSM. Patte de boutonnage dissimulée, col sans bouton et fente latérale rehaussée d’un point d’arrêt violet.',
    details: {
      composition: '100% Coton piqué peigné 280 GSM',
      fit: 'Relaxed Drop-Shoulder',
      weight: '280 GSM',
      origin: 'Confectionné au Portugal',
      features: [
        'Patte de boutonnage cachée pour une ligne ultra pure',
        'Col en maille plate sans boutons apparents',
        'Point d’arrêt de finition violette aux fentes latérales'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Mat', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 16,
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: 'glitch-knit-01',
    code: 'GZ-KN01-OVS',
    name: 'HEAVYWEIGHT OVERSIZE KNIT',
    category: 'KNIT',
    price: 150,
    badge: 'ARCHIVE',
    description: 'Pull en maille côtelée épaisse tricoté à jauge 5. Laine mérinos et coton peigné avec col ras-du-cou épais et emmanchures raglan.',
    details: {
      composition: '50% Laine Mérinos Certifiée RWS, 50% Coton Peigné',
      fit: 'Oversize Décontracté',
      weight: 'Tricot jauge 5 extra-lourd',
      origin: 'Tricoté en Italie',
      features: [
        'Bords-côtes 2x2 épais au col, aux manches et à la base',
        'Tissage texturé d’une grande densité et toucher doux',
        'Finitions assemblées à la main'
      ]
    },
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Noir Profond', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 9,
    rating: 5.0,
    reviewsCount: 21
  },
  {
    id: 'glitch-hoodie-02',
    code: 'GZ-HD02-PUL',
    name: 'OVERSIZED PULLOVER HOODIE',
    category: 'HOODIES-ZIP',
    price: 130,
    isSoldOut: true,
    description: 'Hoodie classique sans zip à capuche double épaisseur sans cordons. Molleton 450 GSM ultra-lourd au tombé sculptural et poche kangourou minimaliste.',
    details: {
      composition: '100% Coton peigné lourd',
      fit: 'Coupe Balenciaga Boxy',
      weight: '450 GSM',
      origin: 'Confectionné au Portugal',
      features: [
        'Capuche généreuse double épaisseur sans cordon',
        'Poche kangourou invisible aux coutures bordées',
        'Teinture en pièce pigmentaire noir minéral'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Absolu', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 0,
    rating: 4.9,
    reviewsCount: 39
  },
  {
    id: 'glitch-short-01',
    code: 'GZ-SH01-MSH',
    name: 'HEAVY FLEECE SWEAT SHORTS',
    category: 'SHORT',
    price: 85,
    description: 'Short en molleton lourd avec ceinture élastique épaisse, cordons de serrage à embouts métalliques et poches profondes à zips invisibles.',
    details: {
      composition: '100% Coton biologique 420 GSM',
      fit: 'Coupe au genou ample',
      weight: '420 GSM',
      origin: 'Confectionné au Portugal',
      features: [
        'Ceinture élastique côtelée avec cordon intérieur',
        'Embouts métalliques noirs mats gravés',
        'Deux poches latérales zippées invisibles'
      ]
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Pur', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 15,
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: 'glitch-tee-02',
    code: 'GZ-TE02-DAT',
    name: 'ESSENTIAL MINIMAL TEE',
    category: 'T-SHIRTS',
    price: 60,
    originalPrice: 80,
    isSale: true,
    badge: 'ARCHIVE SALE',
    description: 'T-shirt coupe droite en jersey lourd 260 GSM. Encolure ronde propre, toucher doux et discret marquage typographique GLITCHZ.',
    details: {
      composition: '100% Coton biologique peigné',
      fit: 'Straight Relaxed Fit',
      weight: '260 GSM',
      origin: 'Confectionné au Portugal',
      features: [
        'Jersey simple peigné compact anti-boulochage',
        'Col en bord-côte fin 2 cm',
        'Surpiqûres ton sur ton haute précision'
      ]
    },
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Noir Anthracite', hex: '#121118' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 7,
    rating: 4.8,
    reviewsCount: 35
  },
  {
    id: 'glitch-acc-01',
    code: 'GZ-AC01-BAL',
    name: 'RIB-KNIT BALACLAVA',
    category: 'ACCESSORIES',
    price: 65,
    isNew: true,
    badge: 'NEW',
    description: 'Cagoule passe-montagne en tricot de laine mérinos fine et coton. Coupe anatomique précise avec discrète étiquette tissée violette.',
    details: {
      composition: '50% Laine Mérinos, 50% Coton Peigné',
      fit: 'Ajusté ergonomique',
      weight: 'Tricot double jauge fin',
      origin: 'Fabriqué en Italie',
      features: [
        'Port polyvalent : passe-montagne ou col relevé',
        'Maille respirante et douce sans frottement',
        'Étiquette tissée violette GLITCHZ sur l’ourlet'
      ]
    },
    sizes: ['UNIQUE'],
    colors: [
      { name: 'Noir Sombre', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 18,
    rating: 4.9,
    reviewsCount: 25
  },
  {
    id: 'glitch-acc-02',
    code: 'GZ-AC02-BAG',
    name: 'CORDURA UTILITY CROSSBODY BAG',
    category: 'ACCESSORIES',
    price: 95,
    badge: 'BESTSELLER',
    description: 'Sacoche minimaliste en Cordura 1000D étanche noir. Fermoir à boucle rapide métallique et tirette violette.',
    details: {
      composition: '100% Cordura Ballistic 1000D étanche',
      fit: 'Sangle réglable port bandoulière ou ceinture',
      weight: 'Capacité 3.2 Litres',
      origin: 'Confectionné au Portugal',
      features: [
        'Boucle rapide en métal noir mat',
        'Compartiment principal zippé étanche YKK',
        'Poche intérieure pour téléphone et passeport',
        'Liseré discret violet intérieur'
      ]
    },
    sizes: ['UNIQUE'],
    colors: [
      { name: 'Noir Pur', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 11,
    rating: 5.0,
    reviewsCount: 33
  },
  {
    id: 'glitch-jacket-02',
    code: 'GZ-JK02-BOM',
    name: 'MINIMAL MA-1 BOMBER JACKET',
    category: 'JACKETS',
    price: 160,
    originalPrice: 190,
    isSale: true,
    badge: 'SALE -20%',
    description: 'Bomber réinterprété en nylon satiné mat déperlant. Lignes pures, col et poignets en tricot dense, finitions intérieures soignées.',
    details: {
      composition: '100% Nylon mat déperlant haute résistance',
      fit: 'Oversize Contemporain',
      weight: 'Doublure thermique légère',
      origin: 'Confectionné au Portugal',
      features: [
        'Zip métallique noir mat YKK',
        'Poches repose-mains à rabats pressionnés',
        'Poche zippée sur la manche gauche avec tirette discrète violette'
      ]
    },
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Noir Satiné', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    stockCount: 6,
    rating: 4.9,
    reviewsCount: 27
  }
];

export const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
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
];
