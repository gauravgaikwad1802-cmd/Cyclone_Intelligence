import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Radio,
  Layers,
  BrainCircuit,
  Navigation,
  Satellite,
  Bell,
  Database,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertTriangle,
  FileText,
  Info
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import CycloneMap from '../components/CycloneMap';
import TimeSeriesChart from '../components/TimeSeriesChart';
import SatelliteViewer from '../components/SatelliteViewer';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import RealTimeDataStatus from '../components/RealTimeDataStatus';
import DistrictVulnerabilityView from '../components/DistrictVulnerabilityView';
import CycloneDetailPanel from '../components/CycloneDetailPanel';
import DataExportButton from '../components/DataExportButton';
import ReportGeneratorModal from '../components/ReportGeneratorModal';
import { apiClient } from '../services/apiClient';

export default function DashboardPage() {
  const [cyclones, setCyclones] = useState([]);
  const [selectedCyclone, setSelectedCyclone] = useState(null);
  const [sources, setSources] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cRes = await apiClient.getCyclones();
      const sRes = await apiClient.getSatelliteSources();
      const aRes = await apiClient.getAlerts();

      setCyclones(cRes.data || []);
      setSelectedCyclone(cRes.data?.[0] || null);
      setSources(sRes.data || []);
      setAlerts(aRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const activeCyclone = selectedCyclone || cyclones[0] || {};

  const handleCycloneClick = (cyc) => {
    setSelectedCyclone(cyc);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* Cyclone Slide-over Telemetry Detail Panel */}
      <CycloneDetailPanel
        cyclone={activeCyclone}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Structured Cyclone Report Modal */}
      <ReportGeneratorModal
        cyclone={activeCyclone}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Dashboard Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Tropical Cyclone Intelligence Dashboard
            </h1>
            <StatusBadge status="DEMO STREAM" label="DEMO DATA MODE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            AI-driven monitoring and prediction using multi-source satellite observations across the North Indian Ocean.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DataExportButton data={cyclones} filename="active_cyclones_summary" buttonLabel="Export Data" />

          <button
            onClick={() => setIsReportOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Real-time Data Status Banner */}
      <RealTimeDataStatus />

      {/* ROW 1: 6 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="ACTIVE SYSTEMS"
          value="03"
          subtitle="North Indian Ocean"
          icon={Navigation}
          glowColor="cyan"
        />
        <MetricCard
          title="MONITORED TOTAL"
          value="12"
          subtitle="Seasonal Archive"
          icon={Activity}
          glowColor="blue"
        />
        <MetricCard
          title="DETECTED PATTERNS"
          value="08"
          subtitle="Rapid & Mature"
          icon={Layers}
          glowColor="amber"
        />
        <MetricCard
          title="PREDICTION CONFIDENCE"
          value="91.4%"
          subtitle="Ensemble ViT-LSTM"
          icon={BrainCircuit}
          glowColor="cyan"
          trend="+2.1%"
          trendDirection="up"
        />
        <MetricCard
          title="ALERT STATUS"
          value="WARNING"
          subtitle="Bay of Bengal SCS"
          icon={AlertTriangle}
          glowColor="red"
        />
        <MetricCard
          title="DATA SOURCES"
          value="06"
          subtitle="Satellite Streams"
          icon={Satellite}
          glowColor="blue"
        />
      </div>

      {/* ROW 2: Main Cyclone Map + Active Cyclones List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              LIVE SATELLITE TRACKING MAP (ADVANCED CONTROLS)
            </h3>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Selected:</span>
              <strong className="text-cyan-400">{activeCyclone.name || 'CYCLONE DEMO-01'}</strong>
              <button
                onClick={() => setIsDetailOpen(true)}
                className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[11px] hover:bg-cyan-900"
              >
                Inspect Telemetry
              </button>
            </div>
          </div>
          <CycloneMap
            cyclones={cyclones}
            selectedCyclone={activeCyclone}
            onSelectCyclone={handleCycloneClick}
            height="480px"
          />
        </div>

        {/* Active Cyclones Quick Selector Panel */}
        <div className="glass-panel p-4 rounded-xl border border-blue-900/40 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
              <h4 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400">
                ACTIVE CYCLONE SYSTEMS
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono border border-blue-800/40">
                {cyclones.length} SYSTEMS
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[350px] pr-1">
              {cyclones.map((cyc) => {
                const isSelected = activeCyclone?.id === cyc.id;
                return (
                  <div
                    key={cyc.id}
                    onClick={() => handleCycloneClick(cyc)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/25 border-cyan-400 shadow-md'
                        : 'bg-navy-950/60 border-blue-900/30 hover:border-blue-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-bold text-xs text-slate-100">{cyc.name}</span>
                      <StatusBadge status={cyc.status} label={cyc.intensityCode} />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">{cyc.region}</p>
                    <div className="flex items-center justify-between mt-2 text-[11px] font-mono border-t border-blue-900/20 pt-1.5">
                      <span className="text-slate-400">Wind: <strong className="text-cyan-300">{cyc.windSpeedKt} kt</strong></span>
                      <span className="text-slate-400">Confidence: <strong className="text-emerald-400">{cyc.predictionConfidence}%</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            to="/tracking"
            className="w-full mt-3 py-2 rounded-lg bg-navy-900 hover:bg-navy-850 border border-blue-800/40 text-cyan-400 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>FULLSCREEN TRACKING MAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Coastal District Vulnerability Matrix */}
      <DistrictVulnerabilityView />

      {/* ROW 3: Temporal Trends & Satellite Image Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart
          data={activeCyclone?.timeSeries || []}
          title={`Temporal Intensity Trend — ${activeCyclone.name || 'CYCLONE DEMO-01'}`}
        />
        <SatelliteViewer sources={sources} />
      </div>

      {/* ROW 4: Recent System Alerts Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            RECENT SYSTEM ALERTS & DECISION SUPPORT
          </h3>
          <Link to="/alerts" className="text-xs font-mono text-cyan-400 hover:underline">
            View Alert Center ({alerts.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.slice(0, 2).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* ROW 5: Bottom Final Dashboard Message */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 via-navy-900 to-blue-950/60 border border-blue-800/40 text-center font-mono text-xs text-slate-300">
        "AI-assisted satellite intelligence for faster tropical cyclone analysis and decision support."
      </div>
    </div>
  );
}
