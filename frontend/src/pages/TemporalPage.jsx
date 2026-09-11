import React, { useState } from 'react';
import { TrendingUp, Clock, Calendar, Wind, Gauge, Eye, Thermometer } from 'lucide-react';
import TimeSeriesChart from '../components/TimeSeriesChart';
import StatusBadge from '../components/StatusBadge';

export default function TemporalPage() {
  const [timeWindow, setTimeWindow] = useState('72H');

  const timelineObservations = [
    { time: "2026-08-25 06:00 UTC", location: "10.20°N, 92.10°E", intensity: "30 kt", pressure: "1004 hPa", pattern: "Depression", confidence: "94.1%" },
    { time: "2026-08-25 18:00 UTC", location: "11.50°N, 91.20°E", intensity: "40 kt", pressure: "998 hPa", pattern: "Deep Depression", confidence: "93.5%" },
    { time: "2026-08-26 06:00 UTC", location: "12.80°N, 90.30°E", intensity: "50 kt", pressure: "990 hPa", pattern: "Cyclonic Storm", confidence: "92.8%" },
    { time: "2026-08-26 18:00 UTC", location: "14.10°N, 89.20°E", intensity: "65 kt", pressure: "982 hPa", pattern: "Severe Cyclonic Storm", confidence: "91.9%" },
    { time: "2026-08-27 06:00 UTC (Current)", location: "15.40°N, 88.20°E", intensity: "75 kt", pressure: "974 hPa", pattern: "Rapid Intensification", confidence: "91.4%" },
    { time: "2026-08-28 06:00 UTC (Forecast)", location: "17.10°N, 86.80°E", intensity: "90 kt", pressure: "960 hPa", pattern: "Very Severe Cyclonic Storm", confidence: "93.2%" }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-slate-100">
              Temporal Pattern Analysis Engine
            </h1>
            <StatusBadge status="COMPLETED" label="LSTM-ATTENTION ACTIVE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Bidirectional LSTM + Temporal Cross-Attention Transformer analyzing historical-to-forecast intensity dynamics.
          </p>
        </div>

        {/* Time Selector Pills */}
        <div className="flex items-center gap-1.5 bg-navy-900/80 p-1.5 rounded-xl border border-blue-800/30 text-xs font-mono">
          {['6H', '12H', '24H', '48H', '72H'].map((w) => (
            <button
              key={w}
              onClick={() => setTimeWindow(w)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeWindow === w
                  ? 'bg-cyan-400 text-navy-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Main D3 / SVG Chart */}
      <TimeSeriesChart title={`Temporal Multi-Variable Evolution — ${timeWindow} Window`} />

      {/* Observation Timeline Table */}
      <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-3">
        <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          MULTITEMPORAL OBSERVATION LOG & FEATURE MAP
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-blue-900/40 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">Position</th>
                <th className="py-2.5 px-3">Max Wind</th>
                <th className="py-2.5 px-3">Pressure</th>
                <th className="py-2.5 px-3">Pattern Stage</th>
                <th className="py-2.5 px-3 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-200">
              {timelineObservations.map((obs, idx) => (
                <tr key={idx} className={obs.time.includes('Current') ? 'bg-blue-600/20 text-cyan-300 font-semibold' : 'hover:bg-navy-900/40'}>
                  <td className="py-2.5 px-3">{obs.time}</td>
                  <td className="py-2.5 px-3 text-slate-300">{obs.location}</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">{obs.intensity}</td>
                  <td className="py-2.5 px-3 text-amber-400">{obs.pressure}</td>
                  <td className="py-2.5 px-3">{obs.pattern}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{obs.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
