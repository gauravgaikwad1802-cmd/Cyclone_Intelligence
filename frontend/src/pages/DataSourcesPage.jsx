import React from 'react';
import { Database, Satellite, Layers, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function DataSourcesPage() {
  const preprocessingSteps = [
    { step: 1, title: "DATA INGESTION", desc: "Multi-satellite stream reception (INSAT-3D, Himawari-9, GPM)." },
    { step: 2, title: "FORMAT STANDARDIZATION", desc: "Convert NetCDF4 / HDF5 / GeoTIFF into standardized 512x512 tensors." },
    { step: 3, title: "CLOUD / NOISE HANDLING", desc: "Remove orbital artifacts and sensor noise using bilateral spatial filters." },
    { step: 4, title: "NORMALIZATION & SCALING", desc: "Normalize Kelvin cloud top temps and radar backscatter decibels." },
    { step: 5, title: "TIME SYNCHRONIZATION", desc: "Align asynchronous satellite passes onto 15-minute temporal grid." },
    { step: 6, title: "AI/ML PIPELINE", desc: "Stream normalized feature maps to ViT and LSTM inference models." }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-slate-100">
              Data Architecture & Ingestion Pipeline
            </h1>
            <StatusBadge status="ONLINE" label="MULTI-SOURCE FUSION" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Data standardization, noise handling, image alignment, and temporal synchronization pipeline.
          </p>
        </div>
      </div>

      {/* Preprocessing Workflow Card Grid */}
      <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-4">
        <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400">
          DATA PREPROCESSING WORKFLOW (STAGE 1 → STAGE 6)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {preprocessingSteps.map((s) => (
            <div key={s.step} className="p-3.5 rounded-lg bg-navy-950/80 border border-blue-900/30 space-y-1.5 font-mono">
              <span className="text-cyan-400 font-bold text-xs">STAGE 0{s.step}</span>
              <h4 className="font-bold text-slate-100 text-xs">{s.title}</h4>
              <p className="text-[11px] text-slate-400 leading-normal font-sans">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
