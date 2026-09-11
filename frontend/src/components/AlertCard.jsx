import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, Info, Bell, CheckCircle2, Send } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function AlertCard({ alert, onAcknowledge = () => {} }) {
  const [dispatchStatus, setDispatchStatus] = useState(null);

  const handleSimulateDispatch = () => {
    setDispatchStatus('SENDING');
    setTimeout(() => {
      setDispatchStatus('DISPATCHED');
    }, 1200);
  };

  return (
    <div className={`glass-panel p-4 rounded-xl border transition-all ${
      alert.severity === 'CRITICAL' || alert.severity === 'WARNING'
        ? 'border-rose-500/40 bg-rose-950/10'
        : 'border-blue-900/30'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            alert.severity === 'CRITICAL' || alert.severity === 'WARNING'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : alert.severity === 'WATCH'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {alert.severity === 'CRITICAL' ? <AlertOctagon className="w-5 h-5 animate-pulse" /> : <AlertTriangle className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-bold text-sm text-slate-100">{alert.title}</h4>
              <StatusBadge status={alert.severity} label={alert.severity} />
            </div>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.message}</p>

            {alert.recommendedAction && (
              <div className="mt-2.5 p-2 rounded bg-navy-950/60 border border-blue-900/30 text-[11px] text-amber-300 font-mono">
                <span className="font-semibold text-amber-400">RECOMMENDED ACTION:</span> {alert.recommendedAction}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-slate-400 font-mono">
              <span>Cyclone: <strong className="text-slate-200">{alert.cycloneName}</strong></span>
              <span>Region: <strong className="text-slate-200">{alert.region}</strong></span>
              <span>Time: <strong>{new Date(alert.timestamp).toLocaleTimeString()}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onAcknowledge(alert.id)}
            disabled={alert.acknowledged}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              alert.acknowledged
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-blue-600 hover:bg-blue-500 text-slate-100 shadow-md shadow-blue-500/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
          </button>

          {/* Test SMS/Email Notification Simulator */}
          <button
            onClick={handleSimulateDispatch}
            disabled={dispatchStatus === 'DISPATCHED'}
            className="px-2.5 py-1 rounded bg-navy-900 hover:bg-navy-850 border border-blue-800/40 text-[11px] text-cyan-400 flex items-center gap-1 transition-colors"
            title="Dispatch simulated SMS/Email alert to disaster authority"
          >
            <Send className="w-3 h-3" />
            {dispatchStatus === 'SENDING' ? 'Dispatching...' : dispatchStatus === 'DISPATCHED' ? 'SMS/Email Dispatched' : 'Simulate Dispatch'}
          </button>
        </div>
      </div>
    </div>
  );
}
