import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Shield,
  Radio,
  Layers,
  BrainCircuit,
  Navigation,
  Satellite,
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe,
  Award
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function LandingPage({ onOpenPresentationMode }) {
  const navigate = useNavigate();

  const pipelineSteps = [
    { num: "01", title: "Multi-Source Data", desc: "INSAT-3D, Himawari-9, GPM Microwave & Oceansat Scatterometer ocean wind streams." },
    { num: "02", title: "AI Detection", desc: "Vision Transformer (ViT-B/16) pinpoints convective cyclone eye & bounding coordinates." },
    { num: "03", title: "Pattern Classification", desc: "Spatial feature classifier detects Rapid Intensification, Mature, or Weakening patterns." },
    { num: "04", title: "Temporal Analysis", desc: "Bidirectional LSTM tracks 36-hour intensity, pressure drop, & convective cloud trends." },
    { num: "05", title: "Cyclone Prediction", desc: "Ensemble trajectory model forecasts 72-hour track with uncertainty probability cone." }
  ];

  const capabilities = [
    { icon: Navigation, title: "Cyclone Detection", desc: "Automated satellite eye extraction with bounding box precision." },
    { icon: Layers, title: "Pattern Classification", desc: "Detects Rapid Intensification & mature structural evolutions." },
    { icon: BrainCircuit, title: "Temporal Analysis", desc: "Multi-timestep deep learning across 6h – 72h observation windows." },
    { icon: Activity, title: "Prediction Engine", desc: "72-hour forecast trajectory with dynamic uncertainty cone." },
    { icon: Satellite, title: "Satellite Visualization", desc: "Multi-spectral channel inspector (Infrared, Water Vapor, Microwave)." },
    { icon: BarChart3, title: "Historical Analysis", desc: "Searchable archive of Super Cyclone Amphan, Biparjoy & Tauktae." },
    { icon: Shield, title: "Risk Insights", desc: "Coastal landfall risk scoring for disaster mitigation." },
    { icon: Radio, title: "Early Warning Support", desc: "Automated alert engine with SMS/Email decision support dispatch." }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 selection:bg-cyan-500 selection:text-navy-950">
      {/* Landing Top Header */}
      <header className="border-b border-blue-900/30 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 text-navy-950 font-bold" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-wider text-slate-100">
              CYCLONE<span className="text-cyan-400">INTELLIGENCE</span>
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-500/30">
              SIH-2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPresentationMode}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-navy-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110"
          >
            SIH Presentation Mode
          </button>
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 border border-blue-800/40 text-slate-200 text-xs font-semibold"
          >
            Demo Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>AI/ML • MULTI-SOURCE SATELLITE • PREDICTION</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
            AI-Powered Tropical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Cyclone Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
            Multi-source satellite data driven identification, classification and prediction of tropical cyclone patterns for decision support across the North Indian Ocean.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-navy-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-transform"
            >
              <span>Open Intelligence Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/models"
              className="px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-850 border border-blue-800/40 text-slate-200 font-semibold text-sm transition-colors"
            >
              Explore System Architecture
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ISRO INSAT-3D Ingestion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vision Transformer Eye Detection</span>
            </div>
          </div>
        </div>

        {/* Hero Satellite Cyclone Radar Radar Visual */}
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-md aspect-square rounded-full border border-cyan-500/20 bg-navy-900/40 relative flex items-center justify-center p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-4 rounded-full border border-blue-800/30"></div>
            <div className="absolute inset-16 rounded-full border border-blue-800/40"></div>
            <div className="absolute inset-28 rounded-full border border-cyan-500/30"></div>

            {/* Radar Scanline Animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full animate-spin-slow"></div>

            {/* Cyclone Spiral Representation */}
            <div className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-600/30 to-rose-500/40 flex items-center justify-center p-4 border border-cyan-400/50 shadow-inner animate-pulse">
              <div className="w-10 h-10 rounded-full bg-rose-500/80 border-2 border-white flex items-center justify-center shadow-lg shadow-rose-500/50">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Map Overlay Badge */}
            <div className="absolute bottom-6 bg-navy-950/90 border border-cyan-400/50 px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 shadow-lg">
              REGION: BAY OF BENGAL (15.4°N, 88.2°E)
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Pipeline Flow */}
      <section className="px-6 py-16 bg-navy-900/40 border-y border-blue-900/30">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100">
              From Satellite Data to Actionable Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              End-to-end scientific pipeline transforming raw satellite observations into early warnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-blue-900/30 relative">
                <span className="text-2xl font-extrabold font-mono text-cyan-400/40 block mb-1">
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-sm text-slate-100 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Capabilities Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100">
            System Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Built for meteorological monitoring, satellite analytics, and disaster management command centers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div key={idx} className="glass-panel glass-panel-hover p-5 rounded-xl border border-blue-900/30">
                <div className="w-10 h-10 rounded-xl bg-navy-900 border border-blue-800/40 flex items-center justify-center text-cyan-400 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-100 mb-1">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Multi-Source Satellite Intelligence? */}
      <section className="px-6 py-16 bg-navy-900/40 border-t border-blue-900/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-100">
              Why Multi-Source Satellite Intelligence?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tropical cyclone behavior is dynamic and rapidly evolving. Single-sensor observations suffer from cloud opacity and limited swath coverage.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              By fusing Geostationary Infrared (INSAT-3D), Microwave Precipitation (GPM), and Polar Scatterometer Ocean Surface Wind Fields, our platform captures complementary physical parameters needed for accurate Rapid Intensification prediction.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-blue-900/40 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded bg-navy-950 border border-blue-900/30">
              <span className="text-slate-300">INSAT-3D Thermal IR</span>
              <span className="text-cyan-400">Cloud Top Temp (-78°C)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-navy-950 border border-blue-900/30">
              <span className="text-slate-300">GPM 89 GHz Microwave</span>
              <span className="text-emerald-400">Inner Core Rain Band Rate</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-navy-950 border border-blue-900/30">
              <span className="text-slate-300">Oceansat-3 Scatterometer</span>
              <span className="text-amber-400">Ocean Wind Vectors (75 kt)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="border-t border-blue-900/30 py-8 text-center text-xs text-slate-500 font-mono">
        <p>CYCLONE INTELLIGENCE — Satellite Intelligence for Tropical Cyclone Analysis</p>
        <p className="mt-1 text-[11px] text-slate-600">Smart India Hackathon (SIH 2026) Prototype Demonstration Platform</p>
      </footer>
    </div>
  );
}
