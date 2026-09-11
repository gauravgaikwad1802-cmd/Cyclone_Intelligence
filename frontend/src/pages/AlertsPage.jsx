import React, { useState, useMemo } from 'react';
import { Bell, Filter, CheckCircle2, Trash2, Eye, ShieldAlert, AlertTriangle, Info, Radio } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { alerts as initialAlerts } from '../data/mockData';

export default function AlertsPage() {
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = useMemo(() => {
    return alertsList.filter((a) => {
      if (filterLevel === 'ALL') return true;
      if (filterLevel === 'CRITICAL') return a.severity === 'CRITICAL' || a.severity === 'WARNING';
      if (filterLevel === 'HIGH') return a.severity === 'HIGH';
      if (filterLevel === 'MEDIUM') return a.severity === 'MEDIUM' || a.severity === 'WATCH';
      if (filterLevel === 'INFO') return a.severity === 'INFO';
      return true;
    });
  }, [alertsList, filterLevel]);

  const markAsRead = (id) => {
    setAlertsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const markAllAsRead = () => {
    setAlertsList((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  const deleteAlert = (id) => {
    setAlertsList((prev) => prev.filter((a) => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
      case 'WARNING':
        return <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/40 text-[10px] font-bold">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40 text-[10px] font-bold">HIGH</span>;
      case 'MEDIUM':
      case 'WATCH':
        return <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-400 border border-yellow-500/40 text-[10px] font-bold">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40 text-[10px] font-bold">INFO</span>;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              Early Warning Alert Center
            </h1>
            <StatusBadge status="WARNING" label="DISASTER MANAGEMENT FEED" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time meteorological warnings, coastal watcher advisories, and AI anomaly alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={markAllAsRead}
            className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-900/60 p-3 rounded-xl border border-blue-900/40 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Filter Level:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterLevel === lvl
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="text-slate-400">
          Showing: <strong className="text-cyan-400">{filteredAlerts.length}</strong> alerts
        </div>
      </div>

      {/* Alerts Grid / List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-blue-900/40 rounded-xl bg-navy-950/40 font-mono text-slate-500">
            No active alerts found matching filter "{filterLevel}".
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all glass-panel font-sans flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                alert.acknowledged
                  ? 'bg-navy-950/60 border-blue-900/20 opacity-80'
                  : 'bg-navy-900/80 border-cyan-500/30 shadow-lg'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  {getSeverityBadge(alert.severity)}
                  <span className="font-heading font-extrabold text-slate-100 text-sm">{alert.title}</span>
                  <span className="text-[11px] text-slate-400">ID: {alert.id}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{alert.message}</p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                  <span>Cyclone: <strong className="text-cyan-300">{alert.cycloneName}</strong></span>
                  <span>Location: <strong className="text-slate-200">{alert.region}</strong></span>
                  <span>Timestamp: {new Date(alert.timestamp).toLocaleTimeString()}</span>
                  <span>Status: <strong className={alert.acknowledged ? 'text-emerald-400' : 'text-rose-400'}>{alert.acknowledged ? 'READ' : 'UNREAD'}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-850 border border-blue-800/40 text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Details</span>
                </button>

                {!alert.acknowledged && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mark Read</span>
                  </button>
                )}

                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 transition-colors"
                  title="Clear Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-navy-900 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl glass-panel space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-3">
              <div className="flex items-center gap-2 font-mono">
                {getSeverityBadge(selectedAlert.severity)}
                <h3 className="font-heading font-extrabold text-sm text-slate-100">{selectedAlert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-navy-950 border border-blue-900/30 space-y-1">
                <span className="text-[10px] text-slate-400 block">SYSTEM MESSAGE</span>
                <p className="text-slate-200 font-sans">{selectedAlert.message}</p>
              </div>

              {selectedAlert.recommendedAction && (
                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] text-amber-400 block font-bold">RECOMMENDED ACTION</span>
                  <p className="text-amber-200 font-sans">{selectedAlert.recommendedAction}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-blue-900/30">
                <div>Cyclone: <span className="text-cyan-300">{selectedAlert.cycloneName}</span></div>
                <div>Region: <span className="text-slate-200">{selectedAlert.region}</span></div>
                <div>Time: <span>{new Date(selectedAlert.timestamp).toLocaleString()}</span></div>
                <div>Alert ID: <span>{selectedAlert.id}</span></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs hover:bg-cyan-900"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
