import React, { useState } from 'react';
import { TrendingUp, Wind, Gauge, Eye, Thermometer } from 'lucide-react';

export default function TimeSeriesChart({ data = [], title = "Temporal Intensity & Pressure Dynamics" }) {
  const [activeMetric, setActiveMetric] = useState('windSpeed'); // windSpeed, pressure, eyeDiameterKm, convectiveTempK
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const points = data.length > 0 ? data : [
    { time: "-36h", windSpeed: 30, pressure: 1004, eyeDiameterKm: 0, convectiveTempK: 235 },
    { time: "-24h", windSpeed: 40, pressure: 998, eyeDiameterKm: 0, convectiveTempK: 222 },
    { time: "-12h", windSpeed: 60, pressure: 984, eyeDiameterKm: 38, convectiveTempK: 204 },
    { time: "Now",   windSpeed: 75, pressure: 974, eyeDiameterKm: 28, convectiveTempK: 194.5 },
    { time: "+24h", windSpeed: 95, pressure: 956, eyeDiameterKm: 22, convectiveTempK: 187 },
    { time: "+48h", windSpeed: 105, pressure: 948, eyeDiameterKm: 20, convectiveTempK: 184 },
    { time: "+72h", windSpeed: 60, pressure: 985, eyeDiameterKm: 0, convectiveTempK: 215 }
  ];

  const metricConfigs = {
    windSpeed: { label: "Max Wind Speed (kt)", color: "#00f0ff", unit: "kt", min: 0, max: 160 },
    pressure: { label: "Central Pressure (hPa)", color: "#f59e0b", unit: "hPa", min: 900, max: 1020 },
    eyeDiameterKm: { label: "Eye Diameter (km)", color: "#10b981", unit: "km", min: 0, max: 80 },
    convectiveTempK: { label: "Cloud Top Temp (K)", color: "#ef4444", unit: "K", min: 170, max: 260 }
  };

  const currentConfig = metricConfigs[activeMetric];

  // SVG dimensions
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  // Scale calculations
  const getX = (idx) => padding.left + (idx / (points.length - 1)) * innerW;
  const getY = (val) => {
    const range = currentConfig.max - currentConfig.min;
    const normalized = (val - currentConfig.min) / range;
    return padding.top + innerH - (normalized * innerH);
  };

  // Build SVG Path string
  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt[activeMetric] || 0);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Area Path string
  const areaD = `${pathD} L ${getX(points.length - 1)} ${padding.top + innerH} L ${getX(0)} ${padding.top + innerH} Z`;

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-900/40">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-blue-900/30 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          {title}
        </h4>

        {/* Metric Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveMetric('windSpeed')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeMetric === 'windSpeed'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Wind Speed
          </button>
          <button
            onClick={() => setActiveMetric('pressure')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeMetric === 'pressure'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pressure
          </button>
          <button
            onClick={() => setActiveMetric('eyeDiameterKm')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeMetric === 'eyeDiameterKm'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Eye Diameter
          </button>
          <button
            onClick={() => setActiveMetric('convectiveTempK')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
              activeMetric === 'convectiveTempK'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cloud Temp
          </button>
        </div>
      </div>

      {/* SVG Responsive Container */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentConfig.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={currentConfig.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + innerH * pct;
            return (
              <line
                key={idx}
                x1={padding.left}
                y1={y}
                x2={padding.left + innerW}
                y2={y}
                stroke="rgba(59, 130, 246, 0.15)"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill={`url(#gradient-${activeMetric})`} />

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke={currentConfig.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Circles & Hover interactions */}
          {points.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt[activeMetric] || 0);
            const isNow = pt.time === 'Now';

            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(pt)} onMouseLeave={() => setHoveredPoint(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isNow ? "6" : "4"}
                  fill={isNow ? "#ffffff" : currentConfig.color}
                  stroke={isNow ? currentConfig.color : "#0b1736"}
                  strokeWidth="2"
                />
                {/* X Axis Labels */}
                <text
                  x={x}
                  y={height - 12}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                >
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-navy-950/90 border border-cyan-400/50 p-2 rounded text-xs font-mono text-slate-200">
            <p className="text-cyan-400 font-bold">{hoveredPoint.time} Observation</p>
            <p>{currentConfig.label}: <span className="font-bold text-slate-100">{hoveredPoint[activeMetric]} {currentConfig.unit}</span></p>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>X-Axis: Observation Timeline (Historical → Forecast)</span>
        <span>Source: INSAT-3D & AI Temporal Features</span>
      </div>
    </div>
  );
}
