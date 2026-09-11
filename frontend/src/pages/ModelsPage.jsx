import React from 'react';
import { Cpu, BrainCircuit, Layers, Activity, CheckCircle2, Shield } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function ModelsPage() {
  const models = [
    {
      title: "Cyclone Detection Model",
      arch: "Vision Transformer (ViT-B/16) + ResNet50",
      version: "v1.4.2",
      purpose: "Automated extraction of cyclone central eye & convective cloud bounds from multi-spectral satellite channels.",
      input: "512x512x4 Tensor (TIR, WV, VIS, MW)",
      output: "Eye Center Coords + Bounding Box + 92.8% Confidence Score"
    },
    {
      title: "Pattern Classification Model",
      arch: "ConvNeXt Embeddings + XGBoost Classifier",
      version: "v2.1.0",
      purpose: "Classify structural development stages (Rapid Intensification, Mature, Weakening).",
      input: "Spatial ConvNeXt Feature Embeddings + SST Anomaly",
      output: "Class Probabilities (RI: 87.3%, Mature: 9.2%)"
    },
    {
      title: "Temporal Trend Model",
      arch: "Bidirectional LSTM + Cross-Attention Transformer",
      version: "v3.0.1",
      purpose: "Model time-series wind speed acceleration & central pressure drop over 36-hour window.",
      input: "12-Step Observation Sequence (3-hour cadence)",
      output: "Smoothed Intensity Curve & Eye Radius Decay"
    },
    {
      title: "Cyclone Prediction Engine",
      arch: "Ensemble Trajectory & Intensity Transformer",
      version: "v2.8.0",
      purpose: "72-hour forecast trajectory projection with uncertainty cone radius.",
      input: "Current State Vector + Temporal Embeddings",
      output: "24h, 48h, 72h Coords + Landfall Risk Score"
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-slate-100">
              AI/ML Models & Pipeline Architecture
            </h1>
            <StatusBadge status="ONLINE" label="MODULAR INFERENCE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Technical specs for spatial detection, pattern classification, temporal analysis & prediction models.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((m, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-xl border border-blue-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-3">
              <h3 className="font-heading font-bold text-base text-slate-100">{m.title}</h3>
              <StatusBadge status="COMPLETED" label={m.version} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{m.purpose}</p>

            <div className="bg-navy-950/60 p-3 rounded-lg border border-blue-900/30 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Architecture:</span>
                <span className="text-cyan-300 font-bold">{m.arch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Input Specification:</span>
                <span className="text-slate-200">{m.input}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Output Payload:</span>
                <span className="text-emerald-400 font-semibold">{m.output}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
