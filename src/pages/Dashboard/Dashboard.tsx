import React from 'react';
import { AuthRedirectWrapper } from 'wrappers';
import { Account } from './widgets';
import { useScrollToElement } from 'hooks';
import { Widget } from './components';
import { WidgetType } from 'types/widget.types';
import { NftRarityAnalyzer } from 'components/NftAnalytics/NftRarityAnalyzer';
import { NftPricePredictor } from 'components/NftAnalytics/NftPricePredictor';
import '../../styles/common.css';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  {
    title: 'NFT Rarity Analyzer',
    widget: NftRarityAnalyzer,
    description: 'Analyze NFT rarity based on attributes and collection data',
    reference: 'https://docs.xoxno.com'
  },
  {
    title: 'NFT Price Predictor',
    widget: NftPricePredictor,
    description: 'Predict NFT prices using machine learning',
    reference: 'https://docs.xoxno.com'
  }
];

export const Dashboard = () => {
  const { hash } = window.location;
  const ref = useScrollToElement(hash);

  return (
    <AuthRedirectWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="mx-gradient-text text-4xl mb-8">NFT Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="mx-stat-card">
              <span className="mx-stat-value">247</span>
              <span className="mx-stat-label">Total NFTs Analyzed</span>
            </div>
            <div className="mx-stat-card">
              <span className="mx-stat-value">89.4%</span>
              <span className="mx-stat-label">Average Prediction Accuracy</span>
            </div>
            <div className="mx-stat-card">
              <span className="mx-stat-value">1.28K</span>
              <span className="mx-stat-label">Active Users</span>
            </div>
          </div>

          <div className="space-y-6" ref={ref}>
            {WIDGETS.map((element) => {
              const WidgetComponent = element.widget;
              return (
                <div key={element.title} className="mx-card hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="mx-gradient-text text-2xl">{element.title}</h2>
                    {element.reference && (
                      <a
                        href={element.reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 text-sm"
                      >
                        View Docs
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{element.description}</p>
                  <Widget
                    title={element.title}
                    description={element.description}
                    reference={element.reference}
                    anchor={element.anchor}
                    widget={WidgetComponent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
