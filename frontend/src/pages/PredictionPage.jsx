import React, { useState } from 'react';
import { BrainCircuit, Navigation, AlertTriangle, Shield, Calendar, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ConfidenceGauge from '../components/ConfidenceGauge';
import AIExplainabilityPanel from '../components/AIExplainabilityPanel';
import ForecastAccuracyModule from '../components/ForecastAccuracyModule';
import DataExportButton from '../components/DataExportButton';

export default function PredictionPage() {
  const [selectedHorizon, setSelectedHorizon] = useState('72H');

  const predictions = [
    {
      hour: 24,
      title: "24-Hour Forecast Horizon",
      time: "2026-08-28 06:00 UTC",
      location: "17.10°N, 86.80°E",
      wind: "90 kt (165 km/h)",
      pressure: "960 hPa",
      category: "Very Severe Cyclonic Storm",
      landfallRisk: "Moderate — Approaching Coast",
      uncertaintyKm: "45 km",
      confidence: "93.2%",
      summary: "System continues steady intensification over warm SST anomaly zone (>30.2°C)."
    },
    {
      hour: 48,
      title: "48-Hour Forecast Horizon",
      time: "2026-08-29 06:00 UTC",
      location: "19.30°N, 85.50°E",
      wind: "105 kt (195 km/h)",
      pressure: "948 hPa",
      category: "Extremely Severe Cyclonic Storm",
      landfallRisk: "HIGH — Landfall Near Odisha Coast",
      uncertaintyKm: "85 km",
      confidence: "89.4%",
      summary: "Peak intensity expected near coast with intense convective eye organization prior to landfall."
    },
    {
      hour: 72,
      title: "72-Hour Forecast Horizon",
      time: "2026-08-30 06:00 UTC",
      location: "21.60°N, 85.10°E",
      wind: "60 kt (110 km/h)",
      pressure: "985 hPa",
      category: "Cyclonic Storm (Post-Landfall)",
      landfallRisk: "Inland Dissipation",
      uncertaintyKm: "140 km",
      confidence: "82.1%",
      summary: "Rapid structural breakdown expected over land surface friction."
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Cyclone Prediction Engine
            </h1>
            <StatusBadge status="ONLINE" label="ENSEMBLE TRANSFORMER" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            72-hour forecast trajectory, intensity projection, and probability envelope estimation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DataExportButton data={predictions} filename="cyclone_predictions_72h" buttonLabel="Export Forecast Data" />

          <div className="flex items-center gap-2 font-mono">
            {['24H', '48H', '72H'].map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHorizon(h)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedHorizon === h
                    ? 'bg-blue-600 text-slate-100 border border-cyan-400'
                    : 'bg-navy-900 text-slate-400 border border-blue-900/40 hover:text-slate-200'
                }`}
              >
                {h} Horizon
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 3 Forecast Horizon Cards */}
        <div className="lg:col-span-2 space-y-4">
          {predictions.map((pred) => (
            <div
              key={pred.hour}
              className={`glass-panel p-5 rounded-xl border transition-all ${
                pred.hour === 48
                  ? 'border-rose-500/40 bg-rose-950/10 shadow-lg'
                  : 'border-blue-900/40'
              }`}
            >
              <div className="flex items-center justify-between border-b border-blue-900/30 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base text-slate-100">{pred.title}</h3>
                  <StatusBadge status="WARNING" label={pred.category} />
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{pred.time}</span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{pred.summary}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-navy-950/60 border border-blue-900/20">
                  <span className="text-slate-400 block text-[10px]">PREDICTED COORDS</span>
                  <span className="font-bold text-cyan-300">{pred.location}</span>
                </div>
                <div className="p-2.5 rounded bg-navy-950/60 border border-blue-900/20">
                  <span className="text-slate-400 block text-[10px]">MAX SUSTAINED WIND</span>
                  <span className="font-bold text-slate-100">{pred.wind}</span>
                </div>
                <div className="p-2.5 rounded bg-navy-950/60 border border-blue-900/20">
                  <span className="text-slate-400 block text-[10px]">UNCERTAINTY RADIUS</span>
                  <span className="font-bold text-amber-400">±{pred.uncertaintyKm}</span>
                </div>
                <div className="p-2.5 rounded bg-navy-950/60 border border-blue-900/20">
                  <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                  <span className="font-bold text-emerald-400">{pred.confidence}</span>
                </div>
              </div>

              <div className="mt-3 p-2 rounded bg-navy-950/80 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center justify-between">
                <span>LANDFALL RISK ASSESSMENT:</span>
                <strong className="text-amber-400">{pred.landfallRisk}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Prediction Confidence Breakdown */}
        <div className="space-y-4">
          <ConfidenceGauge
            score={91.4}
            label="Overall Prediction Engine Confidence"
            subScores={[
              { label: "24-Hour Track Precision", value: 93.2 },
              { label: "48-Hour Landfall Timing", value: 89.4 },
              { label: "72-Hour Intensity Curve", value: 82.1 }
            ]}
          />

          <div className="glass-panel p-4 rounded-xl border border-blue-900/40 space-y-2 text-xs font-mono">
            <h5 className="font-bold text-cyan-400 uppercase text-[11px]">PREDICTION ENGINE SPECS</h5>
            <div className="flex justify-between text-slate-400">
              <span>Model Architecture:</span>
              <span className="text-slate-200">Ensemble Trajectory Transformer</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Mean Absolute Error (24h):</span>
              <span className="text-emerald-400 font-bold">32.4 km</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Mean Absolute Error (48h):</span>
              <span className="text-emerald-400 font-bold">68.1 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature #8: AI Explainability Panel */}
      <AIExplainabilityPanel
        predictionName="Rapid Intensification Pattern"
        confidence={92.8}
        modelVersion="Ensemble ViT-B/16 + Trajectory Transformer"
      />

      {/* Feature #7: Forecast Accuracy Verification Module */}
      <ForecastAccuracyModule />
    </div>
  );
}
