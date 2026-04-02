import { MSTTier, UndertoneClass } from "@/types";

export interface AffiliateProduct {
  id:          string;
  brand:       string;
  name:        string;
  shadeName:   string;
  category:    "foundation" | "concealer" | "powder" | "primer" | "setting-spray";
  price:       number;
  currency:    string;
  imageUrl:    string;    // placeholder — swap for real CDN URLs
  affiliateUrl: string;
  retailer:    "sephora" | "ulta" | "boots" | "lookfantastic";
  matchReason: string;
  swatchHsl:   string;   // approximate colour for CSS swatch preview
}

// In production, this is a DB query filtered by MST + undertone.
// Here we return a curated static list per tier group.

const WARM_PRODUCTS: AffiliateProduct[] = [
  {
    id: "fw-001",
    brand: "Charlotte Tilbury",
    name: "Airbrush Flawless Foundation",
    shadeName: "5 Warm",
    category: "foundation",
    price: 36,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/E8C9B8/5C3D2E?text=CT",
    affiliateUrl: "https://www.charlottetilbury.com/uk/product/airbrush-flawless-foundation",
    retailer: "lookfantastic",
    matchReason: "Golden-warm undertone, medium coverage",
    swatchHsl: "hsl(22,45%,72%)",
  },
  {
    id: "fw-002",
    brand: "NARS",
    name: "Natural Radiant Longwear Foundation",
    shadeName: "Syracuse",
    category: "foundation",
    price: 42,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/D4A882/3D2010?text=NARS",
    affiliateUrl: "https://www.narscosmetics.co.uk/natural-radiant-longwear-foundation",
    retailer: "sephora",
    matchReason: "Warm medium-tan, dewy finish",
    swatchHsl: "hsl(25,40%,67%)",
  },
  {
    id: "fw-003",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte",
    shadeName: "230W",
    category: "foundation",
    price: 34,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/C89870/2E1A08?text=FB",
    affiliateUrl: "https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation",
    retailer: "boots",
    matchReason: "Warm neutral, full coverage matte",
    swatchHsl: "hsl(28,38%,61%)",
  },
  {
    id: "fw-004",
    brand: "Laura Mercier",
    name: "Tinted Moisturiser",
    shadeName: "4W1 Tawny",
    category: "foundation",
    price: 48,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/C8956A/2E1A08?text=LM",
    affiliateUrl: "https://www.lauramercier.com/tinted-moisturizer",
    retailer: "lookfantastic",
    matchReason: "Warm tawny, natural SPF 20 finish",
    swatchHsl: "hsl(24,42%,60%)",
  },
];

const COOL_PRODUCTS: AffiliateProduct[] = [
  {
    id: "fc-001",
    brand: "MAC",
    name: "Studio Fix Fluid",
    shadeName: "NC25",
    category: "foundation",
    price: 32,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/DDBBAA/3A1F15?text=MAC",
    affiliateUrl: "https://www.maccosmetics.co.uk/studio-fix-fluid",
    retailer: "boots",
    matchReason: "Cool-neutral, full coverage, long-wear",
    swatchHsl: "hsl(15,35%,76%)",
  },
  {
    id: "fc-002",
    brand: "Giorgio Armani",
    name: "Luminous Silk Foundation",
    shadeName: "4 — Cool Beige",
    category: "foundation",
    price: 58,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/D8B8A8/382015?text=GA",
    affiliateUrl: "https://www.giorgioarmanibeauty.co.uk/luminous-silk-foundation",
    retailer: "lookfantastic",
    matchReason: "Cool beige, luminous satin finish",
    swatchHsl: "hsl(18,32%,75%)",
  },
  {
    id: "fc-003",
    brand: "Dior",
    name: "Forever Skin Glow",
    shadeName: "2N Neutral",
    category: "foundation",
    price: 49,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/E0C0B0/3D2018?text=Dior",
    affiliateUrl: "https://www.dior.com/en_gb/beauty/makeup/face/foundation",
    retailer: "sephora",
    matchReason: "Cool neutral, 24h glow finish with SPF",
    swatchHsl: "hsl(16,38%,78%)",
  },
  {
    id: "fc-004",
    brand: "Estee Lauder",
    name: "Double Wear Stay-in-Place",
    shadeName: "2C2 Pale Almond",
    category: "foundation",
    price: 40,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/E2C4B0/3D2018?text=EL",
    affiliateUrl: "https://www.esteelauder.co.uk/double-wear-stay-in-place-makeup",
    retailer: "boots",
    matchReason: "Cool almond, 24h matte coverage",
    swatchHsl: "hsl(20,36%,79%)",
  },
];

const NEUTRAL_PRODUCTS: AffiliateProduct[] = [
  {
    id: "fn-001",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeName: "220W",
    category: "foundation",
    price: 29,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/D4AA88/3D2010?text=RB",
    affiliateUrl: "https://www.rarebeauty.com/products/liquid-touch-weightless-foundation",
    retailer: "sephora",
    matchReason: "Neutral medium, buildable coverage",
    swatchHsl: "hsl(26,38%,68%)",
  },
  {
    id: "fn-002",
    brand: "ILIA",
    name: "True Skin Serum Foundation",
    shadeName: "SF5 Koh Lanta",
    category: "foundation",
    price: 52,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/CCA880/3A1E0A?text=ILIA",
    affiliateUrl: "https://iliabeauty.com/products/true-skin-serum-foundation",
    retailer: "lookfantastic",
    matchReason: "Neutral warm, skincare-foundation hybrid",
    swatchHsl: "hsl(28,36%,65%)",
  },
  {
    id: "fn-003",
    brand: "Tower 28",
    name: "Make It Last Pressed Powder",
    shadeName: "Medium",
    category: "powder",
    price: 24,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/C8A070/3A1E0A?text=T28",
    affiliateUrl: "https://tower28beauty.com",
    retailer: "sephora",
    matchReason: "Setting powder, neutral undertone",
    swatchHsl: "hsl(30,36%,62%)",
  },
  {
    id: "fn-004",
    brand: "Bobbi Brown",
    name: "Skin Long-Wear Weightless Foundation",
    shadeName: "Warm Natural",
    category: "foundation",
    price: 46,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/C89C72/3A1E0A?text=BB",
    affiliateUrl: "https://www.bobbibrown.co.uk/skin-long-wear-weightless-foundation",
    retailer: "boots",
    matchReason: "Warm neutral, 16h weightless coverage",
    swatchHsl: "hsl(27,38%,62%)",
  },
];

// Complementary products shown to everyone
const COMPLEMENTS: AffiliateProduct[] = [
  {
    id: "cp-001",
    brand: "Charlotte Tilbury",
    name: "Flawless Filter",
    shadeName: "3 — Light-Medium",
    category: "primer",
    price: 39,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/F0D8C8/5C3D2E?text=CT",
    affiliateUrl: "https://www.charlottetilbury.com/uk/product/flawless-filter",
    retailer: "lookfantastic",
    matchReason: "Skin-perfecting glow primer",
    swatchHsl: "hsl(22,50%,86%)",
  },
  {
    id: "cp-002",
    brand: "Urban Decay",
    name: "All Nighter Setting Spray",
    shadeName: "Original",
    category: "setting-spray",
    price: 28,
    currency: "GBP",
    imageUrl: "https://placehold.co/200x200/E8E0F0/3A204A?text=UD",
    affiliateUrl: "https://www.urbandecay.co.uk/all-nighter-long-lasting-makeup-setting-spray",
    retailer: "boots",
    matchReason: "16hr wear lock for your foundation",
    swatchHsl: "hsl(260,30%,88%)",
  },
];

export function getProductSuggestions(
  mstTier: MSTTier,
  undertone: UndertoneClass
): AffiliateProduct[] {
  const base =
    undertone === "warm" || undertone === "golden_warm" ? WARM_PRODUCTS :
    undertone === "cool" || undertone === "pink_cool"   ? COOL_PRODUCTS :
    NEUTRAL_PRODUCTS;

  // For deeper tones (MST 7–10), nudge towards fuller-coverage picks
  const ordered = mstTier >= 7
    ? [...base].sort((a) => a.category === "foundation" ? -1 : 1)
    : base;

  return [...ordered, ...COMPLEMENTS];
}
