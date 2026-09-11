import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Layers, Bell, Clock, Database, CheckCircle2, Shield } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function SettingsPage() {
  const [autoRefresh, setAutoRefresh] = useState(() => localStorage.getItem('cfg_auto_refresh') || '30');
  const [defaultForecast, setDefaultForecast] = useState(() => localStorage.getItem('cfg_default_forecast') || '72');
  const [alertPref, setAlertPref] = useState(() => localStorage.getItem('cfg_alert_pref') || 'ALL');
  const [mapSatellite, setMapSatellite] = useState(() => localStorage.getItem('cfg_map_satellite') !== 'false');
  const [mapCones, setMapCones] = useState(() => localStorage.getItem('cfg_map_cones') !== 'false');
  const [demoMode, setDemoMode] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('cfg_auto_refresh', autoRefresh);
    localStorage.setItem('cfg_default_forecast', defaultForecast);
    localStorage.setItem('cfg_alert_pref', alertPref);
    localStorage.setItem('cfg_map_satellite', mapSatellite.toString());
    localStorage.setItem('cfg_map_cones', mapCones.toString());

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1200px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              System Settings & Preferences
            </h1>
            <StatusBadge status="ONLINE" label="CONFIGURATION ENGINE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Customize platform data refresh intervals, default map visualization layers, and decision alerts.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Preferences Saved to Local Storage!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Data Refresh & Telemetry */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-900/30 pb-2">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <h3 className="font-heading font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              1. DATA REFRESH & TELEMETRY TIMERS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Auto-Refresh Interval:</label>
              <select
                value={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.value)}
                className="w-full bg-navy-950 border border-blue-800/40 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="15">15 Seconds (High Frequency)</option>
                <option value="30">30 Seconds (Default Standard)</option>
                <option value="60">60 Seconds (Low Bandwidth)</option>
                <option value="0">Disabled (Manual Refresh Only)</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Controls map observation polling interval.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">Default Forecast Horizon:</label>
              <select
                value={defaultForecast}
                onChange={(e) => setDefaultForecast(e.target.value)}
                className="w-full bg-navy-950 border border-blue-800/40 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="24">24 Hours Ahead</option>
                <option value="48">48 Hours Ahead</option>
                <option value="72">72 Hours Ahead (Standard)</option>
                <option value="96">96 Hours Extended Track</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Default trajectory window loaded on dashboard maps.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Map & Layer Preferences */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-900/30 pb-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="font-heading font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              2. MAP & VISUALIZATION LAYER PREFERENCES
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-navy-950/60 border border-blue-900/30 hover:border-cyan-500/30">
              <input
                type="checkbox"
                checked={mapSatellite}
                onChange={(e) => setMapSatellite(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <div>
                <span className="text-slate-200 font-bold block">Enable Dark Satellite Vector Tiles</span>
                <span className="text-[10px] text-slate-400 font-normal">Renders Carto Dark GIS tile map layer by default.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-navy-950/60 border border-blue-900/30 hover:border-cyan-500/30">
              <input
                type="checkbox"
                checked={mapCones}
                onChange={(e) => setMapCones(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <div>
                <span className="text-slate-200 font-bold block">Show Forecast Uncertainty Cones</span>
                <span className="text-[10px] text-slate-400 font-normal">Displays 24h-72h forecast confidence error circles on maps.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Alert & Notification Preferences */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-900/60 space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-900/30 pb-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="font-heading font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              3. ALERT FILTERING & DECISION NOTIFICATIONS
            </h3>
          </div>

          <div className="font-mono text-xs space-y-2">
            <label className="text-slate-300 font-semibold block">Notification Sensitivity Level:</label>
            <select
              value={alertPref}
              onChange={(e) => setAlertPref(e.target.value)}
              className="w-full bg-navy-950 border border-blue-800/40 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">Show All System Alerts (Critical, High, Medium, Info)</option>
              <option value="CRITICAL_ONLY">Critical & High Intensity Alerts Only</option>
              <option value="MUTE">Mute Audio & Ping Banner Notifications</option>
            </select>
          </div>
        </div>

        {/* Section 4: Data Source Status & Demo Mode Indicator */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 bg-navy-950/80 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
            <span className="text-slate-300 font-bold uppercase">SYSTEM MODE & RESILIENCE STATUS</span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
              DEMO STREAM MODE
            </span>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            The platform is running under <strong>SIH Demonstration Mode</strong> with local synthetic satellite fallback streams enabled. Real-time satellite APIs are checked automatically upon load.
          </p>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
