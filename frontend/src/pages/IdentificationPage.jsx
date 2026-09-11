import React, { useState } from 'react';
import { ScanEye, Play, CheckCircle2, RefreshCw, Cpu, Layers, Image as ImageIcon, MapPin } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import AIExplainabilityPanel from '../components/AIExplainabilityPanel';
import DataExportButton from '../components/DataExportButton';
import { apiClient } from '../services/apiClient';

export default function IdentificationPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState({
    cycloneDetected: true,
    detectionConfidence: 92.8,
    region: "Bay of Bengal",
    centerCoordinates: { latitude: 15.40, longitude: 88.20 }
  });

  const processingSteps = [
    "Receiving satellite imagery stream (INSAT-3D TIR-1)...",
    "Applying cloud noise handling & spatial resolution scaling (512x512)...",
    "Extracting deep convective feature embeddings...",
    "Running Vision Transformer (ViT-B/16) eye detection model...",
    "Estimating central coordinates & confidence bounding box...",
    "Analysis Completed — Cyclone Detected"
  ];

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setResult(null);
    setCurrentStepIndex(0);

    for (let i = 0; i < processingSteps.length - 1; i++) {
      await new Promise(r => setTimeout(r, 600));
      setCurrentStepIndex(i + 1);
    }

    const res = await apiClient.runDetection({ image_id: "DEMO_INSAT_3D_01", region: "Bay of Bengal" });
    setResult(res.result);
    setAnalyzing(false);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-tight">
              AI Cyclone Identification Engine
            </h1>
            <StatusBadge status="ONLINE" label="ViT-B/16 ACTIVE" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Vision Transformer (ViT) model for automated cyclone eye extraction & spatial bounding box identification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {result && <DataExportButton data={[result]} filename="cyclone_identification_result" buttonLabel="Export Detection" />}

          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-navy-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50 transition-all font-mono"
          >
            {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-navy-950" />}
            <span>{analyzing ? 'PROCESSING IMAGE...' : 'ANALYZE SATELLITE IMAGE'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Satellite Image with Bounding Overlay */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-blue-900/40 relative min-h-[420px] flex items-center justify-center font-sans">
          <div
            className="w-full h-full min-h-[400px] rounded-lg bg-cover bg-center relative border border-blue-900/30 overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80')`
            }}
          >
            {/* Visual AI Bounding Box Overlay */}
            {(result || analyzing) && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-cyan-400 rounded-2xl flex items-center justify-center bg-cyan-500/10 backdrop-blur-[2px] animate-pulse">
                <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white"></div>
                <div className="absolute top-2 left-2 bg-navy-950/90 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/40">
                  CYCLONE EYE (15.40°N, 88.20°E)
                </div>
                <div className="absolute bottom-2 right-2 bg-emerald-950/90 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/40">
                  CONFIDENCE: {result?.detectionConfidence || '92.8'}%
                </div>
              </div>
            )}

            <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-slate-300 border border-blue-900/40">
              CHANNEL: INSAT-3D TIR-1 (10.8 µm)
            </div>
          </div>
        </div>

        {/* Right: Processing Status & Detection Readout */}
        <div className="space-y-4 font-sans">
          <div className="glass-panel p-5 rounded-xl border border-blue-900/40 space-y-4">
            <h3 className="font-heading font-bold text-xs uppercase font-mono text-cyan-400 border-b border-blue-900/30 pb-2">
              AI INFERENCE STATUS & PIPELINE
            </h3>

            {/* Step-by-Step Processing Timeline */}
            <div className="space-y-2">
              {processingSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 text-xs p-2 rounded transition-all font-mono ${
                    idx === currentStepIndex && analyzing
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40'
                      : idx <= currentStepIndex
                      ? 'text-slate-200'
                      : 'text-slate-600'
                  }`}
                >
                  {idx <= currentStepIndex ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className="truncate">{step}</span>
                </div>
              ))}
            </div>

            {/* Results Readout */}
            {result && (
              <div className="bg-navy-950/80 p-4 rounded-xl border border-cyan-500/40 space-y-3 pt-3 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Detection Status:</span>
                  <StatusBadge status="COMPLETED" label="CYCLONE DETECTED" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Detection Confidence:</span>
                  <span className="font-extrabold text-xl text-emerald-400">{result.detectionConfidence}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Detected Region:</span>
                  <span className="text-slate-200">{result.region}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Eye Center:</span>
                  <span className="text-cyan-300 font-bold">15.40°N, 88.20°E</span>
                </div>

                <div className="flex items-center justify-between border-t border-blue-900/30 pt-2 text-[11px]">
                  <span className="text-slate-400">Model Architecture:</span>
                  <span className="text-slate-300">ViT-B/16 + ResNet50</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature #8: AI Explainability Panel */}
      <AIExplainabilityPanel
        predictionName="Cyclone Eye Center Identified"
        confidence={result?.detectionConfidence || 92.8}
        modelVersion="Vision Transformer ViT-B/16 Eye Detector"
      />
    </div>
  );
}
