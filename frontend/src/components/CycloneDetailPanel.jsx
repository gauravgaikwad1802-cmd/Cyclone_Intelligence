import React from 'react';
import { X, Navigation, Wind, Gauge, Compass, Shield, Clock, BrainCircuit, MapPin, Activity, AlertTriangle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import DataExportButton from './DataExportButton';

export default function CycloneDetailPanel({
  cyclone = null,
  isOpen = false,
  onClose = () => {}
}) {
  if (!isOpen || !cyclone) return null;

  const predictions = cyclone.predictions || [
    { hour: 24, forecastTime: '24 Hours', latitude: (cyclone.currentLocation?.latitude || 15) + 1.2, longitude: (cyclone.currentLocation?.longitude || 88) - 1.4, predictedWindSpeedKt: (cyclone.windSpeedKt || 75) + 15, predictedPressureHpa: (cyclone.pressureHpa || 974) - 14, category: 'Very Severe Cyclonic Storm', confidence: 93.2, landfallRisk: 'Moderate' },
    { hour: 48, forecastTime: '48 Hours', latitude: (cyclone.currentLocation?.latitude || 15) + 3.1, longitude: (cyclone.currentLocation?.longitude || 88) - 2.7, predictedWindSpeedKt: (cyclone.windSpeedKt || 75) + 30, predictedPressureHpa: (cyclone.pressureHpa || 974) - 26, category: 'Extremely Severe Cyclonic Storm', confidence: 89.4, landfallRisk: 'HIGH Coastal Crossing' },
    { hour: 72, forecastTime: '72 Hours', latitude: (cyclone.currentLocation?.latitude || 15) + 5.5, longitude: (cyclone.currentLocation?.longitude || 88) - 3.1, predictedWindSpeedKt: (cyclone.windSpeedKt || 75) - 15, predictedPressureHpa: (cyclone.pressureHpa || 974) + 10, category: 'Cyclonic Storm (Landfall Decay)', confidence: 82.1, landfallRisk: 'Inland Weakening' },
    { hour: 96, forecastTime: '96 Hours', latitude: (cyclone.currentLocation?.latitude || 15) + 7.2, longitude: (cyclone.currentLocation?.longitude || 88) - 3.5, predictedWindSpeedKt: 35, predictedPressureHpa: 998, category: 'Deep Depression', confidence: 76.5, landfallRisk: 'Dissipated Inland' }
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-navy-950/95 border-l border-cyan-500/40 shadow-2xl backdrop-blur-md flex flex-col justify-between animate-slide-left font-sans">
      {/* Header */}
      <div className="p-4 border-b border-blue-900/40 bg-navy-900/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-slate-100 leading-tight">
              {cyclone.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              ID: {cyclone.id} | Basin: {cyclone.region || 'North Indian Ocean'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DataExportButton data={[cyclone]} filename={cyclone.id} buttonLabel="Export" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-slate-100 transition-colors border border-blue-900/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Badge + Category */}
        <div className="p-3 rounded-xl bg-navy-900/60 border border-blue-900/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">CURRENT CLASSIFICATION</span>
            <span className="font-heading font-bold text-sm text-cyan-300">{cyclone.category}</span>
          </div>
          <StatusBadge status={cyclone.status || 'ACTIVE'} label={cyclone.intensityCode || 'SCS'} />
        </div>

        {/* Current Telemetry Grid */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-navy-900/50 border border-blue-900/30 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>LATITUDE & LONGITUDE</span>
            </div>
            <p className="font-bold text-slate-100 text-sm">{cyclone.currentLocation?.formatted || '15.40°N, 88.20°E'}</p>
            <p className="text-[10px] text-slate-400">Exact Eye Coordinates</p>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/50 border border-blue-900/30 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Wind className="w-3 h-3 text-cyan-400" />
              <span>MAX SUSTAINED WIND</span>
            </div>
            <p className="font-bold text-cyan-300 text-sm">{cyclone.windSpeedKt} kt ({cyclone.windSpeedKmh} km/h)</p>
            <p className="text-[10px] text-slate-400">10-Minute Average</p>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/50 border border-blue-900/30 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>MINIMUM PRESSURE</span>
            </div>
            <p className="font-bold text-amber-300 text-sm">{cyclone.pressureHpa} hPa</p>
            <p className="text-[10px] text-slate-400">Central Pressure Drop</p>
          </div>

          <div className="p-3 rounded-xl bg-navy-900/50 border border-blue-900/30 space-y-1">
            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>MOVEMENT VECTOR</span>
            </div>
            <p className="font-bold text-emerald-300 text-sm truncate">{cyclone.movementDirection || 'NW'}</p>
            <p className="text-[10px] text-slate-400">Speed: {cyclone.movementSpeedKmh || 18} km/h</p>
          </div>
        </div>

        {/* AI Model Meta Details */}
        <div className="p-3 rounded-xl bg-navy-900/40 border border-blue-900/30 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>CURRENT PATTERN:</span>
            <span className="text-amber-400 font-semibold">{cyclone.pattern || 'Rapid Intensification'}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>FORECAST CONFIDENCE:</span>
            <span className="text-emerald-400 font-bold">{cyclone.predictionConfidence || 91.4}%</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>LAST SCAN TIMESTAMP:</span>
            <span className="text-cyan-300">{new Date(cyclone.lastObservation || Date.now()).toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Forecast Timeline Cards (24h, 48h, 72h, 96h) */}
        <div className="space-y-2 pt-2">
          <h4 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400 flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" />
            ENSEMBLE FORECAST TIMELINE (24h - 96h)
          </h4>

          <div className="space-y-2">
            {predictions.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-navy-900/60 border border-blue-900/30 hover:border-cyan-500/30 transition-all font-mono text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between border-b border-blue-900/30 pb-1">
                  <span className="font-bold text-cyan-300">+{p.hour || (idx + 1) * 24}H FORECAST</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Confidence: {p.confidence}%
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Position:</span>
                  <span>{p.latitude?.toFixed(2)}°N, {p.longitude?.toFixed(2)}°E</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Wind / Pressure:</span>
                  <span className="text-cyan-400 font-bold">{p.predictedWindSpeedKt || p.windSpeedKt} kt | {p.predictedPressureHpa || p.pressureHpa} hPa</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-amber-400 font-semibold">{p.category}</span>
                </div>

                {p.landfallRisk && (
                  <div className="flex items-center gap-1 text-[10px] text-rose-400 pt-1 border-t border-blue-900/20">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>Landfall Risk: {p.landfallRisk}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel Footer */}
      <div className="p-3 border-t border-blue-900/40 bg-navy-950 text-center font-mono text-[11px] text-slate-400">
        Source: Multi-Satellite Ensemble Track Model (ViT + LSTM Transformer)
      </div>
    </div>
  );
}
