import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Shield, Activity, Award } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import ForecastAccuracyModule from '../components/ForecastAccuracyModule';
import DataExportButton from '../components/DataExportButton';
import { apiClient } from '../services/apiClient';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await apiClient.getAnalytics();
      setAnalytics(res.data || null);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              System Analytics & Model Performance
            </h1>
            <StatusBadge status="ONLINE" label="ACCURACY VERIFIED" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Statistical distribution of tropical cyclones & model trajectory error metrics.
          </p>
        </div>

        <div>
          {analytics && <DataExportButton data={analytics} filename="system_analytics_metrics" buttonLabel="Export Metrics" />}
        </div>
      </div>

      {/* Model Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="DETECTION ACCURACY"
          value="94.2%"
          subtitle="Vision Transformer Benchmark"
          icon={Award}
          glowColor="emerald"
        />
        <MetricCard
          title="24H TRAJECTORY MAE"
          value="32.4 km"
          subtitle="Position Mean Error"
          icon={Activity}
          glowColor="cyan"
        />
        <MetricCard
          title="48H TRAJECTORY MAE"
          value="68.1 km"
          subtitle="Position Mean Error"
          icon={TrendingUp}
          glowColor="blue"
        />
        <MetricCard
          title="CLASSIFICATION F1"
          value="0.91"
          subtitle="Pattern Classifier Score"
          icon={Shield}
          glowColor="cyan"
        />
      </div>

      {/* Feature #7: Forecast Accuracy Verification Module */}
      <ForecastAccuracyModule />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400">
            REGIONAL BASIN DISTRIBUTION (2010 – 2026)
          </h3>

          <div className="space-y-4 pt-2">
            {analytics?.regionalDistribution?.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200">{item.region}</span>
                  <span className="text-cyan-400 font-bold">{item.count} Storms ({item.percentage})</span>
                </div>
                <div className="w-full h-3 bg-navy-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intensity Category Breakdown */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400">
            INTENSITY CATEGORY BREAKDOWN
          </h3>

          <div className="space-y-3 pt-2">
            {analytics?.intensityDistribution?.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded bg-navy-950/60 border border-blue-900/20 text-xs font-mono">
                <span className="text-slate-300 font-semibold">{cat.category}</span>
                <span className="text-amber-400 font-bold text-sm">{cat.count} Systems</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
