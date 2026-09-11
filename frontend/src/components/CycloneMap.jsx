import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Compass, Wind, Gauge, Shield, Layers, Eye, EyeOff } from 'lucide-react';
import StatusBadge from './StatusBadge';

// Custom Leaflet Icons using SVG Data URIs
const createCycloneIcon = (category) => {
  let color = '#10b981'; // Green
  if (category?.includes('Severe') || category?.includes('Super')) color = '#ef4444'; // Red
  else if (category?.includes('Cyclonic Storm')) color = '#f97316'; // Orange
  else if (category?.includes('Depression')) color = '#f59e0b'; // Yellow

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" fill="${color}" fill-opacity="0.3"/>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  `;
  return L.divIcon({
    html: `<div class="animate-spin-slow">${svg}</div>`,
    className: 'cyclone-custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const createLandfallPinIcon = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#ef4444" stroke="#ffffff" stroke-width="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'landfall-pin-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
};

export default function CycloneMap({
  cyclones = [],
  selectedCyclone = null,
  onSelectCyclone = () => {},
  height = '500px'
}) {
  const activeCyclone = selectedCyclone || cyclones[0] || null;

  // Layer Toggles State (Feature #2: Advanced Map Controls)
  const [showSatelliteLayer, setShowSatelliteLayer] = useState(true);
  const [showCycloneTrack, setShowCycloneTrack] = useState(true);
  const [showForecastTrack, setShowForecastTrack] = useState(true);
  const [showWindRadius, setShowWindRadius] = useState(true);
  const [showUncertaintyCone, setShowUncertaintyCone] = useState(true);
  const [showLandfallLocation, setShowLandfallLocation] = useState(true);
  const [showCurrentPosition, setShowCurrentPosition] = useState(true);
  const [showHistoricalTracks, setShowHistoricalTracks] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  // Track coordinates
  const historicalPositions = activeCyclone?.track?.map(t => [t.latitude, t.longitude]) || [];
  const currentPos = activeCyclone?.currentLocation
    ? [activeCyclone.currentLocation.latitude, activeCyclone.currentLocation.longitude]
    : [15.40, 88.20];

  const predictedPositions = activeCyclone?.predictions
    ? [currentPos, ...activeCyclone.predictions.map(p => [p.latitude, p.longitude])]
    : [];

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-blue-900/40 glass-panel" style={{ height }}>
      {/* Top Map Layer Control Bar Button */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col items-end gap-2 font-mono">
        <button
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          className="px-3 py-1.5 rounded-lg bg-navy-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 shadow-xl hover:bg-navy-900 transition-all"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>MAP LAYERS & CONTROLS</span>
        </button>

        {/* Expanded Layer Toggle Drawer */}
        {isControlsOpen && (
          <div className="bg-navy-950/95 backdrop-blur-md border border-cyan-500/40 p-3 rounded-xl shadow-2xl text-xs space-y-2 w-64 text-slate-200 glass-panel animate-fade-in">
            <p className="font-bold text-cyan-400 border-b border-blue-900/40 pb-1 uppercase tracking-wider text-[11px]">
              TOGGLE VISIBILITY LAYERS
            </p>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Dark Satellite Layer</span>
              <input
                type="checkbox"
                checked={showSatelliteLayer}
                onChange={(e) => setShowSatelliteLayer(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Observed Cyclone Track</span>
              <input
                type="checkbox"
                checked={showCycloneTrack}
                onChange={(e) => setShowCycloneTrack(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Forecast Track Line</span>
              <input
                type="checkbox"
                checked={showForecastTrack}
                onChange={(e) => setShowForecastTrack(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Outer Wind Radius Circle</span>
              <input
                type="checkbox"
                checked={showWindRadius}
                onChange={(e) => setShowWindRadius(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Uncertainty Cones</span>
              <input
                type="checkbox"
                checked={showUncertaintyCone}
                onChange={(e) => setShowUncertaintyCone(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Landfall Location Pins</span>
              <input
                type="checkbox"
                checked={showLandfallLocation}
                onChange={(e) => setShowLandfallLocation(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>Current Position Markers</span>
              <input
                type="checkbox"
                checked={showCurrentPosition}
                onChange={(e) => setShowCurrentPosition(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 hover:text-cyan-300">
              <span>All Historical Tracks</span>
              <input
                type="checkbox"
                checked={showHistoricalTracks}
                onChange={(e) => setShowHistoricalTracks(e.target.checked)}
                className="accent-cyan-400"
              />
            </label>
          </div>
        )}
      </div>

      <MapContainer
        center={currentPos}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {showSatelliteLayer && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & Scientific Radar'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        )}

        {/* Historical Track Line */}
        {showCycloneTrack && historicalPositions.length > 1 && (
          <Polyline
            positions={historicalPositions}
            pathOptions={{ color: '#00f0ff', weight: 3, opacity: 0.8 }}
          />
        )}

        {/* Predicted Forecast Track (Dashed) */}
        {showForecastTrack && predictedPositions.length > 1 && (
          <Polyline
            positions={predictedPositions}
            pathOptions={{ color: '#ef4444', weight: 3, dashArray: '8, 8', opacity: 0.9 }}
          />
        )}

        {/* Wind Radius Outer Circle */}
        {showWindRadius && activeCyclone?.windSpeedKt && (
          <Circle
            center={currentPos}
            radius={(activeCyclone.windSpeedKt * 3.5) * 1000}
            pathOptions={{
              color: '#06b6d4',
              fillColor: '#06b6d4',
              fillOpacity: 0.08,
              weight: 1.5
            }}
          />
        )}

        {/* Uncertainty Cones / Circles */}
        {showUncertaintyCone && activeCyclone?.predictions?.map((pred, idx) => (
          <Circle
            key={idx}
            center={[pred.latitude, pred.longitude]}
            radius={(pred.uncertaintyRadiusKm || 40) * 1000}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.12,
              weight: 1,
              dashArray: '4, 4'
            }}
          />
        ))}

        {/* Landfall Marker Pins */}
        {showLandfallLocation && cyclones.map((cyc) => {
          if (cyc.status === 'HISTORICAL' || cyc.category?.toLowerCase().includes('landfall')) {
            const pos = [cyc.currentLocation.latitude, cyc.currentLocation.longitude];
            return (
              <Marker key={`landfall-${cyc.id}`} position={pos} icon={createLandfallPinIcon()}>
                <Popup className="cyclone-popup">
                  <div className="p-1 text-xs font-mono">
                    <span className="font-bold text-rose-400 block">{cyc.name} — Landfall Impact Zone</span>
                    <span className="text-slate-300 block">{cyc.currentLocation?.formatted}</span>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}

        {/* Cyclone Position Markers */}
        {showCurrentPosition && cyclones.map((cyc) => {
          if (!showHistoricalTracks && cyc.status === 'HISTORICAL') return null;

          const pos = [cyc.currentLocation.latitude, cyc.currentLocation.longitude];
          return (
            <React.Fragment key={cyc.id}>
              <Marker
                position={pos}
                icon={createCycloneIcon(cyc.category)}
                eventHandlers={{ click: () => onSelectCyclone(cyc) }}
              >
                <Popup className="cyclone-popup">
                  <div className="p-1 min-w-[240px]">
                    <div className="flex items-center justify-between gap-2 border-b border-blue-800/40 pb-2 mb-2">
                      <span className="font-heading font-bold text-slate-100 text-sm">{cyc.name}</span>
                      <StatusBadge status={cyc.status} label={cyc.category} />
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Position:</span>
                        <span>{cyc.currentLocation.formatted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Wind:</span>
                        <span className="font-bold text-cyan-400">{cyc.windSpeedKt} kt ({cyc.windSpeedKmh} km/h)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pressure:</span>
                        <span>{cyc.pressureHpa} hPa</span>
                      </div>
                      <div className="flex justify-between border-t border-blue-900/30 pt-1 mt-1">
                        <span className="text-slate-400">Pattern:</span>
                        <span className="text-amber-400 font-semibold">{cyc.pattern}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-navy-950/85 backdrop-blur-md border border-blue-900/40 p-3 rounded-lg text-xs space-y-1.5 text-slate-300 font-mono shadow-lg">
        <p className="font-semibold text-cyan-400 mb-1 text-[11px] uppercase tracking-wider">MAP LAYER LEGEND</p>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-cyan-400"></span>
          <span>Observed Track</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-rose-500 border-b border-dashed border-rose-500"></span>
          <span>72h Forecast Path</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500"></span>
          <span>Uncertainty Cone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-400"></span>
          <span>Wind Radius Zone</span>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-blue-900/30 text-[10px] text-slate-400">
          <span>Region: North Indian Ocean</span>
        </div>
      </div>
    </div>
  );
}
