import React, { useState } from 'react';
import { GitCompare, Wind, Gauge, Calendar, Navigation, Shield, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { cyclones as defaultCyclones } from '../data/mockData';

export default function CycloneComparison({ cyclones = defaultCyclones }) {
  const [cyclone1Id, setCyclone1Id] = useState(cyclones[2]?.id || cyclones[0]?.id);
  const [cyclone2Id, setCyclone2Id] = useState(cyclones[3]?.id || cyclones[1]?.id);

  const c1 = cyclones.find((c) => c.id === cyclone1Id) || cyclones[0];
  const c2 = cyclones.find((c) => c.id === cyclone2Id) || cyclones[1] || cyclones[0];

  const calculateMetrics = (c) => {
    const maxWind = c.windSpeedKt || 75;
    const minPressure = c.pressureHpa || 974;
    const trackPoints = c.track?.length || 5;
    const estimatedDistanceKm = Math.round(trackPoints * 180 + maxWind * 2.5);
    const durationDays = c.formationDate && c.dissipationDate ? '5 Days' : '4-6 Days';
    const isRapidIntensification = c.pattern?.toLowerCase().includes('rapid') || maxWind > 100;
    const pressureDropRate = isRapidIntensification ? '2.4 hPa/hr' : '1.1 hPa/hr';
    const windIncreaseRate = isRapidIntensification ? '4.5 kt/6hr' : '2.0 kt/6hr';
    const forecastAccuracy = c.predictionConfidence ? `${c.predictionConfidence}%` : '91.4%';

    return {
      maxWind,
      minPressure,
      trackPoints,
      estimatedDistanceKm,
      durationDays,
      isRapidIntensification,
      pressureDropRate,
      windIncreaseRate,
      forecastAccuracy
    };
  };

  const m1 = calculateMetrics(c1);
  const m2 = calculateMetrics(c2);

  return (
    <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-cyan-400" />
          <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
            HISTORICAL CYCLONE COMPARISON ENGINE
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Side-by-Side Dual Telemetry Analysis
        </span>
      </div>

      {/* Selectors Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Cyclone 1 Selector */}
        <div className="p-3 rounded-xl bg-navy-950/80 border border-cyan-500/30 space-y-2">
          <label className="text-cyan-400 font-semibold uppercase block">Select Cyclone A:</label>
          <select
            value={cyclone1Id}
            onChange={(e) => setCyclone1Id(e.target.value)}
            className="w-full bg-navy-900 border border-blue-800/40 rounded-lg p-2 text-slate-100 font-sans text-sm focus:outline-none focus:border-cyan-400"
          >
            {cyclones.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id}) — {c.region}
              </option>
            ))}
          </select>
        </div>

        {/* Cyclone 2 Selector */}
        <div className="p-3 rounded-xl bg-navy-950/80 border border-amber-500/30 space-y-2">
          <label className="text-amber-400 font-semibold uppercase block">Select Cyclone B:</label>
          <select
            value={cyclone2Id}
            onChange={(e) => setCyclone2Id(e.target.value)}
            className="w-full bg-navy-900 border border-blue-800/40 rounded-lg p-2 text-slate-100 font-sans text-sm focus:outline-none focus:border-amber-400"
          >
            {cyclones.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id}) — {c.region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid Matrix */}
      <div className="overflow-x-auto rounded-xl border border-blue-900/30">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="bg-navy-950 text-slate-400 border-b border-blue-900/40">
              <th className="p-3 font-semibold uppercase">METRIC / TELEMETRY</th>
              <th className="p-3 font-bold text-cyan-300 bg-cyan-950/20">{c1.name}</th>
              <th className="p-3 font-bold text-amber-300 bg-amber-950/20">{c2.name}</th>
              <th className="p-3 font-semibold uppercase text-center">COMPARISON DELTA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/30 bg-navy-900/40 text-slate-200">
            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Maximum Sustained Wind</td>
              <td className="p-3 font-bold text-cyan-300">{m1.maxWind} kt ({Math.round(m1.maxWind * 1.852)} km/h)</td>
              <td className="p-3 font-bold text-amber-300">{m2.maxWind} kt ({Math.round(m2.maxWind * 1.852)} km/h)</td>
              <td className="p-3 text-center">
                {m1.maxWind > m2.maxWind ? (
                  <span className="text-cyan-400 font-bold">+{m1.maxWind - m2.maxWind} kt (Cyclone A stronger)</span>
                ) : m2.maxWind > m1.maxWind ? (
                  <span className="text-amber-400 font-bold">+{m2.maxWind - m1.maxWind} kt (Cyclone B stronger)</span>
                ) : (
                  <span className="text-slate-400">Equal Intensity</span>
                )}
              </td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Minimum Central Pressure</td>
              <td className="p-3 font-bold text-cyan-300">{m1.minPressure} hPa</td>
              <td className="p-3 font-bold text-amber-300">{m2.minPressure} hPa</td>
              <td className="p-3 text-center">
                {m1.minPressure < m2.minPressure ? (
                  <span className="text-cyan-400 font-bold">-{m2.minPressure - m1.minPressure} hPa lower</span>
                ) : m2.minPressure < m1.minPressure ? (
                  <span className="text-amber-400 font-bold">-{m1.minPressure - m2.minPressure} hPa lower</span>
                ) : (
                  <span className="text-slate-400">Equal Pressure</span>
                )}
              </td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Category Classification</td>
              <td className="p-3 text-slate-100">{c1.category}</td>
              <td className="p-3 text-slate-100">{c2.category}</td>
              <td className="p-3 text-center text-slate-400 font-sans">Official IMD Scale</td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Estimated Track Distance</td>
              <td className="p-3 text-slate-100">{m1.estimatedDistanceKm} km</td>
              <td className="p-3 text-slate-100">{m2.estimatedDistanceKm} km</td>
              <td className="p-3 text-center text-slate-300">
                Δ {Math.abs(m1.estimatedDistanceKm - m2.estimatedDistanceKm)} km
              </td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Rapid Intensification Status</td>
              <td className="p-3">
                <span className={m1.isRapidIntensification ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                  {m1.isRapidIntensification ? 'YES (Intense)' : 'No'}
                </span>
              </td>
              <td className="p-3">
                <span className={m2.isRapidIntensification ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                  {m2.isRapidIntensification ? 'YES (Intense)' : 'No'}
                </span>
              </td>
              <td className="p-3 text-center text-slate-400">Drop &gt; 1.5 hPa/hr</td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Max Pressure Drop Rate</td>
              <td className="p-3 text-cyan-300">{m1.pressureDropRate}</td>
              <td className="p-3 text-amber-300">{m2.pressureDropRate}</td>
              <td className="p-3 text-center text-slate-400">Central deepening</td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Wind Increase Rate</td>
              <td className="p-3 text-cyan-300">{m1.windIncreaseRate}</td>
              <td className="p-3 text-amber-300">{m2.windIncreaseRate}</td>
              <td className="p-3 text-center text-slate-400">6-hour velocity delta</td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Forecast Model Accuracy</td>
              <td className="p-3 text-emerald-400 font-bold">{m1.forecastAccuracy}</td>
              <td className="p-3 text-emerald-400 font-bold">{m2.forecastAccuracy}</td>
              <td className="p-3 text-center text-slate-400">Track Verification</td>
            </tr>

            <tr>
              <td className="p-3 text-slate-400 font-sans font-semibold">Landfall / Impact Zone</td>
              <td className="p-3 text-slate-300">{c1.currentLocation?.formatted || 'Coastal Bay of Bengal'}</td>
              <td className="p-3 text-slate-300">{c2.currentLocation?.formatted || 'Coastal Arabian Sea'}</td>
              <td className="p-3 text-center text-slate-400 font-sans">Geographic Sector</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
