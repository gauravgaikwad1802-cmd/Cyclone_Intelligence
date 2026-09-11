import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw, Database, Cpu, Satellite, CloudSun, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RealTimeDataStatus({
  isDemoMode = true,
  onRefresh = () => {}
}) {
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleTimeString());
      setIsRefreshing(false);
      onRefresh();
    }, 600);
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-900/40 bg-navy-900/60 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h4 className="font-heading font-bold uppercase text-slate-100 tracking-wider text-xs">
            DATA PIPELINE & SERVICE STATUS
          </h4>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 px-2 py-1 rounded bg-navy-800 hover:bg-navy-750 text-cyan-400 border border-blue-800/40 text-[11px] transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Sync Now</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-2.5 rounded-lg bg-navy-950/70 border border-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Satellite className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">SATELLITE DATA</span>
              <span className="text-slate-200 font-bold">INSAT-3D / GPM</span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
            DEMO
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-navy-950/70 border border-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudSun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">WEATHER DATA</span>
              <span className="text-slate-200 font-bold">IMD Radar Stream</span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
            DEMO
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-navy-950/70 border border-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">ML SERVICE</span>
              <span className="text-slate-200 font-bold">ViT-LSTM v2.8</span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
            CONNECTED
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-navy-950/70 border border-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">DATABASE</span>
              <span className="text-slate-200 font-bold">PostgreSQL / Redis</span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
            DEMO
          </span>
        </div>
      </div>

      {/* Sync Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-blue-900/20 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Last Synchronization: <strong className="text-cyan-300">{lastSync}</strong></span>
        </div>
        <span className="text-amber-400">SIH Resilience Mode Active</span>
      </div>
    </div>
  );
}
