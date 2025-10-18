import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { User, Calendar, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = () => setSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleSidebarToggle);
    return () => window.removeEventListener('toggleSidebar', handleSidebarToggle);
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchPredictions();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setProfile(response.data.user);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  const fetchPredictions = async () => {
    try {
      const response = await api.get("/predictions/history");
      setPredictions(response.data.predictions);
    } catch (err) {
      setError("Failed to load predictions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
    <div className=" p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
      <p className="text-slate-400 mb-8">Manage your account and preferences</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
              <p className="text-slate-400 text-sm mb-4">{user?.email}</p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Joined in {new Date(user?.joinedDate).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction History */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Prediction History</h3>

            {loading ? (
              <div className="text-slate-400 text-center py-8">Loading...</div>
            ) : predictions.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No predictions yet.</div>
            ) : (
              <div className="space-y-3">
                <table className="w-full">
                  <thead className="border-b border-slate-700/50">
                    <tr>
                      <th className="text-left text-slate-300 font-semibold pb-3">Date</th>
                      <th className="text-left text-slate-300 font-semibold pb-3">News Title</th>
                      <th className="text-left text-slate-300 font-semibold pb-3">Prediction</th>
                      <th className="text-left text-slate-300 font-semibold pb-3">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {predictions.slice(0, 5).map((pred) => (
                      <tr key={pred._id}>
                        <td className="py-3 text-slate-400 text-sm">
                          {new Date(pred.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-slate-300 text-sm truncate max-w-xs">
                          {pred.content.substring(0, 40)}...
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              pred.result === "Real"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {pred.result}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400 text-sm">
                          {(pred.confidence * 100).toFixed(0)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {predictions.length > 5 && (
                  <div className="flex justify-center gap-2 mt-6 pt-6 border-t border-slate-700/50">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 rounded text-sm">
                      2
                    </button>
                    <button className="px-3 py-1 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 rounded text-sm">
                      3
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}