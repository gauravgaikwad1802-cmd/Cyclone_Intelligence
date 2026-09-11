import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Bell,
  PlayCircle,
  User,
  Radio,
  RefreshCw,
  Search,
  FileText,
  Menu
} from 'lucide-react';

import StatusBadge from './StatusBadge';
import GlobalSearch from './GlobalSearch';
import ReportGeneratorModal from './ReportGeneratorModal';
import { cyclones } from '../data/mockData';

export default function Navbar({
  onOpenPresentationMode,
  onOpenMobileMenu
}) {
  const [timeStr, setTimeStr] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedCycloneForReport, setSelectedCycloneForReport] =
    useState(cyclones[0]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('cyclone_user') || 'null'
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSearchCyclone = () => {
    navigate('/tracking');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-950/90 backdrop-blur-md border-b border-blue-900/30 px-2 sm:px-4 lg:px-6 py-2 sm:py-3 overflow-hidden">

      {/* Global Search */}
      <GlobalSearch
        cyclones={cyclones}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCyclone={handleSelectSearchCyclone}
      />

      {/* Report Generator */}
      <ReportGeneratorModal
        cyclone={selectedCycloneForReport}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">

        {/* =====================================
            MOBILE MENU BUTTON
        ====================================== */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden shrink-0 p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-cyan-400 hover:bg-navy-800 transition-colors"
          aria-label="Open navigation menu"
          title="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>


        {/* =====================================
            BRANDING
        ====================================== */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
          >

            {/* Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">

              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-navy-950 font-bold" />

            </div>


            {/* Brand */}
            <div className="min-w-0">

              <div className="flex items-center gap-1 sm:gap-2">

                <span className="font-heading font-extrabold text-xs sm:text-lg tracking-wider text-slate-100 whitespace-nowrap">
                  CYCLONE<span className="text-cyan-400">INTELLIGENCE</span>
                </span>

                <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-500/30">
                  SIH-2026
                </span>

              </div>

              <p className="text-[11px] text-slate-400 font-medium leading-none hidden sm:block">
                Multi-Source Satellite Tropical Cyclone Platform
              </p>

            </div>

          </Link>

        </div>


        {/* =====================================
            DESKTOP SEARCH
        ====================================== */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-xs">

          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-navy-900/90 hover:bg-navy-850 border border-blue-800/40 hover:border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs text-slate-400 flex items-center justify-between transition-all group shadow-inner font-mono"
          >

            <div className="flex items-center gap-2">

              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />

              <span>
                Search cyclone (Amphan, BOB-01)...
              </span>

            </div>

            <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-navy-950 text-[10px] text-slate-500 border border-blue-900/40 font-mono">
              ⌘K
            </kbd>

          </button>

        </div>


        {/* =====================================
            SYSTEM STATUS
        ====================================== */}
        <div className="hidden xl:flex items-center gap-4 bg-navy-900/60 px-4 py-1.5 rounded-full border border-blue-800/20 text-xs">

          <div className="flex items-center gap-2">

            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />

            <span className="text-slate-300 font-mono">
              AI SYSTEM:
            </span>

            <StatusBadge
              status="ONLINE"
              label="ONLINE"
            />

          </div>

          <div className="h-3 w-px bg-blue-800/40"></div>

          <div className="flex items-center gap-2">

            <span className="text-slate-300 font-mono">
              DATA MODE:
            </span>

            <StatusBadge
              status="DEMO STREAM"
              label="DEMO STREAM"
            />

          </div>

          <div className="h-3 w-px bg-blue-800/40"></div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">

            <RefreshCw className="w-3 h-3 text-cyan-400" />

            <span>
              {timeStr || 'UTC TIME...'}
            </span>

          </div>

        </div>


        {/* =====================================
            RIGHT ACTIONS
        ====================================== */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-slate-300 hover:text-cyan-400 transition-colors"
            title="Open Global Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>


          {/* Report */}
          <button
            onClick={() => setIsReportOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-cyan-500/30 text-cyan-300 font-mono text-xs transition-colors"
            title="Generate Meteorological Report PDF"
          >

            <FileText className="w-4 h-4 text-cyan-400" />

            <span>
              Report
            </span>

          </button>


          {/* Presentation Mode */}
          <button
            onClick={onOpenPresentationMode}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-navy-950 font-semibold text-[10px] sm:text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95"
            title="Start 3-Minute SIH Judge Presentation Mode"
          >

            <PlayCircle className="w-4 h-4 fill-navy-950 shrink-0" />

            <span className="hidden sm:inline">
              Presentation Mode
            </span>

          </button>


          {/* Notifications */}
          <Link
            to="/alerts"
            className="hidden sm:block relative p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="View Active System Alerts"
          >

            <Bell className="w-4 h-4" />

            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>

            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>

          </Link>


          {/* User */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-blue-900/30">

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-navy-800 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-semibold text-xs">

              <User className="w-4 h-4" />

            </div>

            <div className="hidden lg:block text-left">

              <p className="text-xs font-semibold text-slate-200 leading-tight">
                {user?.name || 'Dr. A. Sharma'}
              </p>

              <p className="text-[10px] text-slate-400 font-mono">
                {user?.role
                  ? 'SIH Judge / Scientist'
                  : 'SIH Demo Access'}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}