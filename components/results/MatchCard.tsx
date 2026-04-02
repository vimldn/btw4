"use client";

import { useState } from "react";
import { ShadeResult } from "@/types";

function DeltaEPill({ value, label }: { value: number; label: string }) {
  const { text, bg } =
    value < 1.5 ? { text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" } :
    value < 3   ? { text: "text-amber-700",   bg: "bg-amber-50 border-amber-200"   } :
                  { text: "text-red-700",     bg: "bg-red-50 border-red-200"       };
  return (
    <div className={`rounded-full border px-3 py-1.5 flex flex-col items-center ${bg}`}>
      <span className="text-[9px] uppercase tracking-widest text-muted font-body">{label}</span>
      <span className={`text-sm font-semibold font-body tabular-nums ${text}`}>
        ΔE {value.toFixed(2)}
      </span>
    </div>
  );
}

function ConfidenceArc({ pct }: { pct: number }) {
  const r = 20, circ = 2 * Math.PI * r;
  const fill  = (pct / 100) * circ;
  const color = pct > 90 ? "#4D7C5F" : "#C4826A";
  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} strokeWidth="3" stroke="#E8DDD6" fill="none" />
        <circle
          cx="28" cy="28" r={r} strokeWidth="3" stroke={color} fill="none"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <span className="absolute text-xs font-semibold text-charcoal font-body">{Math.round(pct)}%</span>
    </div>
  );
}

export function MatchCard({ result, rank }: { result: ShadeResult; rank: number }) {
  const [expanded, setExpanded] = useState(rank === 1);

  const freshBg    = `hsl(${26 + result.oxidation.fresh.b * 1.2},${28 + result.oxidation.fresh.a * 1.5}%,${result.oxidation.fresh.L * 0.88}%)`;
  const oxidizedBg = `hsl(${24 + result.oxidation.oxidized.b * 1.2},${30 + result.oxidation.oxidized.a * 1.5}%,${result.oxidation.oxidized.L * 0.85}%)`;

  return (
    <article className={`rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
      rank === 1 ? "shadow-card-lg ring-1 ring-rose/30" : "shadow-card hover:shadow-card-lg"
    }`}>
      <button onClick={() => setExpanded((e) => !e)} className="w-full flex items-center gap-4 p-4 text-left">
        <div className="flex-none w-7 text-center">
          {rank === 1
            ? <span className="font-display text-2xl italic text-rose">★</span>
            : <span className="font-display text-lg text-muted/50">#{rank}</span>}
        </div>
        <div className="w-10 h-10 rounded-xl shadow-inner border border-border flex-none" style={{ background: freshBg }} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-muted font-body truncate">{result.brand}</p>
          <p className="font-display text-lg font-medium text-charcoal truncate leading-tight">{result.shadeName}</p>
          <p className="text-[11px] text-muted font-body capitalize">{result.finish} · {result.coverage}</p>
        </div>
        <ConfidenceArc pct={result.confidencePct} />
      </button>

      {expanded && (
        <div className="border-t border-border/60 px-4 pb-5 pt-4 flex flex-col gap-5">
          <div className="flex gap-2 justify-between">
            <DeltaEPill value={result.deltaEFresh}    label="Fresh"    />
            <DeltaEPill value={result.deltaEOxidized} label="2hr Wear" />
            <DeltaEPill value={result.deltaEWear}     label="True Wear"/>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-body text-muted">
              <span>Undertone harmony</span>
              <span className="capitalize text-charcoal">{result.undertoneClass.replace(/_/g, " ")} — {Math.round(result.undertoneScore * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-blush overflow-hidden">
              <div className="h-full rounded-full" style={{
                width: `${result.undertoneScore * 100}%`,
                background: "linear-gradient(90deg,#C4826A,#D4A882)",
                transition: "width 1s ease",
              }} />
            </div>
          </div>

          <div className="bg-cream rounded-xl p-3 border border-border/50">
            <p className="text-[10px] uppercase tracking-widest text-rose font-body mb-1">Why this match</p>
            <p className="text-sm text-charcoal/80 font-body leading-relaxed">{result.explanation}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-lg border border-border" style={{ background: freshBg }} />
              <span className="text-[10px] text-muted font-body">Fresh</span>
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="h-px bg-border" />
              {result.oxidation.oxidation_delta_e !== undefined && (
                <p className="text-[10px] text-muted font-body text-center">ΔE {result.oxidation.oxidation_delta_e.toFixed(2)} shift at 2hr</p>
              )}
              <div className="h-px bg-border" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-lg border border-border" style={{ background: oxidizedBg }} />
              <span className="text-[10px] text-muted font-body">2hr Wear</span>
            </div>
          </div>

          <a href={result.affiliateUrl} target="_blank" rel="noopener noreferrer"
            className="block w-full text-center py-3.5 rounded-xl bg-rose hover:bg-rose-d text-white font-semibold text-sm font-body transition-colors shadow-rose">
            Shop This Shade →
          </a>
        </div>
      )}
    </article>
  );
}
