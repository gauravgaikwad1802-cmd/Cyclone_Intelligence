import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Shield, Calendar, BarChart2, GitCompare } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import CycloneComparison from '../components/CycloneComparison';
import HistoricalStormTimeline from '../components/HistoricalStormTimeline';
import DataExportButton from '../components/DataExportButton';
import { apiClient } from '../services/apiClient';
import { cyclones as mockCyclones } from '../data/mockData';

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState([]);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [selectedStorm, setSelectedStorm] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await apiClient.getCyclones();
      const hist = (res.data || mockCyclones).filter(c => c.status === 'HISTORICAL' || c.isSynthetic === false);
      setHistoryList(hist.length > 0 ? hist : mockCyclones);
      if (hist.length > 0) setSelectedStorm(hist[0]);
      else setSelectedStorm(mockCyclones[2] || mockCyclones[0]);
    };
    fetchHistory();
  }, []);

  const filtered = historyList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.code.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === 'ALL' || item.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Historical Cyclone Archive & Benchmark Analysis
            </h1>
            <StatusBadge status="COMPLETED" label="BENCHMARK ARCHIVE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Searchable historical satellite dataset (Super Cyclone Amphan, Biparjoy, Tauktae, Fani).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DataExportButton data={filtered} filename="historical_cyclone_archive" buttonLabel="Export Historical Data" />

          {/* Search & Filter Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cyclone by name/code..."
              className="pl-9 pr-4 py-1.5 rounded-lg bg-navy-950/80 border border-blue-900/40 text-slate-100 text-xs font-mono focus:border-cyan-400 focus:outline-none w-64"
            />
          </div>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-navy-950/80 border border-blue-900/40 text-slate-100 text-xs font-mono focus:border-cyan-400 focus:outline-none"
          >
            <option value="ALL">All Regions</option>
            <option value="Bay of Bengal">Bay of Bengal</option>
            <option value="Arabian Sea">Arabian Sea</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table View */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-blue-900/40 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400">
            HISTORICAL CYCLONE DATABASE ({filtered.length} RECORDS)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-blue-900/40 text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Cyclone Name</th>
                  <th className="py-2.5 px-3">Basin / Region</th>
                  <th className="py-2.5 px-3">Peak Category</th>
                  <th className="py-2.5 px-3">Max Wind</th>
                  <th className="py-2.5 px-3">Min Pressure</th>
                  <th className="py-2.5 px-3 text-right">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/20 text-slate-200">
                {filtered.map((storm) => (
                  <tr
                    key={storm.id}
                    onClick={() => setSelectedStorm(storm)}
                    className={`cursor-pointer transition-colors ${
                      selectedStorm?.id === storm.id ? 'bg-blue-600/20 text-cyan-300 font-semibold' : 'hover:bg-navy-900/40'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-heading font-bold">{storm.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{storm.region}</td>
                    <td className="py-2.5 px-3"><StatusBadge status="WARNING" label={storm.category} /></td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">{storm.windSpeedKt} kt</td>
                    <td className="py-2.5 px-3 text-amber-400">{storm.pressureHpa} hPa</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{storm.predictionConfidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Storm Detail Inspector */}
        {selectedStorm && (
          <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-4">
            <div className="border-b border-blue-900/30 pb-3">
              <h3 className="font-heading font-extrabold text-lg text-slate-100">{selectedStorm.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{selectedStorm.region} • {selectedStorm.code}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-navy-950/60 p-3 rounded-lg border border-blue-900/30 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Peak Category:</span>
                  <span className="font-bold text-rose-400">{selectedStorm.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Wind Speed:</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedStorm.windSpeedKt} kt ({selectedStorm.windSpeedKmh} km/h)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Min Central Pressure:</span>
                  <span className="font-mono font-bold text-amber-400">{selectedStorm.pressureHpa} hPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Landfall Location:</span>
                  <span className="font-mono text-slate-200">{selectedStorm.currentLocation?.formatted}</span>
                </div>
              </div>

              <h4 className="font-heading font-bold text-xs uppercase text-slate-300 font-mono">
                HISTORICAL INTENSITY TRAJECTORY
              </h4>

              <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                {selectedStorm.timeSeries?.map((pt, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-navy-950/40 text-[11px] font-mono">
                    <span className="text-slate-400">{pt.time}</span>
                    <span className="text-cyan-400 font-bold">{pt.windSpeed} kt</span>
                    <span className="text-amber-400">{pt.pressure} hPa</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature #9: Interactive Historical Storm Lifecycle Timeline */}
      <HistoricalStormTimeline cyclone={selectedStorm} />

      {/* Feature #6: Side-by-Side Dual Cyclone Comparison Engine */}
      <CycloneComparison cyclones={mockCyclones} />
    </div>
  );
}
