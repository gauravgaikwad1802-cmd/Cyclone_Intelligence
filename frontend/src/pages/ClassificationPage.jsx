import React, { useState } from 'react';
import { Layers, CheckCircle2, BarChart2, Shield, Info, ArrowUpRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ConfidenceGauge from '../components/ConfidenceGauge';
import AIExplainabilityPanel from '../components/AIExplainabilityPanel';
import DataExportButton from '../components/DataExportButton';

export default function ClassificationPage() {
  const [selectedPattern, setSelectedPattern] = useState('Rapid Intensification Pattern');

  const patternCategories = [
    { name: "Developing System", code: "DS", prob: 1.0, desc: "Early convective aggregation without closed eye circulation." },
    { name: "Organized Cyclone", code: "OC", prob: 2.5, desc: "Symmetrical spiral cloud bands with organized central dense overcast." },
    { name: "Rapid Intensification Pattern", code: "RI", prob: 87.3, desc: "Accelerated wind speed growth (>30 kt in 24h) with intense eye contraction.", isPrimary: true },
    { name: "Mature Cyclone", code: "MC", prob: 9.2, desc: "Steady-state peak intensity with well-defined pinhole convective eye." },
    { name: "Weakening Pattern", code: "WP", prob: 0.0, desc: "Cloud top warming and structural disorganization following landfall." }
  ];

  const featureImportance = [
    { name: "Central Dense Overcast (CDO) Expansion Rate", importance: 34, val: "1.42 km²/hr" },
    { name: "Inner Core Convective Banding Tightness", importance: 28, val: "0.89 Index" },
    { name: "Upper-Level Outflow Symmetry Score", importance: 21, val: "0.91 Score" },
    { name: "Sea Surface Temperature Anomaly (>29.5°C)", importance: 17, val: "+1.8 °C Anomaly" }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Cyclone Pattern Classification Engine
            </h1>
            <StatusBadge status="WARNING" label="RAPID INTENSIFICATION" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Machine Learning spatial pattern classifier identifying cyclone developmental stages & structural transitions.
          </p>
        </div>

        <div>
          <DataExportButton data={patternCategories} filename="cyclone_pattern_classification" buttonLabel="Export Classification Data" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Classification Results Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-400/40 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-mono block">PRIMARY PREDICTED PATTERN</span>
                <h3 className="font-heading font-extrabold text-2xl text-cyan-300">
                  Rapid Intensification Pattern
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono block">PATTERN CONFIDENCE</span>
                <span className="text-3xl font-extrabold font-mono-num text-emerald-400">87.3%</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Spatial ConvNeXt embeddings & XGBoost classifier detect high probability of <strong>Rapid Intensification (RI)</strong> within the next 24 hours. Central pressure is dropping at &gt;1.5 hPa/hr with contracting eye radius.
            </p>

            {/* Pattern Class Probabilities Progress Bars */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-bold text-xs uppercase text-slate-300 font-mono">
                ALTERNATIVE PATTERN PROBABILITIES
              </h4>

              {patternCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className={cat.isPrimary ? "font-bold text-cyan-300" : "text-slate-400"}>
                      {cat.name} {cat.isPrimary && "(Primary)"}
                    </span>
                    <span className="font-bold text-slate-200">{cat.prob}%</span>
                  </div>
                  <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.isPrimary ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-blue-600/40'
                      }`}
                      style={{ width: `${cat.prob}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Explainability Card */}
          <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              MODEL EXPLAINABILITY — SPATIAL FEATURE IMPORTANCE
            </h4>
            <p className="text-xs text-slate-400">
              Contribution of satellite-derived spatial features to the Rapid Intensification classification score:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {featureImportance.map((feat, i) => (
                <div key={i} className="p-3 rounded-lg bg-navy-950/60 border border-blue-900/30 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{feat.name}</span>
                    <span className="text-cyan-400 font-bold">{feat.importance}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Observed Value: <strong className="text-slate-200">{feat.val}</strong></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Confidence Gauge & Model Specs */}
        <div className="space-y-4">
          <ConfidenceGauge
            score={87.3}
            label="Pattern Classification Confidence"
            subScores={[
              { label: "ConvNeXt Feature Embeddings", value: 91.2 },
              { label: "Spatial Band Symmetry", value: 86.5 },
              { label: "SST Environmental Match", value: 84.2 }
            ]}
          />

          <div className="glass-panel p-4 rounded-xl border border-blue-900/40 text-xs font-mono space-y-2">
            <h5 className="font-bold text-cyan-400 uppercase text-[11px]">MODEL VERSIONING</h5>
            <div className="flex justify-between text-slate-400">
              <span>Classifier Model:</span>
              <span className="text-slate-200">XGBoost + ConvNeXt v2.1.0</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Feature Standard:</span>
              <span className="text-slate-200">Dvorak Enhanced TIR</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Validation Benchmark:</span>
              <span className="text-emerald-400 font-bold">F1-Score: 0.91</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature #8: AI Explainability Panel */}
      <AIExplainabilityPanel
        predictionName="Rapid Intensification Pattern"
        confidence={87.3}
        modelVersion="ConvNeXt v2.1.0 + XGBoost Feature Classifier"
      />
    </div>
  );
}
