import React, { useState } from 'react';
import { History, Calendar, MapPin, Wind, Gauge, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HistoricalStormTimeline({ cyclone }) {
  const defaultStages = [
    {
      stageName: 'FORMATION',
      date: '2020-05-16 06:00 UTC',
      location: '10.40°N, 86.50°E (S. Bay of Bengal)',
      windSpeedKt: 30,
      pressureHpa: 1004,
      category: 'Low Pressure Area',
      summary: 'Initial convective disturbance organized over warm sea waters.'
    },
    {
      stageName: 'DEPRESSION',
      date: '2020-05-16 18:00 UTC',
      location: '11.10°N, 86.20°E',
      windSpeedKt: 35,
      pressureHpa: 1000,
      category: 'Depression',
      summary: 'Sustained surface winds reached 35 knots with defined central vortex.'
    },
    {
      stageName: 'DEEP DEPRESSION',
      date: '2020-05-17 06:00 UTC',
      location: '11.50°N, 86.00°E',
      windSpeedKt: 45,
      pressureHpa: 994,
      category: 'Deep Depression',
      summary: 'Central pressure dropped to 994 hPa with organized spiral banding.'
    },
    {
      stageName: 'CYCLONIC STORM',
      date: '2020-05-17 18:00 UTC',
      location: '12.50°N, 86.10°E',
      windSpeedKt: 60,
      pressureHpa: 985,
      category: 'Cyclonic Storm (Named System)',
      summary: 'Named Cyclonic Storm with eye structure initiating formation.'
    },
    {
      stageName: 'SEVERE CYCLONIC STORM',
      date: '2020-05-18 06:00 UTC',
      location: '13.40°N, 86.20°E',
      windSpeedKt: 90,
      pressureHpa: 960,
      category: 'Severe / Extremely Severe CS',
      summary: 'Rapid Intensification phase completed with pinhole thermal IR eye.'
    },
    {
      stageName: 'LANDFALL',
      date: '2020-05-20 12:00 UTC',
      location: '21.70°N, 88.30°E (Sundarbans Coast)',
      windSpeedKt: 140,
      pressureHpa: 920,
      category: 'Super Cyclone Peak / Landfall',
      summary: 'Landfall near Sundarbans with peak storm surge of 4.5m.'
    },
    {
      stageName: 'DISSIPATION',
      date: '2020-05-21 18:00 UTC',
      location: '24.50°N, 89.80°E (Inland Bangladesh)',
      windSpeedKt: 25,
      pressureHpa: 1002,
      category: 'Well-Marked Low / Dissipated',
      summary: 'System rapidly weakened over terrestrial terrain into remnant low.'
    }
  ];

  const stages = cyclone?.timeline || defaultStages;
  const [selectedStageIdx, setSelectedStageIdx] = useState(3);
  const activeStage = stages[selectedStageIdx] || stages[0];

  return (
    <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
            HISTORICAL STORM LIFECYCLE TIMELINE
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          System: <strong className="text-cyan-300">{cyclone?.name || 'SUPER CYCLONE AMPHAN'}</strong>
        </span>
      </div>

      {/* Horizontal Lifecycle Node Stepper */}
      <div className="overflow-x-auto pb-3 pt-2">
        <div className="flex items-center min-w-[700px] justify-between px-4 relative">
          {/* Connecting Track Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-blue-900/60 z-0"></div>

          {stages.map((stg, idx) => {
            const isSelected = idx === selectedStageIdx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedStageIdx(idx)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all shadow-md ${
                    isSelected
                      ? 'bg-cyan-400 text-navy-950 ring-4 ring-cyan-500/30 scale-110'
                      : 'bg-navy-950 text-slate-300 border border-blue-800 hover:border-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-2 font-mono text-[10px] uppercase font-semibold transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {stg.stageName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Telemetry Card */}
      <div className="p-4 rounded-xl bg-navy-950/80 border border-cyan-500/30 font-mono text-xs space-y-3 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-900/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30 text-[11px]">
              STAGE {selectedStageIdx + 1}: {activeStage.stageName}
            </span>
            <span className="font-heading font-bold text-slate-200">{activeStage.category}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeStage.date}</span>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-navy-900/70 p-2.5 rounded-lg border border-blue-900/30">
            <span className="text-slate-400 text-[10px] block">LOCATION</span>
            <span className="text-slate-100 font-bold">{activeStage.location}</span>
          </div>

          <div className="bg-navy-900/70 p-2.5 rounded-lg border border-blue-900/30">
            <span className="text-slate-400 text-[10px] block">MAX WIND</span>
            <span className="text-cyan-300 font-bold">{activeStage.windSpeedKt} kt</span> ({Math.round(activeStage.windSpeedKt * 1.852)} km/h)
          </div>

          <div className="bg-navy-900/70 p-2.5 rounded-lg border border-blue-900/30">
            <span className="text-slate-400 text-[10px] block">MIN PRESSURE</span>
            <span className="text-amber-300 font-bold">{activeStage.pressureHpa} hPa</span>
          </div>

          <div className="bg-navy-900/70 p-2.5 rounded-lg border border-blue-900/30">
            <span className="text-slate-400 text-[10px] block">STAGE CLASSIFICATION</span>
            <span className="text-emerald-400 font-bold">{activeStage.category}</span>
          </div>
        </div>

        <p className="text-slate-300 font-sans text-xs pt-1 border-t border-blue-900/20">
          <strong className="font-mono text-cyan-400">Meteorological Summary:</strong> {activeStage.summary}
        </p>
      </div>
    </div>
  );
}
