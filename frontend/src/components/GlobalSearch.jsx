import React, { useState, useMemo } from 'react';
import { Search, X, Wind, Gauge, MapPin, Calendar, Compass, ArrowRight, Database, Download } from 'lucide-react';
import { cyclones as defaultCyclones } from '../data/mockData';
import StatusBadge from './StatusBadge';

export default function GlobalSearch({
  cyclones = defaultCyclones,
  onSelectCyclone = () => {},
  isOpen = false,
  onClose = () => {}
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredCyclones = useMemo(() => {
    return cyclones.filter((cyc) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        cyc.name.toLowerCase().includes(term) ||
        cyc.id.toLowerCase().includes(term) ||
        (cyc.code && cyc.code.toLowerCase().includes(term)) ||
        (cyc.formationDate && cyc.formationDate.includes(term)) ||
        (cyc.region && cyc.region.toLowerCase().includes(term)) ||
        (cyc.category && cyc.category.toLowerCase().includes(term)) ||
        (cyc.status && cyc.status.toLowerCase().includes(term));

      const matchesRegion = filterRegion === 'ALL' || cyc.region === filterRegion;
      const matchesStatus = filterStatus === 'ALL' || cyc.status === filterStatus;

      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [cyclones, searchTerm, filterRegion, filterStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-start justify-center pt-16 px-4 pb-6 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-4xl bg-navy-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-blue-900/40 flex items-center justify-between gap-3 bg-navy-950/60">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cyclone by name (e.g. Amphan), ID (e.g. BOB-01), year (2020), region, category..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-sans"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-slate-200 border border-blue-900/40 text-xs transition-colors"
          >
            Esc / Close
          </button>
        </div>

        {/* Filters bar */}
        <div className="px-4 py-2 bg-navy-950/40 border-b border-blue-900/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Region:</span>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="bg-navy-900 border border-blue-800/40 rounded px-2 py-1 text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Regions</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Arabian Sea">Arabian Sea</option>
            </select>

            <span className="text-slate-400 ml-2">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-navy-900 border border-blue-800/40 rounded px-2 py-1 text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="HISTORICAL">HISTORICAL</option>
            </select>
          </div>

          <div className="text-slate-400">
            Results Found: <strong className="text-cyan-400">{filteredCyclones.length}</strong>
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-3">
          {filteredCyclones.length === 0 ? (
            <div className="py-12 text-center space-y-3 border border-dashed border-blue-900/40 rounded-xl bg-navy-950/40">
              <Database className="w-10 h-10 text-slate-600 mx-auto animate-bounce" />
              <p className="text-sm font-semibold text-slate-300">No cyclones found</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No matching tropical cyclones found for query "{searchTerm}". Try searching by cyclone name ("Amphan"), basin ("Bay of Bengal"), or status ("ACTIVE").
              </p>
              <button
                onClick={() => { setSearchTerm(''); setFilterRegion('ALL'); setFilterStatus('ALL'); }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-900"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredCyclones.map((cyc) => (
              <div
                key={cyc.id}
                onClick={() => {
                  onSelectCyclone(cyc);
                  onClose();
                }}
                className="p-4 rounded-xl bg-navy-950/70 hover:bg-navy-800/60 border border-blue-900/30 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-slate-100 group-hover:text-cyan-300 text-base">
                        {cyc.name}
                      </span>
                      <StatusBadge status={cyc.status} label={cyc.category} />
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      ID: <span className="text-cyan-400">{cyc.id}</span> | Region: {cyc.region}
                    </p>
                  </div>

                  <button className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-xs font-mono flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:bg-cyan-500 group-hover:text-navy-950 transition-all">
                    <span>View Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-blue-900/20 text-xs font-mono">
                  <div className="bg-navy-900/60 p-2 rounded border border-blue-900/20">
                    <span className="text-slate-500 text-[10px] block">MAX WIND</span>
                    <span className="text-cyan-300 font-bold">{cyc.windSpeedKt} kt</span> ({cyc.windSpeedKmh} km/h)
                  </div>

                  <div className="bg-navy-900/60 p-2 rounded border border-blue-900/20">
                    <span className="text-slate-500 text-[10px] block">MIN PRESSURE</span>
                    <span className="text-amber-300 font-bold">{cyc.pressureHpa} hPa</span>
                  </div>

                  <div className="bg-navy-900/60 p-2 rounded border border-blue-900/20">
                    <span className="text-slate-500 text-[10px] block">CURRENT POSITION</span>
                    <span className="text-slate-300">{cyc.currentLocation?.formatted || 'N/A'}</span>
                  </div>

                  <div className="bg-navy-900/60 p-2 rounded border border-blue-900/20">
                    <span className="text-slate-500 text-[10px] block">TIMELINE / LANDFALL</span>
                    <span className="text-emerald-400">{cyc.formationDate ? `${cyc.formationDate}` : 'Active Monitoring'}</span>
                  </div>
                </div>

                {/* Track snippet */}
                {cyc.track && cyc.track.length > 0 && (
                  <div className="mt-2 text-[11px] text-slate-400 font-mono truncate">
                    <span className="text-slate-500">Recorded Track Points:</span> {cyc.track.length} observations | Last Known Stage: <strong className="text-slate-200">{cyc.track[cyc.track.length - 1]?.category}</strong>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-navy-950 border-t border-blue-900/40 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Tip: Click any cyclone result to view on map & open detail telemetry panel.</span>
          <span className="text-cyan-400 font-semibold">GLOBAL DATASET V2.4</span>
        </div>
      </div>
    </div>
  );
}
