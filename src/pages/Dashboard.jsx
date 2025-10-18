import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStats();
    
    // Listen for sidebar toggle
    const handleSidebarToggle = () => setSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleSidebarToggle);
    return () => window.removeEventListener('toggleSidebar', handleSidebarToggle);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/predictions/stats");
      setStats(response.data.stats);
    } catch (err) {
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Content wrapper with transition */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <div className="p-4 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 mb-8">
            Welcome back, {user?.username}! Here's an overview of your recent activity.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-slate-400 text-center py-12">Loading statistics...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-300 font-semibold text-sm">Predictions Made</h3>
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white">{stats?.totalPredictions || 0}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-300 font-semibold text-sm">Accuracy</h3>
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-white">{stats?.accuracy || "0%"}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-300 font-semibold text-sm">Real News</h3>
                  <CheckCircle className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-3xl font-bold text-white">{stats?.realCount || 0}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-300 font-semibold text-sm">Fake News</h3>
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-3xl font-bold text-white">{stats?.fakeCount || 0}</p>
              </div>
            </div>
          )}

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Predictions</h2>
            <p className="text-slate-400">View your recent predictions in the History section.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
