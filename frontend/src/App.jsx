import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SIHPresentationModal from './components/SIHPresentationModal';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TrackingPage from './pages/TrackingPage';
import SatellitePage from './pages/SatellitePage';
import IdentificationPage from './pages/IdentificationPage';
import ClassificationPage from './pages/ClassificationPage';
import TemporalPage from './pages/TemporalPage';
import PredictionPage from './pages/PredictionPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AlertsPage from './pages/AlertsPage';
import DataSourcesPage from './pages/DataSourcesPage';
import ModelsPage from './pages/ModelsPage';
import AboutPage from './pages/AboutPage';
import ActivityLogPage from './pages/ActivityLogPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const location = useLocation();

  const isStandalonePage =
    location.pathname === '/' ||
    location.pathname === '/login';

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">

      {/* SIH Presentation Mode */}
      <SIHPresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {isStandalonePage ? (

        /* =========================
           LANDING / LOGIN
        ========================== */

        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                onOpenPresentationMode={() =>
                  setIsPresentationOpen(true)
                }
              />
            }
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Routes>

      ) : (

        /* =========================
           APPLICATION LAYOUT
        ========================== */

        <div className="flex flex-col min-h-screen">

          {/* Navbar */}
          <Navbar
            onOpenPresentationMode={() =>
              setIsPresentationOpen(true)
            }
            onOpenMobileMenu={() =>
              setIsMobileSidebarOpen(true)
            }
          />

          <div className="flex flex-1 min-h-0 relative">

            {/* Sidebar */}
            <Sidebar
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() =>
                setIsMobileSidebarOpen(false)
              }
            />

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-y-auto bg-navy-950">

              <Routes>

                <Route
                  path="/dashboard"
                  element={<DashboardPage />}
                />

                <Route
                  path="/tracking"
                  element={<TrackingPage />}
                />

                <Route
                  path="/satellite"
                  element={<SatellitePage />}
                />

                <Route
                  path="/identification"
                  element={<IdentificationPage />}
                />

                <Route
                  path="/classification"
                  element={<ClassificationPage />}
                />

                <Route
                  path="/temporal"
                  element={<TemporalPage />}
                />

                <Route
                  path="/prediction"
                  element={<PredictionPage />}
                />

                <Route
                  path="/history"
                  element={<HistoryPage />}
                />

                <Route
                  path="/analytics"
                  element={<AnalyticsPage />}
                />

                <Route
                  path="/alerts"
                  element={<AlertsPage />}
                />

                <Route
                  path="/activity"
                  element={<ActivityLogPage />}
                />

                <Route
                  path="/settings"
                  element={<SettingsPage />}
                />

                <Route
                  path="/data-sources"
                  element={<DataSourcesPage />}
                />

                <Route
                  path="/models"
                  element={<ModelsPage />}
                />

                <Route
                  path="/about"
                  element={<AboutPage />}
                />

              </Routes>

            </main>

          </div>

        </div>
      )}

    </div>
  );
}