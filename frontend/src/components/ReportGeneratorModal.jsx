import React, { useRef } from 'react';
import { FileText, Printer, Download, X, Activity, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cyclones as defaultCyclones } from '../data/mockData';

export default function ReportGeneratorModal({
  cyclone = defaultCyclones[0],
  isOpen = false,
  onClose = () => {}
}) {
  const reportRef = useRef(null);

  if (!isOpen || !cyclone) return null;

  const handlePrint = () => {
    window.print();
  };

  const generatedTime = new Date().toUTCString();

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="w-full max-w-4xl bg-navy-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden glass-panel flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Header */}
        <div className="p-4 border-b border-blue-900/40 bg-navy-950 flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-extrabold text-base text-slate-100 uppercase tracking-wider font-mono">
              OFFICIAL CYCLONE BULLETIN & METEOROLOGICAL REPORT
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-slate-100 border border-blue-900/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div ref={reportRef} className="p-6 overflow-y-auto space-y-6 text-slate-200 font-sans print:p-0 print:text-black">
          {/* Document Letterhead */}
          <div className="border-b-2 border-cyan-500 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-xl lg:text-2xl text-slate-100 print:text-black">
                INDIAN OCEAN TROPICAL CYCLONE ADVISORY
              </h1>
              <p className="text-xs text-cyan-400 print:text-black font-mono mt-0.5">
                AI MULTI-SOURCE SATELLITE INTELLIGENCE PLATFORM (SIH-2026)
              </p>
            </div>

            <div className="text-right font-mono text-xs text-slate-400 print:text-black">
              <p className="font-bold text-slate-200 print:text-black">BULLETIN NO: {cyclone.id}-ADV-04</p>
              <p>Generated: {generatedTime}</p>
            </div>
          </div>

          {/* Section 1: Overview & Telemetry */}
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-sm uppercase font-mono text-cyan-400 print:text-black border-b border-blue-900/40 print:border-gray-300 pb-1">
              1. CYCLONE OVERVIEW & CURRENT TELEMETRY
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs bg-navy-950/70 print:bg-gray-100 p-4 rounded-xl border border-blue-900/30 print:border-gray-300">
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">NAME & ID</span>
                <span className="font-bold text-slate-100 print:text-black">{cyclone.name}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">CATEGORY</span>
                <span className="font-bold text-cyan-300 print:text-black">{cyclone.category}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">MAX SUSTAINED WIND</span>
                <span className="font-bold text-slate-100 print:text-black">{cyclone.windSpeedKt} kt ({cyclone.windSpeedKmh} km/h)</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">MIN PRESSURE</span>
                <span className="font-bold text-amber-300 print:text-black">{cyclone.pressureHpa} hPa</span>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Movement */}
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-sm uppercase font-mono text-cyan-400 print:text-black border-b border-blue-900/40 print:border-gray-300 pb-1">
              2. GEOGRAPHIC POSITION & MOVEMENT VECTOR
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs bg-navy-950/70 print:bg-gray-100 p-4 rounded-xl border border-blue-900/30 print:border-gray-300">
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">CURRENT COORDINATES</span>
                <span className="font-bold text-slate-100 print:text-black">{cyclone.currentLocation?.formatted || '15.40°N, 88.20°E'}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">BASIN / REGION</span>
                <span className="font-bold text-slate-100 print:text-black">{cyclone.region}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-gray-600 block text-[10px]">MOVEMENT DIRECTION</span>
                <span className="font-bold text-emerald-400 print:text-black">{cyclone.movementDirection} @ {cyclone.movementSpeedKmh} km/h</span>
              </div>
            </div>
          </div>

          {/* Section 3: Forecast Path */}
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-sm uppercase font-mono text-cyan-400 print:text-black border-b border-blue-900/40 print:border-gray-300 pb-1">
              3. ENSEMBLE INTENSITY & TRACK FORECAST (24h - 72h)
            </h2>
            <table className="w-full text-left font-mono text-xs border border-blue-900/30 print:border-gray-300">
              <thead className="bg-navy-950 print:bg-gray-200">
                <tr>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">WINDOW</th>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">LAT / LONG</th>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">WIND (KT)</th>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">PRESSURE</th>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">CATEGORY</th>
                  <th className="p-2 border-b border-blue-900/30 print:border-gray-300">CONFIDENCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30 print:divide-gray-300 bg-navy-950/40 print:bg-white">
                {cyclone.predictions?.map((p, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-bold text-cyan-300 print:text-black">+{p.hour}H</td>
                    <td className="p-2">{p.latitude?.toFixed(2)}°N, {p.longitude?.toFixed(2)}°E</td>
                    <td className="p-2">{p.predictedWindSpeedKt || p.windSpeedKt} kt</td>
                    <td className="p-2">{p.predictedPressureHpa || p.pressureHpa} hPa</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2 font-bold text-emerald-400 print:text-black">{p.confidence}%</td>
                  </tr>
                )) || (
                  <tr>
                    <td className="p-2 font-bold text-cyan-300 print:text-black">+24H</td>
                    <td className="p-2">17.10°N, 86.80°E</td>
                    <td className="p-2">90 kt</td>
                    <td className="p-2">960 hPa</td>
                    <td className="p-2">Very Severe Cyclonic Storm</td>
                    <td className="p-2 font-bold text-emerald-400 print:text-black">93.2%</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Section 4: Disaster Watch & Vulnerability */}
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-sm uppercase font-mono text-cyan-400 print:text-black border-b border-blue-900/40 print:border-gray-300 pb-1">
              4. COASTAL LANDFALL WATCH & DISASTER MANAGEMENT ADVISORY
            </h2>
            <div className="p-4 rounded-xl bg-navy-950/70 print:bg-gray-100 border border-blue-900/30 print:border-gray-300 text-xs font-mono space-y-2">
              <p>
                <strong className="text-rose-400 print:text-black">CRITICAL RISK ZONE:</strong> Coastal Odisha & West Bengal Maritime Zones (Kendrapara, Jagatsinghpur, Puri, Balasore, South 24 Parganas).
              </p>
              <p>
                <strong className="text-amber-400 print:text-black">RECOMMENDED ACTIONS:</strong> Suspend offshore fishing operations. Evacuate low-lying vulnerable populations in coastal sectors. Maintain 24-hour satellite observation frequency.
              </p>
            </div>
          </div>

          {/* Section 5: Data Sources & Sign-off */}
          <div className="pt-4 border-t border-blue-900/30 print:border-gray-300 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-400 print:text-black">
            <div>
              <span>SATELLITE SOURCES: INSAT-3D/3DR TIR-1, Himawari-9 RGB, GPM GMI 89GHz, Oceansat-3 OSCAT.</span>
            </div>
            <div>
              <span>VALIDATED BY: AI CYCLONE INTELLIGENCE SYSTEM (SIH-2026)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
