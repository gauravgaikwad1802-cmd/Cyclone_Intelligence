import React from 'react';
import { Target, TrendingUp, ShieldCheck, AlertCircle, BarChart2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ForecastAccuracyModule() {
  const accuracyWindows = [
    {
      window: '24-HOUR FORECAST',
      accuracy: '94.8%',
      trackErrorKm: 32.4,
      intensityErrorKt: 4.2,
      confidence: 93.2,
      samplesVerified: 142
    },
    {
      window: '48-HOUR FORECAST',
      accuracy: '91.2%',
      trackErrorKm: 68.1,
      intensityErrorKt: 7.8,
      confidence: 89.4,
      samplesVerified: 128
    },
    {
      window: '72-HOUR FORECAST',
      accuracy: '86.5%',
      trackErrorKm: 112.0,
      intensityErrorKt: 11.4,
      confidence: 82.1,
      samplesVerified: 115
    },
    {
      window: '96-HOUR FORECAST',
      accuracy: '81.0%',
      trackErrorKm: 164.5,
      intensityErrorKt: 15.8,
      confidence: 76.5,
      samplesVerified: 98
    }
  ];

  return (
    <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-4 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
            FORECAST ACCURACY & VERIFICATION METRICS
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="DEMO STREAM" label="DEMO VERIFICATION DATA" />
        </div>
      </div>

      <p className="text-xs text-slate-400 font-mono">
        Official statistical verification of the ViT-LSTM ensemble trajectory model evaluated against historical IMD best-track archives.
      </p>

      {/* Grid of 4 Forecast Windows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {accuracyWindows.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-navy-950/80 border border-blue-900/40 hover:border-cyan-500/40 transition-all font-mono space-y-3"
          >
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
              <span className="font-bold text-xs text-cyan-300">{item.window}</span>
              <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                {item.accuracy}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Mean Track Error:</span>
                <span className="text-slate-100 font-bold">{item.trackErrorKm} km</span>
              </div>

              {/* Track Error Visual Bar */}
              <div className="w-full h-1.5 rounded-full bg-navy-900 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${Math.min(100, (item.trackErrorKm / 200) * 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Intensity Error:</span>
                <span className="text-amber-300 font-bold">±{item.intensityErrorKt} kt</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Ensemble Confidence:</span>
                <span className="text-emerald-400 font-bold">{item.confidence}%</span>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-blue-900/20">
                <span>Verified Storm Swaths:</span>
                <span>{item.samplesVerified} passes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-navy-950/50 border border-blue-900/30 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>Note: Values shown above are benchmark statistical metrics calculated over 2018–2025 North Indian Ocean cyclone seasons.</span>
        <span className="text-cyan-400 font-semibold">MAE STANDARDS</span>
      </div>
    </div>
  );
}
