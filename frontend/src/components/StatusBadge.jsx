import React from 'react';

export default function StatusBadge({ status, label, className = '' }) {
  let badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/30";

  switch (status?.toUpperCase()) {
    case 'ONLINE':
    case 'LIVE':
    case 'COMPLETED':
      badgeStyle = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      break;
    case 'DEMO':
    case 'DEMO STREAM':
    case 'PROCESSING':
      badgeStyle = "bg-cyan-500/15 text-cyan-400 border-cyan-500/30 animate-pulse";
      break;
    case 'WARNING':
    case 'WATCH':
      badgeStyle = "bg-amber-500/15 text-amber-400 border-amber-500/30";
      break;
    case 'CRITICAL':
    case 'SEVERE':
      badgeStyle = "bg-rose-500/15 text-rose-400 border-rose-500/30";
      break;
    case 'OFFLINE':
    case 'CLOSED':
      badgeStyle = "bg-slate-500/15 text-slate-400 border-slate-500/30";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {label || status}
    </span>
  );
}
