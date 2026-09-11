import React from 'react';

export default function ConfidenceGauge({
  score = 91.4,
  label = "Overall Prediction Confidence",
  subScores = [
    { label: "Detection Model (CNN/ViT)", value: 92.8 },
    { label: "Pattern Classifier (XGB/NeXt)", value: 87.3 },
    { label: "Temporal Model (LSTM/Trans)", value: 94.1 }
  ]
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "stroke-cyan-400";
  if (score >= 90) colorClass = "stroke-emerald-400";
  else if (score >= 80) colorClass = "stroke-cyan-400";
  else if (score >= 70) colorClass = "stroke-amber-400";
  else colorClass = "stroke-rose-400";

  return (
    <div className="glass-panel p-4 rounded-xl border border-blue-900/40">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3 text-center">
        {label}
      </h4>

      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-navy-900"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              className={`${colorClass} transition-all duration-1000 ease-out`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold font-mono-num text-slate-100">
              {score}%
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider font-mono">
              HIGH RELIABILITY
            </span>
          </div>
        </div>
      </div>

      {subScores && subScores.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-blue-900/30 pt-3">
          {subScores.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{item.label}</span>
                <span className="font-mono font-semibold text-slate-200">{item.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
