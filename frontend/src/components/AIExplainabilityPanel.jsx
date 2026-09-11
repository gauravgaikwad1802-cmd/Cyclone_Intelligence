import React from 'react';
import { Brain, HelpCircle, Layers, Cpu, CheckCircle2, Sliders, Sparkles } from 'lucide-react';

export default function AIExplainabilityPanel({
  predictionName = 'Rapid Intensification Pattern',
  confidence = 92.8,
  modelVersion = 'Vision Transformer ViT-B/16 + Spatial Feature Classifier',
  factors = [
    { name: 'Inner Core Cloud Structure & Eyewall Symmetry', contribution: 34, impact: 'HIGH POSITIVE' },
    { name: 'Central Pressure Drop Rate (>1.5 hPa/hr)', contribution: 28, impact: 'HIGH POSITIVE' },
    { name: 'Sustained Surface Wind Speed Acceleration', contribution: 21, impact: 'MODERATE POSITIVE' },
    { name: 'Sea Surface Temperature Anomaly (>30.2°C)', contribution: 17, impact: 'HIGH POSITIVE' },
    { name: 'Low Vertical Wind Shear (<10 knots)', contribution: 12, impact: 'FAVORABLE' },
    { name: 'Analogous Historical Track Matching (Amphan 2020)', contribution: 8, impact: 'SIMILARITY MATCH' }
  ]
}) {
  return (
    <div className="glass-panel p-5 rounded-xl border border-cyan-500/30 bg-navy-900/70 space-y-4 font-sans shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-navy-950 font-bold">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
              AI MODEL EXPLAINABILITY & FEATURE IMPORTANCE
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Model: <span className="text-cyan-300">{modelVersion}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SHAP / Attention Map Analysis</span>
        </div>
      </div>

      {/* Main Prediction Summary Card */}
      <div className="p-4 rounded-xl bg-navy-950/80 border border-blue-900/40 flex flex-wrap items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">PRIMARY MODEL PREDICTION</span>
          <span className="font-heading font-extrabold text-lg text-cyan-300">{predictionName}</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase block">CLASSIFICATION CONFIDENCE</span>
          <span className="font-heading font-extrabold text-xl text-emerald-400">{confidence}%</span>
        </div>
      </div>

      {/* Factor Contribution Bars */}
      <div className="space-y-3 pt-1 font-mono text-xs">
        <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          KEY METEOROLOGICAL CONTRIBUTION FACTORS
        </h4>

        <div className="space-y-2.5">
          {factors.map((factor, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-navy-950/60 border border-blue-900/30 space-y-1.5">
              <div className="flex justify-between text-slate-200">
                <span className="font-semibold text-slate-200">{factor.name}</span>
                <span className="font-bold text-cyan-300">{factor.contribution}% Contribution</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-navy-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                  style={{ width: `${factor.contribution}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span>Impact Assessment: <strong className="text-emerald-400">{factor.impact}</strong></span>
                <span>Weight Vector: +{(factor.contribution / 100).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 rounded-xl bg-navy-950/40 border border-blue-900/20 text-[11px] text-slate-400 font-mono flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Explanation generated using integrated gradient feature attribution over multi-spectral satellite imagery channels.</span>
      </div>
    </div>
  );
}
