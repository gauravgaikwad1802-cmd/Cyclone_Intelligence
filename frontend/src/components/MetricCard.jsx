import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up',
  glowColor = 'blue',
  demoBadge = true
}) {
  const glowClasses = {
    blue: 'metric-glow-blue border-blue-500/30 text-blue-400',
    cyan: 'metric-glow-cyan border-cyan-500/30 text-cyan-400',
    amber: 'metric-glow-amber border-amber-500/30 text-amber-400',
    red: 'metric-glow-red border-rose-500/30 text-rose-400',
  };

  return (
    <div className={`glass-panel glass-panel-hover p-4 border relative overflow-hidden ${glowClasses[glowColor] || glowClasses.blue}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl lg:text-3xl font-extrabold font-mono-num text-slate-100 tracking-tight">
              {value}
            </span>
            {trend && (
              <span className={`flex items-center text-xs font-medium ${trendDirection === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trendDirection === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-navy-900/80 border border-blue-800/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {demoBadge && (
        <div className="mt-3 pt-2 border-t border-blue-900/20 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>DEMO VALUE</span>
          <span className="text-cyan-400/70">AI VERIFIED</span>
        </div>
      )}
    </div>
  );
}
