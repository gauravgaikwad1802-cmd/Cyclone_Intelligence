import React from 'react';
import { CheckCircle2, ChevronRight, Cpu, Layers, Database, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function PipelineStep({
  stepNumber,
  title,
  subtitle,
  icon: Icon,
  status = "COMPLETED",
  isActive = false,
  onClick = () => {}
}) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
        isActive
          ? 'border-cyan-400 bg-blue-950/40 shadow-lg shadow-cyan-500/10'
          : 'border-blue-900/30 hover:border-blue-700/50 hover:bg-navy-900/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
            isActive
              ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-navy-950 shadow-md'
              : 'bg-navy-900 border border-blue-800/40 text-cyan-400'
          }`}
        >
          {Icon ? <Icon className="w-4 h-4" /> : `0${stepNumber}`}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-heading font-bold text-xs text-slate-100 truncate">
              {title}
            </h5>
            <StatusBadge status={status} label={status} className="text-[9px] px-1.5" />
          </div>
          {subtitle && (
            <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
              {subtitle}
            </p>
          )}
        </div>

        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
      </div>

      {/* Progress Bar Indicator */}
      <div className="mt-2.5 w-full h-1 bg-navy-950 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-cyan-400 animate-pulse'
          }`}
          style={{ width: status === 'COMPLETED' ? '100%' : '65%' }}
        ></div>
      </div>
    </div>
  );
}
