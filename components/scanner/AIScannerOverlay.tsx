"use client";

import { ScanState } from "@/types";

interface Props {
  lightingScore: number;
  positionScore: number;
  shadowWarning: boolean;
  liqaPass:      boolean;
  scanProgress:  number;
  status:        ScanState["status"];
}

function Bar({ label, score, warn }: { label: string; score: number; warn?: boolean }) {
  const pct   = Math.round(score * 100);
  const color = warn || pct < 50 ? "bg-red-400" : pct < 80 ? "bg-amber-400" : "bg-emerald-400";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-body text-white/90">
        <span>{label}</span>
        <span>{warn ? "⚠ Shadow" : `${pct}%`}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function AIScannerOverlay({ lightingScore, positionScore, shadowWarning, liqaPass, scanProgress, status }: Props) {
  const msg =
    shadowWarning       ? "Move away from direct shadows"   :
    lightingScore < 0.5 ? "Find brighter, even lighting"    :
    positionScore < 0.7 ? "Centre your face in the oval"    :
    liqaPass            ? "Perfect — hold still…"           : "Adjusting to your lighting…";

  const ovalColor = liqaPass ? "#86EFAC" : shadowWarning ? "#FCA5A5" : "#FDE68A";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-5 pointer-events-none">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 rounded-full border-[3px] transition-all duration-500"
        style={{ width:"54%", height:"62%", borderColor: ovalColor, boxShadow:`0 0 0 3px ${ovalColor}40` }} />

      <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-2xl px-4 py-2 mt-2 border border-white/10">
        <p className="text-white text-sm font-body font-medium text-center">{msg}</p>
      </div>

      <div className="relative z-10 w-full max-w-xs bg-black/50 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-3 border border-white/10">
        <Bar label="Lighting"    score={lightingScore} />
        <Bar label="Position"    score={positionScore} />
        <Bar label="Shadow-free" score={shadowWarning ? 0.1 : 1} warn={shadowWarning} />

        {status === "scanning" && (
          <div>
            <div className="flex justify-between text-[11px] text-white/60 font-body mb-1">
              <span>Analysing 10-second scan</span><span>{scanProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width:`${scanProgress}%`, background:"linear-gradient(90deg,#C4826A,#F0B090)" }} />
            </div>
          </div>
        )}

        <div className="flex gap-2 flex-wrap mt-1">
          {liqaPass && (
            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full px-2 py-0.5 font-body">
              ✓ LIQA Pass
            </span>
          )}
          <span className="text-[10px] bg-white/10 text-white/60 border border-white/20 rounded-full px-2 py-0.5 font-body">
            D65 Normalising
          </span>
        </div>
      </div>
    </div>
  );
}
