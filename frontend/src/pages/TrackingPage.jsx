import React, { useState, useEffect } from 'react';
import { Eye, RefreshCw } from 'lucide-react';

import CycloneMap from '../components/CycloneMap';
import StatusBadge from '../components/StatusBadge';
import CycloneDetailPanel from '../components/CycloneDetailPanel';
import DataExportButton from '../components/DataExportButton';
import { apiClient } from '../services/apiClient';

export default function TrackingPage() {
  const [cyclones, setCyclones] = useState([]);
  const [selectedCyclone, setSelectedCyclone] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCyclones = async () => {
    try {
      setLoading(true);

      const res = await apiClient.getCyclones();

      console.log('[TrackingPage] Cyclone API response:', res);

      // Backend format:
      // {
      //   success: true,
      //   data: [...]
      // }
      const cycloneData = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];

      console.log(
        '[TrackingPage] Cyclones received:',
        cycloneData.length,
        cycloneData
      );

      setCyclones(cycloneData);

      if (cycloneData.length > 0) {
        setSelectedCyclone((previous) => {
          if (!previous) return cycloneData[0];

          const updated = cycloneData.find(
            (c) => c.id === previous.id
          );

          return updated || cycloneData[0];
        });
      } else {
        setSelectedCyclone(null);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('[TrackingPage] Failed to load cyclones:', error);
      setCyclones([]);
      setSelectedCyclone(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCyclones();

    // Refresh cyclone data every 30 seconds.
    const interval = setInterval(fetchCyclones, 30000);

    return () => clearInterval(interval);
  }, []);

  const activeCyclone = selectedCyclone || cyclones[0] || {};

  const handleSelectCyclone = (cyclone) => {
    setSelectedCyclone(cyclone);
    setIsDetailOpen(true);
  };

  // --------------------------------------------------
  // SAFE DATA HELPERS
  // --------------------------------------------------

  const latitude =
    activeCyclone.currentLocation?.latitude ??
    activeCyclone.latitude;

  const longitude =
    activeCyclone.currentLocation?.longitude ??
    activeCyclone.longitude;

  const formattedLocation =
    activeCyclone.currentLocation?.formatted ||
    (
      latitude !== undefined &&
        longitude !== undefined
        ? `${Number(latitude).toFixed(2)}°N, ${Number(longitude).toFixed(2)}°E`
        : 'N/A'
    );

  const windSpeed =
    activeCyclone.windSpeedKt ??
    activeCyclone.windSpeed ??
    activeCyclone.maxWindKt;

  const pressure =
    activeCyclone.pressureHpa ??
    activeCyclone.pressure;

  const movementDirection =
    activeCyclone.movementDirection ||
    activeCyclone.movement?.direction ||
    'N/A';

  const movementSpeed =
    activeCyclone.movementSpeedKmh ??
    activeCyclone.movement?.speedKmh;

  return (
    <div className="w-full min-w-0 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 max-w-[1600px] mx-auto font-sans">

      {/* DETAIL TELEMETRY PANEL */}
      <CycloneDetailPanel
        cyclone={activeCyclone}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 border-b border-blue-900/30 pb-4">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Live Cyclone Tracking
            </h1>

            <StatusBadge
              status="LIVE"
              label="SATELLITE TRACK"
            />

          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1 leading-relaxed">
            Real-time tracking with 72-hour forecast path and uncertainty projections.
          </p>

        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">

          <button
            onClick={fetchCyclones}
            disabled={loading}
            className="w-full sm:w-auto px-3 py-2 rounded-lg bg-navy-900 border border-blue-900/40 text-cyan-400 text-xs font-mono font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>

          <DataExportButton
            data={cyclones}
            filename="live_cyclones_tracking"
            buttonLabel="Export Tracking Data"
          />

        </div>
      </div>

      {/* =========================
          CYCLONE SELECTOR
      ========================== */}

      <div className="flex flex-wrap items-center gap-2 font-mono">

        {loading && cyclones.length === 0 ? (
          <div className="text-xs text-slate-400">
            Loading cyclone systems...
          </div>
        ) : cyclones.length === 0 ? (
          <div className="text-xs text-red-400">
            No cyclone systems received from backend.
          </div>
        ) : (
          cyclones.map((cyclone) => (
            <button
              key={cyclone.id}
              onClick={() => handleSelectCyclone(cyclone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeCyclone.id === cyclone.id
                ? 'bg-blue-600 text-slate-100 border border-cyan-400'
                : 'bg-navy-900 text-slate-400 border border-blue-900/40 hover:text-slate-200'
                }`}
            >
              {cyclone.name || cyclone.code || cyclone.id}
            </button>
          ))
        )}

      </div>

      {/* LAST UPDATED */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">

        <span>
          {cyclones.length} cyclone system
          {cyclones.length !== 1 ? 's' : ''} loaded
        </span>

        <span>
          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString()}`
            : 'Waiting for data'}
        </span>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* MAP */}
        <div className="lg:col-span-3 min-w-0">

          <div className="w-full overflow-hidden rounded-xl">

            <CycloneMap
              cyclones={cyclones}
              selectedCyclone={activeCyclone}
              onSelectCyclone={handleSelectCyclone}
              height="620px"
            />

          </div>

        </div>

        {/* =========================
            CYCLONE DETAILS
        ========================== */}

        <div className="glass-panel p-3 sm:p-5 rounded-xl border border-blue-900/40 space-y-4 min-w-0">

          {/* HEADER */}

          <div className="border-b border-blue-900/30 pb-3">

            <div className="flex items-start justify-between gap-2">

              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 break-words">
                {activeCyclone.name || 'Cyclone'}
              </h3>

              {activeCyclone.status && (
                <div className="shrink-0">
                  <StatusBadge
                    status={activeCyclone.status}
                    label={activeCyclone.category || 'ACTIVE'}
                  />
                </div>
              )}

            </div>

            <p className="text-[11px] text-slate-400 font-mono mt-1 break-words">
              {activeCyclone.region || 'Unknown Region'}
              {' • '}
              {activeCyclone.code || activeCyclone.id || 'N/A'}
            </p>

          </div>

          {/* TELEMETRY */}

          <div className="space-y-3 text-xs">

            <div className="bg-navy-950/60 p-3 rounded-lg border border-blue-900/30 space-y-3 font-mono">

              {/* COORDINATES */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                <span className="text-slate-400">
                  Current Coords:
                </span>

                <span className="font-bold text-cyan-400 text-left sm:text-right break-words">
                  {formattedLocation}
                </span>

              </div>

              {/* WIND */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                <span className="text-slate-400">
                  Max Sustained Wind:
                </span>

                <span className="font-bold text-slate-100 text-left sm:text-right">

                  {windSpeed !== undefined
                    ? `${windSpeed} kt`
                    : 'N/A'}

                  {activeCyclone.windSpeedKmh
                    ? ` (${activeCyclone.windSpeedKmh} km/h)`
                    : ''}

                </span>

              </div>

              {/* PRESSURE */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                <span className="text-slate-400">
                  Central Pressure:
                </span>

                <span className="text-amber-400 font-bold">

                  {pressure !== undefined
                    ? `${pressure} hPa`
                    : 'N/A'}

                </span>

              </div>

              {/* MOVEMENT */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                <span className="text-slate-400">
                  Movement Heading:
                </span>

                <span className="text-slate-300 text-left sm:text-right">

                  {movementDirection}

                  {movementSpeed !== undefined
                    ? ` @ ${movementSpeed} km/h`
                    : ''}

                </span>

              </div>

              {/* PATTERN */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                <span className="text-slate-400">
                  Classified Pattern:
                </span>

                <span className="font-semibold text-cyan-300 text-left sm:text-right">
                  {activeCyclone.pattern || 'N/A'}
                </span>

              </div>

              {/* CONFIDENCE */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t border-blue-900/30 pt-2">

                <span className="text-slate-400">
                  Prediction Confidence:
                </span>

                <span className="font-bold text-emerald-400">

                  {activeCyclone.predictionConfidence !== undefined
                    ? `${activeCyclone.predictionConfidence}%`
                    : 'N/A'}

                </span>

              </div>

            </div>

            {/* DETAIL BUTTON */}

            <button
              onClick={() => setIsDetailOpen(true)}
              className="w-full py-2.5 px-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
            >

              <Eye className="w-4 h-4 shrink-0" />

              <span>
                Open Detailed Telemetry Panel
              </span>

            </button>

            {/* =========================
                FORECAST
            ========================== */}

            <h4 className="font-heading font-bold text-xs uppercase text-slate-300 font-mono pt-2">
              72-HOUR FORECAST TRAJECTORY
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">

              {activeCyclone.predictions?.length > 0 ? (

                activeCyclone.predictions.map((pred, idx) => (

                  <div
                    key={idx}
                    className="p-2.5 rounded bg-navy-950/40 border border-blue-900/20 space-y-1"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] font-mono">

                      <span className="text-cyan-400 font-bold">

                        +{pred.hour} Hours

                        {pred.forecastTime
                          ? ` (${pred.forecastTime.split('T')[0]})`
                          : ''}

                      </span>

                      <span className="text-slate-300 font-semibold">
                        {pred.category || 'Forecast'}
                      </span>

                    </div>

                    <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-mono">

                      <span>
                        Position:{' '}
                        {pred.latitude !== undefined
                          ? `${pred.latitude}°N`
                          : 'N/A'}
                        {', '}
                        {pred.longitude !== undefined
                          ? `${pred.longitude}°E`
                          : 'N/A'}
                      </span>

                      <span>
                        Wind:{' '}
                        <strong className="text-slate-200">
                          {pred.predictedWindSpeedKt ??
                            pred.windSpeedKt ??
                            'N/A'}{' '}
                          kt
                        </strong>
                      </span>

                    </div>

                  </div>

                ))

              ) : (

                <div className="text-[11px] text-slate-500 font-mono">
                  No forecast data available.
                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}