import React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from '../../constants/routeNames';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { AnimatedLogo } from '../../components/Logo/AnimatedLogo';
import '../../styles/common.css';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <AnimatedLogo />
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Features</a>
                <a href="#analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Analytics</a>
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">About</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to={routeNames.dashboard} className="mx-button">
                Launch App
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h1 className="text-5xl font-bold mb-6">
                  <span className="mx-gradient-text">AI-Powered</span><br />
                  <span className="text-gray-900 dark:text-white">NFT Analytics</span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Unlock the true potential of your NFTs with advanced AI analytics. 
                  Predict prices, analyze rarity, and make data-driven decisions on MultiversX.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={routeNames.dashboard} className="mx-button text-center px-8 py-3">
                    Get Started
                  </Link>
                  <a href="#learn-more" className="mx-button bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-center px-8 py-3">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-6">
                <div className="relative mt-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-blob" />
                    <div className="w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
                  </div>
                  <div className="relative mx-card backdrop-blur-xl p-6">
                    <img 
                      src="/nft-preview.png" 
                      alt="NFT Analytics Preview" 
                      className="rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mx-gradient-text text-3xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mx-card hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 mx-gradient-text text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Price Prediction</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Advanced AI models to predict NFT prices with high accuracy based on historical data and market trends.
              </p>
            </div>
            <div className="mx-card hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 mx-gradient-text text-3xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Rarity Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Deep analysis of NFT attributes to determine true rarity and market value potential.
              </p>
            </div>
            <div className="mx-card hover:scale-[1.02] transition-transform">
              <div className="h-12 w-12 mx-gradient-text text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Market Analytics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Comprehensive market insights and trends analysis for informed decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-20 bg-gray-50/50 dark:bg-gray-800/50 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mx-gradient-text text-3xl font-bold mb-6">
                Data-Driven Insights
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Make informed decisions with our comprehensive analytics suite powered by advanced AI algorithms.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">✓</div>
                  <span className="text-gray-700 dark:text-gray-300">Real-time price tracking</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">✓</div>
                  <span className="text-gray-700 dark:text-gray-300">Historical data analysis</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">✓</div>
                  <span className="text-gray-700 dark:text-gray-300">Market trend predictions</span>
                </div>
              </div>
            </div>
            <div className="mx-card p-0 overflow-hidden">
              <img 
                src="/analytics-preview.png" 
                alt="Analytics Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-card text-center py-16">
            <h2 className="mx-gradient-text text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of NFT trading with AI-powered analytics and insights.
            </p>
            <Link to={routeNames.dashboard} className="mx-button text-center px-8 py-3">
              Launch App Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mx-gradient-text text-2xl font-bold mb-4">Tikaw</div>
              <p className="text-gray-700 dark:text-gray-300">
                AI-Powered NFT Analytics on MultiversX
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Features</a></li>
                <li><a href="#analytics" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Analytics</a></li>
                <li><a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">API</a></li>
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Discord</a></li>
                <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-700 dark:text-gray-300">
              2025 Tikaw. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
