import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Navigation,
  Satellite,
  ScanEye,
  Layers,
  TrendingUp,
  BrainCircuit,
  History,
  BarChart3,
  Bell,
  Database,
  Cpu,
  Info,
  Settings,
  Activity,
  Home,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({
  isMobileOpen = false,
  onCloseMobile = () => {}
}) {
  const navItems = [
    { path: '/', label: 'Landing Overview', icon: Home },
    { path: '/dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    { path: '/tracking', label: 'Live Tracking Map', icon: Navigation },
    { path: '/satellite', label: 'Satellite Imagery', icon: Satellite },
    { path: '/identification', label: 'AI Identification', icon: ScanEye },
    { path: '/classification', label: 'Pattern Classification', icon: Layers },
    { path: '/temporal', label: 'Temporal Analysis', icon: TrendingUp },
    { path: '/prediction', label: 'Prediction Engine', icon: BrainCircuit },
    { path: '/history', label: 'Historical Archive', icon: History },
    { path: '/analytics', label: 'System Analytics', icon: BarChart3 },
    { path: '/alerts', label: 'Alert Center', icon: Bell },
    { path: '/activity', label: 'System Activity Log', icon: Activity },
    { path: '/settings', label: 'System Settings', icon: Settings },
    { path: '/data-sources', label: 'Data Sources', icon: Database },
    { path: '/models', label: 'Model Info & Pipeline', icon: Cpu },
    { path: '/about', label: 'About System', icon: Info }
  ];

  const handleNavigation = () => {
    onCloseMobile();
  };

  return (
    <>
      {/* ==========================================
          MOBILE BACKDROP
      ========================================== */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}
      <aside
        className={`
          fixed md:sticky
          top-0 md:top-[61px]
          left-0
          z-[60]
          md:z-30

          h-screen md:h-[calc(100vh-61px)]

          w-72
          bg-navy-950
          border-r border-blue-900/30

          flex flex-col
          shrink-0

          transition-transform duration-300 ease-in-out

          ${
            isMobileOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          md:translate-x-0
          md:w-64
        `}
      >

        {/* ==========================================
            MOBILE HEADER
        ========================================== */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-blue-900/20">

          <div>
            <p className="text-[10px] uppercase tracking-wider font-mono text-cyan-400 font-semibold">
              NAVIGATION MENU
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Cyclone Intelligence
            </p>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-2 rounded-lg bg-navy-900 border border-blue-900/40 text-slate-300 hover:text-cyan-400"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>

        </div>


        {/* ==========================================
            DESKTOP HEADER
        ========================================== */}
        <div className="hidden md:block p-4 border-b border-blue-900/20">

          <p className="text-[10px] uppercase tracking-wider font-mono text-cyan-400 font-semibold mb-1">
            NAVIGATION MENU
          </p>

          <p className="text-xs text-slate-400">
            Multi-Source Satellite Platform
          </p>

        </div>


        {/* ==========================================
            NAVIGATION
        ========================================== */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border-l-2 border-cyan-400 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-900/60'
                  }`
                }
              >

                <Icon className="w-4 h-4 text-cyan-400/80 shrink-0" />

                <span>
                  {item.label}
                </span>

              </NavLink>
            );
          })}

        </nav>


        {/* ==========================================
            SIDEBAR FOOTER
        ========================================== */}
        <div className="p-3 border-t border-blue-900/20 bg-navy-900/40">

          <NavLink
            to="/login"
            onClick={handleNavigation}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-cyan-400 hover:bg-navy-900 transition-colors"
          >

            <LogOut className="w-4 h-4 text-slate-400" />

            <span>
              Demo Login / Switch User
            </span>

          </NavLink>


          <div className="mt-3 p-2.5 rounded-lg bg-navy-950 border border-blue-900/30 text-[10px] text-slate-400 leading-tight">

            <p className="font-mono text-cyan-400 font-semibold">
              SIH DEMO MODE ACTIVE
            </p>

            <p className="mt-1">
              Synthetic multi-source satellite streams loaded.
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}