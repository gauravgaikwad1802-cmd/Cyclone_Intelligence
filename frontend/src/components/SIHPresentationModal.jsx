import React, { useState, useEffect } from 'react';
import { PlayCircle, PauseCircle, RefreshCw, CheckCircle2, ArrowRight, X, Shield, Activity, Radio, Cpu, Layers, BrainCircuit, AlertTriangle, Satellite } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SIHPresentationModal({ isOpen, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepProgress, setStepProgress] = useState(100);

  const steps = [
    {
      title: "STEP 1 — Satellite Data Ingestion",
      icon: Satellite,
      badge: "INGESTION STREAM",
      status: "SUCCESS",
      time: "00:30",
      description: "Automated real-time ingestion of INSAT-3D/3DR Thermal IR-1 (10.8µm) and Himawari-9 multispectral swaths over the Bay of Bengal and Arabian Sea.",
      telemetry: "Ingested: 4 Channels | Resolution: 1 km | Format: NetCDF4 / GeoTIFF"
    },
    {
      title: "STEP 2 — Image Processing & Radiometric Correction",
      icon: RefreshCw,
      badge: "PREPROCESSING PIPELINE",
      status: "SUCCESS",
      time: "00:55",
      description: "Noise reduction, parallax correction, cloud-top brightness temperature calibration, and spatial enhancement over tropical ocean coordinates.",
      telemetry: "Calibrated BT Range: 184K to 310K | Spatial Resampling: 1.0 km/pixel"
    },
    {
      title: "STEP 3 — AI Cyclone Detection & Center Bounding",
      icon: Activity,
      badge: "DETECTION MODEL",
      status: "SUCCESS",
      time: "01:20",
      description: "Vision Transformer (ViT-B/16) detects vortex eye center at 15.40°N, 88.20°E with 92.8% detection confidence.",
      telemetry: "Bounding Box: [x:180, y:150, w:180, h:180] | Vortex Score: 0.94"
    },
    {
      title: "STEP 4 — Pattern Classification & Rapid Intensification",
      icon: Layers,
      badge: "SPATIAL CLASSIFIER",
      status: "SUCCESS",
      time: "01:45",
      description: "Spatial Feature CNN classifies cyclone pattern as 'Rapid Intensification' (87.3% probability) with central cloud-top cooling.",
      telemetry: "Eyewall Symmetry: 0.86 | CDO Expansion: High | Pattern Code: SCS-RI"
    },
    {
      title: "STEP 5 — Intensity Prediction & Pressure Estimation",
      icon: Cpu,
      badge: "INTENSITY ENGINE",
      status: "SUCCESS",
      time: "02:10",
      description: "Recurrent Deep Neural Net predicts maximum sustained surface wind reaching 90 knots (165 km/h) and minimum pressure dropping to 960 hPa within 24 hours.",
      telemetry: "Predicted Wind: 90 kt | Pressure: 960 hPa | MAE: ±4.2 kt"
    },
    {
      title: "STEP 6 — Track Prediction & Uncertainty Cones",
      icon: BrainCircuit,
      badge: "TRAJECTORY TRANSFORMER",
      status: "SUCCESS",
      time: "02:35",
      description: "Ensemble Trajectory Transformer projects 72-hour recurving track towards Odisha/West Bengal coast near Puri & Dhamra.",
      telemetry: "24h Error: 32.4 km | 48h Error: 68.1 km | Landfall Window: 48 Hours"
    },
    {
      title: "STEP 7 — Risk & Automated Alert Generation",
      icon: AlertTriangle,
      badge: "DISASTER DECISION SUPPORT",
      status: "SUCCESS",
      time: "03:00",
      description: "Automated generation of Critical Coastal Watch alerts, district vulnerability assessment matrix, and downloadable advisory reports.",
      telemetry: "Alert Level: CRITICAL | Affected Districts: Kendrapara, Balasore, WB"
    }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, steps.length]);

  if (!isOpen) return null;

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-sans">
      <div className="w-full max-w-4xl bg-navy-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-blue-900/40 bg-navy-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-navy-950 font-bold shadow-md">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
                  SIH EVALUATOR DEMONSTRATION MODE
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-mono border border-amber-500/30">
                  7-STAGE LIVE SIMULATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Interactive walkthrough demonstrating full end-to-end satellite ingestion, AI classification, prediction, and alerting.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-slate-100 border border-blue-900/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Stepper Navigation Pills */}
          <div className="grid grid-cols-7 gap-1.5 font-mono text-[10px]">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                className={`p-2 rounded-lg border text-center transition-all ${
                  activeStep === idx
                    ? 'bg-cyan-500 text-navy-950 font-bold border-cyan-400 shadow-md scale-105'
                    : idx < activeStep
                    ? 'bg-navy-950 text-cyan-400 border-cyan-500/30'
                    : 'bg-navy-950/60 text-slate-500 border-blue-900/20 hover:text-slate-300'
                }`}
              >
                STAGE {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Stage Display Card */}
          <div className="p-6 rounded-2xl bg-navy-950/90 border border-cyan-500/30 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-lg text-slate-100">{currentStep.title}</h4>
                  <span className="text-xs text-cyan-400 font-mono">{currentStep.badge}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STATUS: {currentStep.status}</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{currentStep.description}</p>

            <div className="p-3 rounded-xl bg-navy-900/80 border border-blue-900/30 font-mono text-xs text-cyan-300 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block">LIVE PIPELINE TELEMETRY</span>
              <p>{currentStep.telemetry}</p>
            </div>
          </div>
        </div>

        {/* Modal Controls Footer */}
        <div className="p-4 border-t border-blue-900/40 bg-navy-950 flex items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-navy-950 font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all"
            >
              {isPlaying ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Start Auto Simulation'}</span>
            </button>

            <button
              onClick={() => { setActiveStep(0); setIsPlaying(false); }}
              className="px-3 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-blue-800/40 text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Restart Demonstration</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              className="px-3 py-2 rounded-xl bg-navy-900 disabled:opacity-40 text-slate-300 border border-blue-800/40 hover:bg-navy-800 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={activeStep === steps.length - 1}
              onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors font-bold"
            >
              Next Stage →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
