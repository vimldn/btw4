"use client";

import { FunnelTier } from "@/types";

const TIERS: { id: FunnelTier; label: string; desc: string }[] = [
  { id: "text", label: "Text Match",   desc: "Know your shade?" },
  { id: "ai",   label: "AI Skin Scan", desc: "Recommended"       },
  { id: "vto",  label: "AR Try-On",    desc: "See it on you"     },
];

export function TierSelector({ active, onChange }: {
  active: FunnelTier;
  onChange: (t: FunnelTier) => void;
}) {
  return (
    <div className="flex gap-2">
      {TIERS.map(({ id, label, desc }) => (
        <button key={id} onClick={() => onChange(id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-3 px-2 rounded-2xl border text-center transition-all duration-200 ${
            active === id
              ? "bg-rose border-rose text-white shadow-rose"
              : "bg-white border-border text-charcoal hover:border-rose/40"
          }`}>
          <span className={`text-[11px] font-semibold font-body ${active === id ? "text-white" : "text-charcoal"}`}>{label}</span>
          <span className={`text-[10px] font-body hidden sm:block ${active === id ? "text-white/70" : "text-muted"}`}>{desc}</span>
        </button>
      ))}
    </div>
  );
}
