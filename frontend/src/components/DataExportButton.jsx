import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileCode, Check } from 'lucide-react';

export default function DataExportButton({
  data = [],
  filename = 'cyclone_intelligence_export',
  buttonLabel = 'Export Data'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState(null);

  const exportAsJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${filename}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadedFormat('JSON');
    setTimeout(() => {
      setDownloadedFormat(null);
      setIsOpen(false);
    }, 2000);
  };

  const exportAsCSV = () => {
    if (!data || data.length === 0) return;

    // Flatten data objects for clean CSV formatting
    const flatData = data.map((item) => ({
      ID: item.id || '',
      Name: item.name || '',
      Code: item.code || '',
      Region: item.region || '',
      Status: item.status || '',
      Category: item.category || '',
      MaxWindKt: item.windSpeedKt || '',
      MaxWindKmh: item.windSpeedKmh || '',
      PressureHpa: item.pressureHpa || '',
      Latitude: item.currentLocation?.latitude || '',
      Longitude: item.currentLocation?.longitude || '',
      LocationFormatted: item.currentLocation?.formatted || '',
      Movement: item.movementDirection || '',
      Pattern: item.pattern || '',
      Confidence: item.predictionConfidence || '',
      FormationDate: item.formationDate || 'N/A'
    }));

    const headers = Object.keys(flatData[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of flatData) {
      const values = headers.map((header) => {
        const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvRows.join('\n')
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvString);
    downloadAnchor.setAttribute('download', `${filename}_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadedFormat('CSV');
    setTimeout(() => {
      setDownloadedFormat(null);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
        title="Export telemetry dataset as CSV or JSON"
      >
        <Download className="w-3.5 h-3.5 text-cyan-400" />
        <span>{buttonLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-navy-900 border border-cyan-500/30 rounded-xl shadow-2xl z-50 p-2 glass-panel animate-fade-in">
          <p className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
            CHOOSE EXPORT FORMAT
          </p>

          <button
            onClick={exportAsCSV}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-200 hover:bg-navy-800 hover:text-cyan-300 flex items-center justify-between transition-colors mb-1"
          >
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>CSV Spreadsheet</span>
            </div>
            {downloadedFormat === 'CSV' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={exportAsJSON}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-200 hover:bg-navy-800 hover:text-cyan-300 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>JSON Raw Stream</span>
            </div>
            {downloadedFormat === 'JSON' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      )}
    </div>
  );
}
