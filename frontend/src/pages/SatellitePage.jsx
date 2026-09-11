import React, { useState, useEffect, useRef } from 'react';
import {
  Satellite, Radio, Layers, Sliders, Calendar, Info, Filter, ChevronLeft, ChevronRight,
  Cpu, CheckCircle2, Activity, ArrowRight, Database, Sparkles, ShieldCheck, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SatelliteViewer from '../components/SatelliteViewer';
import StatusBadge from '../components/StatusBadge';
import { apiClient } from '../services/apiClient';

const CATEGORY_FILTERS = [
  { id: 'ALL', label: 'ALL SOURCES' },
  { id: 'GEOSTATIONARY', label: 'GEOSTATIONARY' },
  { id: 'POLAR-ORBITING', label: 'POLAR-ORBITING' },
  { id: 'MICROWAVE', label: 'MICROWAVE' },
  { id: 'SCATTEROMETER', label: 'SCATTEROMETER' },
  { id: 'SAR', label: 'SAR' }
];

export default function SatellitePage() {
  const [sources, setSources] = useState([]);
  const [activeSourceId, setActiveSourceId] = useState('SAT-INSAT3D');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isFusionActive, setIsFusionActive] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchSources = async () => {
      const res = await apiClient.getSatelliteSources();
      const loadedSources = res.data || [];
      setSources(loadedSources);
      if (loadedSources.length > 0 && !activeSourceId) {
        setActiveSourceId(loadedSources[0].id);
      }
    };
    fetchSources();
  }, []);

  // Filter sources by selected category
  const filteredSources = activeCategory === 'ALL'
    ? sources
    : sources.filter(s => s.category === activeCategory);

  // If active source gets filtered out, auto-select first visible source
  useEffect(() => {
    if (filteredSources.length > 0 && !filteredSources.some(s => s.id === activeSourceId)) {
      setActiveSourceId(filteredSources[0].id);
    }
  }, [activeCategory, filteredSources]);

  // Horizontal scroll controls
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const selectedSourceObj = sources.find(s => s.id === activeSourceId) || sources[0];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950 border border-cyan-500/30 text-cyan-400">
              <Satellite className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                  Multi-Source Satellite-Based Tropical Cyclone Intelligence System
                </h1>
                <StatusBadge status="DEMO STREAM" label="MULTI-SENSOR FUSION" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Geostationary Thermal IR, Polar Microwave Convective Rain Rates, Scatterometer Surface Wind Vectors & SAR Imagery.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Source Fusion Mode Main Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFusionActive(!isFusionActive)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border shadow-lg ${
              isFusionActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                : 'bg-navy-900/80 border-blue-800/40 text-slate-300 hover:border-cyan-500/50 hover:text-slate-100'
            }`}
          >
            <Cpu className={`w-4 h-4 ${isFusionActive ? 'text-cyan-400 animate-spin-slow' : 'text-slate-400'}`} />
            <span>MULTI-SOURCE FUSION MODE</span>
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
              isFusionActive ? 'bg-cyan-400 text-navy-950' : 'bg-navy-950 text-slate-400'
            }`}>
              {isFusionActive ? 'ENABLED' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Multi-Source Fusion Panel (Shown when Fusion Mode is ON) */}
      {isFusionActive && (
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/40 bg-navy-900/90 shadow-xl space-y-3 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/40 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="font-heading font-bold text-sm text-cyan-300 tracking-wide">
                MULTI-SPECTRAL MULTI-SENSOR FUSION PIPELINE ACTIVE
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                DEMO FUSION
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-300 flex-wrap">
              <span>FUSION STATUS: <strong className="text-emerald-400">READY</strong></span>
              <span>SOURCES SELECTED: <strong className="text-cyan-400">{sources.length} / 10</strong></span>
              <span>TIME ALIGNMENT: <strong className="text-cyan-400">SYNCHRONIZED (±12m)</strong></span>
              <span>QUALITY CHECK: <strong className="text-emerald-400">PASSED</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 pt-1 font-mono text-xs">
            {sources.map(src => (
              <div key={src.id} className="flex items-center justify-between p-2 rounded bg-navy-950 border border-cyan-900/30 text-slate-300">
                <span className="text-[11px] truncate">{src.shortName || src.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter & Source Selector Controls */}
      <div className="space-y-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-900/20 pb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> FILTER BY CATEGORY:
            </span>
            {CATEGORY_FILTERS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 border-cyan-400 text-slate-100 font-bold shadow-sm'
                    : 'bg-navy-950/60 border-blue-900/30 text-slate-400 hover:text-slate-200 hover:border-blue-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400">
            SHOWING <strong className="text-cyan-400">{filteredSources.length}</strong> OF 10 SATELLITE SOURCES
          </span>
        </div>

        {/* Section 2: Horizontally Scrollable Source Selector */}
        <div className="relative flex items-center">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-slate-300 hover:text-cyan-400 hover:bg-navy-850 z-10 mr-1 shrink-0"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredSources.map(s => {
              const isActive = activeSourceId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSourceId(s.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 border flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'bg-navy-950/70 border-blue-900/30 text-slate-400 hover:text-slate-100 hover:border-blue-700'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
                  <span>{s.shortName || s.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono ${
                    isActive ? 'bg-cyan-400 text-navy-950 font-bold' : 'bg-navy-900 text-slate-500'
                  }`}>
                    {s.category}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-slate-300 hover:text-cyan-400 hover:bg-navy-850 z-10 ml-1 shrink-0"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Satellite Imagery Viewer Container */}
      <SatelliteViewer
        sources={sources}
        selectedSourceId={activeSourceId}
        isFusionActive={isFusionActive}
      />

      {/* Section 8: Source Cards Grid Below Image */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
          <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            AVAILABLE SATELLITE DATA SOURCES GRID (10 SENSORS)
          </h3>
          <span className="text-xs font-mono text-slate-400">Click any card to load sensor stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {sources.map((src) => {
            const isSelected = src.id === activeSourceId;
            return (
              <div
                key={src.id}
                onClick={() => setActiveSourceId(src.id)}
                className={`glass-panel p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                    : 'border-blue-900/30 hover:border-blue-700/60 hover:bg-navy-900/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs text-cyan-300 truncate">{src.name}</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 border border-blue-800/40 text-cyan-400 font-bold">
                      {src.dataStatus || 'DEMO'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">{src.type}</p>
                </div>

                <div className="text-[11px] space-y-1 pt-2 border-t border-blue-900/20 text-slate-300 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operator:</span>
                    <span className="text-slate-300">{src.operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Primary Obs:</span>
                    <span className="text-cyan-400 text-right truncate max-w-[120px]">{src.primaryObservation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resolution:</span>
                    <span className="text-slate-300">{src.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cadence:</span>
                    <span className="text-emerald-400 font-semibold">{src.updateFrequency}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 9: Data Fusion Matrix */}
      <div className="glass-panel p-4 rounded-xl border border-blue-900/40 space-y-3">
        <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
          <div>
            <h3 className="font-heading font-bold text-base text-cyan-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              MULTI-SOURCE DATA FUSION MATRIX
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Scientific cross-sensor capability matrix illustrating why multi-spectral and microwave fusion is essential for cyclone tracking.
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-950 text-cyan-300 px-2.5 py-1 rounded border border-blue-800/40">
            COMPLEMENTARY SENSOR COVERAGE
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-blue-900/50 bg-navy-950 text-slate-300 uppercase">
                <th className="p-3">SATELLITE / SENSOR</th>
                <th className="p-3 text-center">CLOUD (VIS)</th>
                <th className="p-3 text-center">IR (10.8µm)</th>
                <th className="p-3 text-center">WV (6.8µm)</th>
                <th className="p-3 text-center">RAIN (MICROWAVE)</th>
                <th className="p-3 text-center">WIND (SCATTEROMETER)</th>
                <th className="p-3 text-center">SAR (C-BAND)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/20 text-slate-300">
              {sources.map(src => {
                const caps = src.capabilities || {};
                return (
                  <tr key={src.id} className="hover:bg-navy-900/50 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 flex items-center gap-2">
                      <span>{src.shortName || src.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({src.category})</span>
                    </td>
                    <td className="p-3 text-center">{caps.cloud ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                    <td className="p-3 text-center">{caps.ir ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                    <td className="p-3 text-center">{caps.wv ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                    <td className="p-3 text-center">{caps.rain ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                    <td className="p-3 text-center">{caps.wind ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                    <td className="p-3 text-center">{caps.sar ? <span className="text-emerald-400 font-bold text-sm">✓</span> : <span className="text-slate-700">-</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 10: Data Pipeline Indicator */}
      <div className="glass-panel p-4 rounded-xl border border-blue-900/40 space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
          SATELLITE DATA FUSION ARCHITECTURE FLOW
        </h4>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-1 font-mono text-xs">
          <div className="flex-1 w-full bg-navy-950 p-2.5 rounded-lg border border-blue-900/30 text-center">
            <span className="text-cyan-400 font-bold block text-[11px]">SATELLITE SOURCES</span>
            <span className="text-[10px] text-slate-400">10 Multi-Orbit Sensors</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden md:block shrink-0" />

          <div className="flex-1 w-full bg-navy-950 p-2.5 rounded-lg border border-blue-900/30 text-center">
            <span className="text-cyan-400 font-bold block text-[11px]">DATA INGESTION</span>
            <span className="text-[10px] text-slate-400">Telemetry Standardizer</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden md:block shrink-0" />

          <div className="flex-1 w-full bg-navy-950 p-2.5 rounded-lg border border-blue-900/30 text-center">
            <span className="text-cyan-400 font-bold block text-[11px]">QUALITY CONTROL</span>
            <span className="text-[10px] text-slate-400">Noise Filter & Calibration</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden md:block shrink-0" />

          <div className="flex-1 w-full bg-navy-950 p-2.5 rounded-lg border border-blue-900/30 text-center">
            <span className="text-cyan-400 font-bold block text-[11px]">TIME SYNCHRONIZATION</span>
            <span className="text-[10px] text-slate-400">Temporal Alignment (±12m)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden md:block shrink-0" />

          <div className="flex-1 w-full bg-navy-950 p-2.5 rounded-lg border border-blue-900/30 text-center">
            <span className="text-cyan-400 font-bold block text-[11px]">MULTI-SOURCE FUSION</span>
            <span className="text-[10px] text-slate-400">Multi-Spectral Composites</span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden md:block shrink-0" />

          <div className="flex-1 w-full bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-400/50 text-center">
            <span className="text-cyan-300 font-bold block text-[11px]">AI / ML ANALYSIS</span>
            <span className="text-[10px] text-cyan-200">ViT / ConvNeXt Model Input</span>
          </div>
        </div>
      </div>

      {/* Section 11: Connect with Existing AI/ML System */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-navy-900 via-blue-950 to-navy-900 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-cyan-300 flex items-center gap-2">
              AI PIPELINE INTEGRATION ACTIVE
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/40">
                LIVE INPUT FEED
              </span>
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Active satellite observations feed directly into Vision Transformer (ViT), ConvNeXt feature extraction & BiLSTM trajectory prediction models.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/models"
            className="px-3.5 py-1.5 rounded-lg bg-navy-950 border border-blue-800/50 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all flex items-center gap-1.5"
          >
            <span>VIEW AI MODELS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/prediction"
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-xs font-mono text-cyan-300 hover:bg-cyan-500/30 font-bold transition-all flex items-center gap-1.5"
          >
            <span>RUN AI INFERENCE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
