import React from "react";
import { Link } from "react-router-dom";
import { Shield, Zap, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Detect Fake News with Precision
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Our cutting-edge AI system trained on DistilBERT and 10,000+ articles can instantly identify misinformation with remarkable accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Explore the powerful capabilities of our fake news detection system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 text-center hover:border-blue-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Detection</h3>
              <p className="text-slate-400">
                Analyze news articles in real-time using advanced machine learning algorithms.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 text-center hover:border-cyan-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Analysis</h3>
              <p className="text-slate-400">
                DistilBERT model trained on diverse news sources for accurate classification.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 text-center hover:border-purple-500/30 transition-all hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Forum</h3>
              <p className="text-slate-400">
                Discuss findings and share insights with other fact-checking enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-900/50 border-y border-slate-700/50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Our system combines the power of AI with ease of use
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Submit Content</h3>
                  <p className="text-slate-400">
                    Paste the news article or text you want to verify into our detection interface.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                  <p className="text-slate-400">
                    Our DistilBERT model analyzes the text patterns, language structure, and content authenticity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Results</h3>
                  <p className="text-slate-400">
                    Receive instant results with detailed confidence scores and reliability indicators.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 h-96 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-6 animate-pulse"></div>
              <p className="text-slate-400 text-center">AI-Powered Detection Engine</p>
              <p className="text-slate-500 text-sm mt-2">Real-time analysis in action</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join our community and experience the future of news verification. Start detecting fake news today.
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold transition-colors text-lg"
          >
            Register Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 NewsGuard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}