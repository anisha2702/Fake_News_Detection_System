import React, { useState, useEffect } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import api from "../services/api";

export default function HistoryPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(false);;

  useEffect(() => {
    fetchHistory();
  }, []);
  useEffect(() => {
    const handleSidebarToggle = () => setSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleSidebarToggle);
    return () => window.removeEventListener('toggleSidebar', handleSidebarToggle);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/predictions/history");
      setPredictions(response.data.predictions);
    } catch (err) {
      setError("Failed to load prediction history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
       <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Prediction History</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-slate-400 text-center py-12">Loading history...</div>
      ) : predictions.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-12 text-center">
          <p className="text-slate-400">No predictions yet. Start by analyzing some news content!</p>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">News Title</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Prediction</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {predictions.map((pred) => (
                <tr key={pred._id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {new Date(pred.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-slate-300 truncate max-w-xs">{pred.content.substring(0, 50)}...</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        pred.result === "Real"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {pred.result}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          pred.result === "Real" ? "bg-emerald-400" : "bg-red-400"
                        }`}
                        style={{ width: `${pred.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{(pred.confidence * 100).toFixed(1)}%</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
