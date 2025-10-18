import React, { useState, useEffect } from "react";
import { Send, AlertCircle, CheckCircle, Loader } from "lucide-react";
import api from "../services/api";

export default function PredictionPage() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = () => setSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleSidebarToggle);
    return () => window.removeEventListener('toggleSidebar', handleSidebarToggle);
  }, []);

  const handlePredict = async () => {
    if (!content.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/predictions/predict", { content });
      setResult(response.data.prediction);
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Prediction failed. Ensure Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handlePredict();
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <div className="p-4 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Verify Before You Trust</h1>
          <p className="text-slate-400 mb-8">
            Our advanced AI analyzes news articles for signs of misinformation. Paste text or a link below to get an instant analysis.
          </p>

          <div className="max-w-4xl">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-3">
                Enter text or paste a link to a news article
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter text or paste a link to a news article..."
                className="w-full h-48 bg-slate-900/50 border border-slate-600/50 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handlePredict}
                  disabled={loading || !content.trim()}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Detect
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div
                className={`border rounded-lg p-6 ${
                  result.result === "Real"
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  {result.result === "Real" ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                      <span className="text-emerald-400">The news is likely: Real</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <span className="text-red-400">The news is likely: Fake</span>
                    </>
                  )}
                </h2>

                <div className="mb-4">
                  <p className="text-slate-300 mb-2">Confidence Score</p>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        result.result === "Real" ? "bg-emerald-400" : "bg-red-400"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-slate-400 mt-2">{(result.confidence * 100).toFixed(2)}% confidence</p>
                </div>

                <p className="text-slate-300 text-sm pt-4 border-t border-slate-600/50">
                  {result.result === "Real"
                    ? "This content shows characteristics of legitimate news based on language patterns and structure."
                    : "This content contains patterns commonly associated with misinformation. Always verify with trusted sources."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}