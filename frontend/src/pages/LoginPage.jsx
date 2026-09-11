import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Lock, Mail, UserCheck, ArrowRight } from 'lucide-react';
import { apiClient } from '../services/apiClient';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@cyclone-intelligence.gov.in');
  const [password, setPassword] = useState('sih_demo_password');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiClient.login(email, password);
    localStorage.setItem('cyclone_user', JSON.stringify(res.user));
    localStorage.setItem('cyclone_token', res.token);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const res = await apiClient.login('judge@sih2026.gov.in', 'demo');
    localStorage.setItem('cyclone_user', JSON.stringify(res.user));
    localStorage.setItem('cyclone_token', res.token);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-navy-950">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-blue-900/40 shadow-2xl space-y-6">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-700 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Activity className="w-7 h-7 text-navy-950 font-bold" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100 tracking-wider">
            CYCLONE<span className="text-cyan-400">INTELLIGENCE</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Scientific Access & SIH Demonstration Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 font-mono">
              OFFICIAL EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-navy-950/80 border border-blue-900/40 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
                placeholder="meteorologist@imd.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 font-mono">
              AUTHENTICATION KEY
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-navy-950/80 border border-blue-900/40 text-slate-100 text-xs focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-navy-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'LOGIN TO PLATFORM'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Access Section */}
        <div className="border-t border-blue-900/30 pt-4 space-y-3">
          <div className="text-center">
            <span className="text-[11px] text-slate-400 font-mono">
              SIH JUDGING & EVALUATION ACCESS
            </span>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-navy-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 fill-navy-950" />
            <span>ONE-CLICK DEMO ACCESS (NO AUTH REQUIRED)</span>
          </button>

          <p className="text-[10px] text-slate-500 text-center font-mono">
            Pre-configured with synthetic multi-source satellite streams & SIH demo datasets.
          </p>
        </div>
      </div>
    </div>
  );
}
