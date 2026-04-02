"use client";

import { useState } from "react";
import { FunnelTier, ShadeResult, LabPoint, MSTTier, UndertoneClass } from "@/types";
import { TierSelector } from "@/components/ui/TierSelector";
import { AIScanTier } from "@/components/scanner/AIScanTier";
import { MatchCard } from "@/components/results/MatchCard";
import { ProductSuggestions } from "@/components/results/ProductSuggestions";
import { getProductSuggestions } from "@/lib/productCatalog";

export function ShadeMatrixApp() {
  const [tier, setTier]         = useState<FunnelTier>("ai");
  const [matches, setMatches]   = useState<ShadeResult[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [textQuery, setTextQuery] = useState("");
  const [skinProfile, setSkinProfile] = useState<{
    mstTier: MSTTier;
    undertoneClass: UndertoneClass;
  } | null>(null);

  const handleScanComplete = async (result: {
    skinLab: LabPoint;
    mstTier: MSTTier;
    undertoneClass: UndertoneClass;
    undertoneVector: [number, number, number];
  }) => {
    setLoading(true);
    setError(null);
    setSkinProfile({ mstTier: result.mstTier, undertoneClass: result.undertoneClass });
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinLab: result.skinLab, mstTier: result.mstTier,
          undertoneClass: result.undertoneClass,
          undertoneVector: result.undertoneVector, topN: 5,
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setMatches(data.matches ?? []);
    } catch {
      setError("Could not load matches — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextMatch = async () => {
    if (!textQuery.trim()) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/text-match", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textQuery.trim(), topN: 5 }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setMatches(data.matches ?? []);
    } catch {
      setError("Search failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setTier("ai"); setMatches([]); setError(null);
    setSkinProfile(null); setTextQuery("");
  };

  const products = skinProfile
    ? getProductSuggestions(skinProfile.mstTier, skinProfile.undertoneClass)
    : [];

  return (
    <div className="relative z-10 min-h-screen">

      {/* ── Hero header ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose font-body mb-0.5">
              Scientific Beauty
            </p>
            <h1 className="font-display text-2xl font-light text-charcoal tracking-wide">
              Shade<span className="italic"> Matrix</span>
            </h1>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <div className="flex gap-3 text-[10px] text-muted font-body uppercase tracking-widest">
              <span>CIEDE2000</span>
              <span>·</span>
              <span>MST Scale</span>
              <span>·</span>
              <span>D65 Normalised</span>
            </div>
            <p className="text-[10px] text-muted/60 font-body">96% match accuracy</p>
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-5 py-8 flex flex-col gap-8">

        {/* Intro */}
        {matches.length === 0 && !loading && (
          <div className="flex flex-col gap-2 animate-fade-up">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-charcoal leading-tight">
              Your perfect<br />
              <span className="italic text-rose">foundation,</span><br />
              scientifically.
            </h2>
            <p className="text-sm text-muted font-body max-w-sm leading-relaxed">
              We scan your skin under D65-normalised conditions, map it to a precise
              L*a*b* coordinate, and match against thousands of shades using the
              CIEDE2000 formula — not guesswork.
            </p>
          </div>
        )}

        {/* Tier selector */}
        <div className="animate-fade-up-delay-1">
          <TierSelector active={tier} onChange={(t) => { setTier(t); setMatches([]); setError(null); }} />
        </div>

        {/* ── AI Scan tier ── */}
        {tier === "ai" && (
          <div className="animate-fade-up-delay-2">
            <AIScanTier onComplete={handleScanComplete} />
          </div>
        )}

        {/* ── Text match tier ── */}
        {tier === "text" && (
          <div className="flex flex-col gap-3 animate-fade-up-delay-2">
            <div className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-4 shadow-card">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-1">Know your shade?</h3>
                <p className="text-sm text-muted font-body">Enter your current foundation and we'll find matches across every brand.</p>
              </div>
              <input
                type="text"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTextMatch()}
                placeholder='e.g. "MAC NC30" or "Fenty 230N"'
                className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-charcoal font-body placeholder-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/50 transition"
              />
              <button
                onClick={handleTextMatch}
                disabled={loading || !textQuery.trim()}
                className="w-full py-3.5 rounded-xl bg-rose hover:bg-rose-d text-white font-semibold font-body text-sm transition-colors shadow-rose disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Searching…" : "Find Matches →"}
              </button>
            </div>
          </div>
        )}

        {/* ── AR VTO tier ── */}
        {tier === "vto" && (
          <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center gap-4 text-center shadow-card animate-fade-up-delay-2">
            <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center text-2xl">✦</div>
            <div>
              <h3 className="font-display text-2xl text-charcoal mb-1">AR Virtual Try-On</h3>
              <p className="text-sm text-muted font-body max-w-xs">
                See each shade on your face in real time — including the oxidised
                2-hour wear result. Requires WebXR-compatible device.
              </p>
            </div>
            <button className="px-6 py-3 rounded-xl border border-rose/40 text-rose text-sm font-semibold font-body opacity-60 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-10 h-10 rounded-full border-[3px] border-blush border-t-rose animate-spin" />
            <p className="text-sm text-muted font-body">Finding your matches…</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600 text-sm font-body">{error}</p>
          </div>
        )}

        {/* ── Match results ── */}
        {!loading && matches.length > 0 && (
          <div className="flex flex-col gap-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-rose font-body">Your results</p>
                <h2 className="font-display text-2xl text-charcoal font-light">
                  Top {matches.length} <span className="italic">Matches</span>
                </h2>
              </div>
              <button onClick={reset} className="text-xs text-muted font-body border border-border rounded-lg px-3 py-1.5 hover:border-rose/40 transition">
                Start over
              </button>
            </div>

            {/* Skin profile chip */}
            {skinProfile && (
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-blush text-rose-d text-[11px] font-semibold font-body px-3 py-1 rounded-full">
                  MST-{skinProfile.mstTier}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blush text-rose-d text-[11px] font-semibold font-body px-3 py-1 rounded-full capitalize">
                  {skinProfile.undertoneClass.replace(/_/g, " ")} undertone
                </span>
              </div>
            )}

            {matches.map((m, i) => (
              <MatchCard key={m.colorMetricId} result={m} rank={i + 1} />
            ))}
          </div>
        )}

        {/* ── Product suggestions ── */}
        {!loading && matches.length > 0 && skinProfile && (
          <>
            <div className="h-px bg-border" />
            <ProductSuggestions
              products={products}
              mstTier={skinProfile.mstTier}
              undertone={skinProfile.undertoneClass}
            />
          </>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-2xl mx-auto px-5 py-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[11px] text-muted font-body">
            © {new Date().getFullYear()} Shade Matrix. CIEDE2000 colour matching engine.
          </p>
          <p className="text-[11px] text-muted/60 font-body">
            Affiliate disclosure: we earn a commission on purchases via links on this page.
          </p>
        </div>
      </footer>

    </div>
  );
}
