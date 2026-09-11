import React, { useState } from 'react';
import { Info, Shield, Award, Settings, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function AboutPage() {
  const [region, setRegion] = useState('Bay of Bengal');
  const [windowSize, setWindowSize] = useState('72 Hours');

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-slate-100">
              About System & Scientific Principles
            </h1>
            <StatusBadge status="ONLINE" label="SIH-2026 PROTOTYPE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            AI-assisted satellite intelligence decision-support platform for Smart India Hackathon.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About System Details */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-blue-900/40 space-y-4 text-xs text-slate-300 leading-relaxed">
          <h3 className="font-heading font-bold text-sm text-cyan-400 uppercase font-mono">
            SCIENTIFIC CREDIBILITY & INTENT
          </h3>

          <p>
            The <strong>Multi-Source Satellite-Based Tropical Cyclone Intelligence System</strong> is an AI-assisted decision-support prototype developed for Smart India Hackathon (SIH 2026).
          </p>

          <p>
            The system combines multi-spectral geostationary satellite channels (INSAT-3D, Himawari-9), polar microwave rain rate swaths (GPM), and scatterometer ocean surface wind vectors to assist meteorologists and disaster management authorities in rapid pattern identification and trajectory estimation.
          </p>

          <div className="p-4 rounded-lg bg-navy-950/80 border border-amber-500/30 space-y-2 font-mono text-[11px] text-amber-300">
            <span className="font-bold text-amber-400">IMPORTANT SCIENTIFIC DISCLAIMER:</span>
            <p>
              This application is a technology demonstration and decision-support tool. It does not replace official warnings issued by national meteorological organizations (such as the India Meteorological Department). Predictions are presented with confidence metrics rather than deterministic guarantees.
            </p>
          </div>
        </div>

        {/* System Settings Panel */}
        <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-4 font-mono text-xs">
          <h3 className="font-heading font-bold text-xs uppercase text-cyan-400 border-b border-blue-900/30 pb-2">
            SYSTEM SETTINGS
          </h3>

          <div>
            <label className="text-slate-400 block mb-1">DEFAULT REGION OF INTEREST</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 rounded bg-navy-950 border border-blue-900/40 text-slate-200"
            >
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Arabian Sea">Arabian Sea</option>
              <option value="Indian Ocean">Indian Ocean</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">DEFAULT PREDICTION HORIZON</label>
            <select
              value={windowSize}
              onChange={(e) => setWindowSize(e.target.value)}
              className="w-full p-2 rounded bg-navy-950 border border-blue-900/40 text-slate-200"
            >
              <option value="24 Hours">24 Hours</option>
              <option value="48 Hours">48 Hours</option>
              <option value="72 Hours">72 Hours</option>
            </select>
          </div>

          <div className="pt-2 border-t border-blue-900/20 text-[10px] text-slate-400 space-y-1">
            <p>System Theme: <span className="text-cyan-400">Scientific Dark Navy</span></p>
            <p>Scan Interval: <span className="text-emerald-400">15 Minutes</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
