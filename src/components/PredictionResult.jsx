import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const PredictionResult = ({ result }) => {
  if (!result) return null;

  const isReal = result.result === "Real";

  return (
    <div
      className={`border rounded-lg p-6 backdrop-blur-sm ${
        isReal
          ? "bg-emerald-500/10 border-emerald-500/30"
          : "bg-red-500/10 border-red-500/30"
      }`}
    >
      <div className="flex items-start gap-4">
        {isReal ? (
          <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">
            {isReal ? "Appears to be Real News" : "Likely Fake News"}
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-300 mb-1">Confidence Score</p>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isReal ? "bg-emerald-400" : "bg-red-400"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {(result.confidence * 100).toFixed(2)}% confidence
              </p>
            </div>

            <p className="text-sm text-slate-300 pt-2 border-t border-slate-600/50">
              {isReal
                ? "This content shows characteristics of legitimate news based on language patterns and structure."
                : "This content contains patterns commonly associated with misinformation. Verify with trusted sources."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


