import React, { useState, useRef, useEffect } from 'react';
import {
  Layers, ZoomIn, ZoomOut, Eye, EyeOff, RotateCcw, Maximize2, Minimize2,
  Sliders, Calendar, Clock, MapPin, Radio, Grid, Cpu, Activity, Info, ShieldCheck, CheckCircle2
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const LAYER_OPTIONS = [
  { id: 'BASE IMAGE', label: 'BASE IMAGE', desc: 'Visible / Natural Spectrum' },
  { id: 'CLOUD TOP', label: 'CLOUD TOP', desc: 'Convective Outflow Temp' },
  { id: 'THERMAL IR', label: 'THERMAL IR', desc: '10.8 µm IR Imagery' },
  { id: 'WATER VAPOR', label: 'WATER VAPOR', desc: '6.8 µm Outflow Moisture' },
  { id: 'MICROWAVE', label: 'MICROWAVE', desc: '89 GHz Deep Convection' },
  { id: 'PRECIPITATION', label: 'PRECIPITATION', desc: 'Rain Rate Intensity' },
  { id: 'OCEAN WINDS', label: 'OCEAN WINDS', desc: 'Scatterometer Wind Vectors' },
  { id: 'SAR', label: 'SAR', desc: 'C-Band Surface Roughness' }
];

export default function SatelliteViewer({
  sources = [],
  selectedSourceId = null,
  isFusionActive = false
}) {
  const [activeLayer, setActiveLayer] = useState('BASE IMAGE');
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.85);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showEyeMarker, setShowEyeMarker] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewerContainerRef = useRef(null);

  // Active Source derivation
  const currentSource = sources.find(s => s.id === selectedSourceId) || sources[0] || {};

  // Reset channel index when active source changes
  useEffect(() => {
    setActiveChannelIndex(0);
  }, [selectedSourceId]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return;
    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleResetView = () => {
    setZoomLevel(1.0);
    setOpacity(0.85);
    setShowOverlay(true);
    setShowGrid(true);
    setShowEyeMarker(true);
  };

  const sampleImage = currentSource?.sampleImages?.[activeChannelIndex] || currentSource?.sampleImages?.[0] || {
    title: "INSAT-3D Enhanced Thermal Infrared Channel",
    band: "TIR-1 (10.8 µm)",
    timestamp: "2026-09-11T15:30:00Z",
    cloudTopTemp: "-78.4 °C",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    eyeCoordinates: "15.40°N, 88.20°E"
  };

  // Helper for dynamic layer filter CSS
  const getLayerFilterStyle = () => {
    if (isFusionActive) {
      return { filter: 'contrast(125%) saturate(140%) brightness(1.05)', mixBlendMode: 'normal' };
    }
    switch (activeLayer) {
      case 'CLOUD TOP':
        return { filter: 'contrast(140%) hue-rotate(190deg) saturate(180%)' };
      case 'THERMAL IR':
        return { filter: 'hue-rotate(220deg) contrast(130%) saturate(150%)' };
      case 'WATER VAPOR':
        return { filter: 'hue-rotate(180deg) brightness(1.1) saturate(160%)' };
      case 'MICROWAVE':
        return { filter: 'hue-rotate(90deg) saturate(200%) contrast(120%)' };
      case 'PRECIPITATION':
        return { filter: 'hue-rotate(290deg) contrast(150%) saturate(180%)' };
      case 'OCEAN WINDS':
        return { filter: 'hue-rotate(150deg) brightness(0.95) saturate(140%)' };
      case 'SAR':
        return { filter: 'grayscale(100%) contrast(175%) brightness(0.9)' };
      case 'BASE IMAGE':
      default:
        return { filter: 'none' };
    }
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-900/40 space-y-4">
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/30 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-heading font-bold text-slate-100 text-sm">
            {currentSource?.name || 'INSAT-3D / 3DR'}
          </span>
          <StatusBadge status="ACTIVE" label={currentSource?.category || "GEOSTATIONARY"} />
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800/40 text-cyan-400 font-bold">
            {currentSource?.dataStatus || 'DEMO STREAM'}
          </span>
        </div>

        {/* Compact Layer Control Bar */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" /> LAYER:
          </span>
          {LAYER_OPTIONS.map((layer) => {
            const isSupported = !currentSource?.layers || currentSource.layers.includes(layer.id) || isFusionActive;
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                title={`${layer.label}: ${layer.desc}`}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all border whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm'
                    : isSupported
                    ? 'bg-navy-950/60 border-blue-900/30 text-slate-300 hover:border-blue-700 hover:text-slate-100'
                    : 'bg-navy-950/30 border-blue-950/20 text-slate-600 cursor-not-allowed opacity-60'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Image Viewer Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Satellite Viewport */}
        <div
          ref={viewerContainerRef}
          className="lg:col-span-2 relative rounded-xl overflow-hidden bg-navy-950 border border-blue-900/50 min-h-[420px] max-h-[580px] flex items-center justify-center select-none"
        >
          {/* Main Background Image */}
          <div
            className="w-full h-full min-h-[420px] bg-cover bg-center transition-all duration-300 relative flex items-center justify-center"
            style={{
              backgroundImage: `url(${sampleImage.url})`,
              opacity: opacity,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              ...getLayerFilterStyle()
            }}
          >
            {/* SVG Wind Vector / Lat-Long Grid / Convective Outflow Overlay Layer */}
            {showOverlay && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Lat / Long Grid Overlay */}
                {showGrid && (
                  <g opacity="0.35" stroke="#00f0ff" strokeWidth="0.75" strokeDasharray="3,3">
                    <line x1="0" y1="25%" x2="100%" y2="25%" />
                    <text x="12" y="24%" fill="#00f0ff" fontSize="10" fontFamily="monospace">20°00'N</text>
                    <line x1="0" y1="50%" x2="100%" y2="50%" />
                    <text x="12" y="49%" fill="#00f0ff" fontSize="10" fontFamily="monospace">15°24'N</text>
                    <line x1="0" y1="75%" x2="100%" y2="75%" />
                    <text x="12" y="74%" fill="#00f0ff" fontSize="10" fontFamily="monospace">10°00'N</text>

                    <line x1="25%" y1="0" x2="25%" y2="100%" />
                    <text x="25.5%" y="20" fill="#00f0ff" fontSize="10" fontFamily="monospace">82°00'E</text>
                    <line x1="50%" y1="0" x2="50%" y2="100%" />
                    <text x="50.5%" y="20" fill="#00f0ff" fontSize="10" fontFamily="monospace">88°12'E</text>
                    <line x1="75%" y1="0" x2="75%" y2="100%" />
                    <text x="75.5%" y="20" fill="#00f0ff" fontSize="10" fontFamily="monospace">94°00'E</text>
                  </g>
                )}

                {/* Ocean Wind Vector Field Overlay */}
                {(activeLayer === 'OCEAN WINDS' || isFusionActive) && (
                  <g opacity="0.6" stroke="#38bdf8" strokeWidth="1.2">
                    <path d="M 40% 40% Q 42% 48% 48% 48%" fill="none" />
                    <path d="M 60% 40% Q 52% 42% 52% 48%" fill="none" />
                    <path d="M 60% 60% Q 58% 52% 52% 52%" fill="none" />
                    <path d="M 40% 60% Q 48% 58% 48% 52%" fill="none" />
                  </g>
                )}

                {/* Radar Scanline Effect */}
                <rect width="100%" height="2" fill="rgba(0, 240, 255, 0.25)" className="animate-scanline" />
              </svg>
            )}

            {/* Eye Target Bounding Overlay Marker */}
            {showEyeMarker && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-36 h-36 border-2 border-dashed border-cyan-400 rounded-full flex items-center justify-center animate-spin-slow">
                  <div className="w-24 h-24 border border-rose-500/70 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]"></div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-950/90 border border-cyan-400 text-[10px] text-cyan-300 px-2.5 py-0.5 rounded font-mono shadow-lg flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>CYCLONE EYE: {sampleImage.eyeCoordinates}</span>
                </div>
              </div>
            )}

            {/* Fusion Mode Badge Banner */}
            {isFusionActive && (
              <div className="absolute top-4 left-4 bg-cyan-950/90 border border-cyan-400/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-xl animate-fade-in">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold">MULTI-SOURCE FUSION COMPOSITE</span>
                <span className="bg-cyan-500/20 text-cyan-200 text-[10px] px-1.5 py-0.5 rounded font-semibold border border-cyan-400/40">
                  DEMO FUSION
                </span>
              </div>
            )}
          </div>

          {/* Floating Viewer Controls Toolbar */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-navy-950/85 backdrop-blur-md p-1.5 rounded-lg border border-blue-900/50 shadow-lg text-xs z-10">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-navy-900 rounded transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-navy-900 rounded transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-navy-900 rounded transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="w-px h-4 bg-blue-900/50 mx-1"></div>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded transition-colors ${showGrid ? 'text-cyan-400 bg-navy-900' : 'text-slate-500'}`}
              title="Toggle Lat/Long Grid"
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowEyeMarker(!showEyeMarker)}
              className={`p-1.5 rounded transition-colors ${showEyeMarker ? 'text-rose-400 bg-navy-900' : 'text-slate-500'}`}
              title="Toggle Cyclone Eye Marker"
            >
              <MapPin className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`p-1.5 rounded transition-colors ${showOverlay ? 'text-cyan-400 bg-navy-900' : 'text-slate-500'}`}
              title="Toggle Layer Overlays"
            >
              {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-navy-900 rounded transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Bottom Info Stamp */}
          <div className="absolute bottom-3 left-3 right-3 bg-navy-950/90 backdrop-blur-md border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{sampleImage.title}</span>
              <span className="text-cyan-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
                {sampleImage.band}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>SCAN TIME: <strong className="text-slate-200">{sampleImage.timestamp}</strong></span>
              <span className="text-rose-400 font-bold">{sampleImage.cloudTopTemp}</span>
            </div>
          </div>
        </div>

        {/* Right Metadata & Controls Panel */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> OBSERVATION METADATA
              </h4>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/40 font-bold">
                {currentSource?.dataStatus || 'DEMO STREAM'}
              </span>
            </div>

            {/* Dynamic Metadata Table */}
            <div className="space-y-1.5 text-xs bg-navy-950/70 p-3 rounded-lg border border-blue-900/40 font-mono">
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Satellite / Sensor:</span>
                <span className="font-semibold text-cyan-300 text-right">{currentSource?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Operator / Agency:</span>
                <span className="text-slate-200 text-right">{currentSource?.operator || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Orbit Type:</span>
                <span className="text-slate-300 text-right text-[11px] max-w-[200px] truncate">{currentSource?.orbitType || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Primary Observation:</span>
                <span className="text-emerald-400 font-semibold text-right text-[11px] max-w-[200px] truncate">{currentSource?.primaryObservation || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Spatial Resolution:</span>
                <span className="text-slate-200 text-right">{currentSource?.resolution || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Update Cadence:</span>
                <span className="text-cyan-400 text-right">{currentSource?.updateFrequency || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/20">
                <span className="text-slate-400">Spatial Coverage:</span>
                <span className="text-slate-300 text-right text-[11px] max-w-[200px] truncate">{currentSource?.coverage || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Convective / Wind Metric:</span>
                <span className="text-rose-400 font-bold text-right">{sampleImage?.cloudTopTemp || 'N/A'}</span>
              </div>
            </div>

            {/* Channels Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase font-mono block mb-1.5">
                SPECTRAL / FREQUENCY CHANNELS
              </label>
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
                {currentSource?.channels?.map((channel, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setActiveChannelIndex(cIdx)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded border transition-all font-mono flex items-center justify-between ${
                      activeChannelIndex === cIdx
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-navy-950/50 border-blue-900/30 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{channel}</span>
                    {activeChannelIndex === cIdx && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="pt-1">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>Overlay Opacity:</span>
                <span className="text-cyan-400 font-bold">{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Section 7: "WHAT THIS SOURCE CONTRIBUTES" */}
          <div className="p-3 rounded-lg bg-blue-950/40 border border-cyan-900/40 space-y-1.5">
            <h5 className="text-[11px] font-bold uppercase font-mono text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> WHAT THIS SOURCE CONTRIBUTES
            </h5>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              "{currentSource?.contribution || 'Provides critical satellite-based observations for tropical cyclone analysis and structure assessment.'}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
