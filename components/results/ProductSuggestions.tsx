"use client";

import { AffiliateProduct } from "@/lib/productCatalog";
import { MSTTier, UndertoneClass } from "@/types";

const RETAILER_BADGE: Record<string, { label: string; color: string }> = {
  sephora:       { label: "Sephora",        color: "bg-black text-white" },
  ulta:          { label: "Ulta Beauty",    color: "bg-red-600 text-white" },
  boots:         { label: "Boots",          color: "bg-blue-700 text-white" },
  lookfantastic: { label: "Look Fantastic", color: "bg-rose-600 text-white" },
};

const CATEGORY_LABEL: Record<string, string> = {
  foundation:    "Foundation",
  concealer:     "Concealer",
  powder:        "Powder",
  primer:        "Primer",
  "setting-spray": "Setting Spray",
};

function ProductCard({ product }: { product: AffiliateProduct }) {
  const badge  = RETAILER_BADGE[product.retailer];
  const catLabel = CATEGORY_LABEL[product.category] ?? product.category;

  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 min-w-[200px] max-w-[220px] shrink-0"
    >
      {/* Product image area */}
      <div className="relative bg-cream-d aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Swatch pip */}
        <div
          className="absolute bottom-3 right-3 w-7 h-7 rounded-full border-2 border-white shadow-md"
          style={{ background: product.swatchHsl }}
          title={product.shadeName}
        />
        {/* Retailer badge */}
        <span className={`absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-1 p-4 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-muted font-body">
          {catLabel}
        </span>
        <p className="text-[11px] text-muted font-body">{product.brand}</p>
        <p className="text-sm font-semibold text-charcoal font-body leading-tight">
          {product.name}
        </p>
        <p className="text-[11px] text-rose font-body italic mt-0.5">
          {product.shadeName}
        </p>
        <p className="text-[10px] text-muted/70 font-body leading-tight mt-1">
          {product.matchReason}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-charcoal">
            £{product.price}
          </span>
          <span className="text-[11px] text-rose font-semibold font-body group-hover:underline">
            Shop →
          </span>
        </div>
      </div>
    </a>
  );
}

interface Props {
  products:  AffiliateProduct[];
  mstTier:   MSTTier;
  undertone: UndertoneClass;
}

export function ProductSuggestions({ products, mstTier, undertone }: Props) {
  if (!products.length) return null;

  const foundations = products.filter((p) => p.category === "foundation");
  const complements = products.filter((p) => p.category !== "foundation");

  return (
    <section className="flex flex-col gap-8 animate-fade-up-delay-3">

      {/* Section header */}
      <div className="flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-rose font-body">
          Curated for MST-{mstTier} · {undertone.replace(/_/g, " ")} undertone
        </p>
        <h2 className="font-display text-3xl font-light text-charcoal italic">
          Shop Your Matches
        </h2>
        <p className="text-sm text-muted font-body">
          Handpicked foundations and finishing products compatible with your exact skin profile.
        </p>
      </div>

      {/* Foundations horizontal scroll */}
      <div className="flex flex-col gap-3">
        <h3 className="font-body text-xs uppercase tracking-widest text-muted">
          Foundations
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-thin">
          {foundations.map((p) => (
            <div key={p.id} className="snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Complements */}
      {complements.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-body text-xs uppercase tracking-widest text-muted">
            Complete Your Base
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {complements.map((p) => (
              <div key={p.id} className="snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[10px] text-muted/50 font-body text-center">
        Shade Matrix may earn a commission on purchases via affiliate links above.
        Recommendations are based solely on your colour science profile.
      </p>
    </section>
  );
}
