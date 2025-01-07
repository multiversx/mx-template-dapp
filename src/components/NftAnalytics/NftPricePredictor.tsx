import React from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import * as tf from '@tensorflow/tfjs';
import type { WidgetProps } from '../../types/widget.types';

interface PricePrediction {
  nftId: string;
  predictedPrice: number;
  confidence: number;
  confidenceFactors: {
    varianceScore: number;
    dataQuantityScore: number;
    similarityScore: number;
  };
}

interface HistoricalData {
  price: number;
  features: number[];
}

const NftPricePredictor = ({ callbackRoute }: WidgetProps) => {
  const { address } = useGetAccount();
  const [predictions, setPredictions] = React.useState<PricePrediction[]>([]);
  const [model, setModel] = React.useState<tf.LayersModel | null>(null);
  const [historicalData, setHistoricalData] = React.useState<HistoricalData[]>([]);

  React.useEffect(() => {
    // Chargement ou création du modèle TensorFlow.js
    const initModel = async () => {
      try {
        // Créer un modèle séquentiel simple pour la prédiction des prix
        const model = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 32, activation: 'relu' }),
            tf.layers.dense({ units: 1 })
          ]
        });

        model.compile({
          optimizer: tf.train.adam(0.001),
          loss: 'meanSquaredError'
        });

        setModel(model);
        
        // Simuler le chargement de données historiques
        // Dans une implémentation réelle, ces données viendraient d'une API
        const mockHistoricalData: HistoricalData[] = Array.from({ length: 100 }, () => ({
          price: Math.random() * 10,
          features: Array.from({ length: 10 }, () => Math.random())
        }));
        setHistoricalData(mockHistoricalData);
      } catch (error) {
        console.error('Error initializing model:', error);
      }
    };

    initModel();
  }, []);

  const calculateVarianceScore = (predictions: number[]): number => {
    if (predictions.length < 2) return 0.5;
    
    // Calculer la variance des prédictions
    const mean = predictions.reduce((a, b) => a + b, 0) / predictions.length;
    const variance = predictions.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / predictions.length;
    
    // Normaliser la variance en score de confiance (plus la variance est faible, plus la confiance est élevée)
    return Math.exp(-variance);
  };

  const calculateDataQuantityScore = (features: number[]): number => {
    // Calculer le score basé sur la quantité de données similaires disponibles
    const threshold = 0.1;
    let similarDataPoints = 0;

    historicalData.forEach(data => {
      const distance = features.reduce((acc, feat, i) => 
        acc + Math.pow(feat - data.features[i], 2), 0);
      if (Math.sqrt(distance) < threshold) {
        similarDataPoints++;
      }
    });

    // Normaliser le score (plus il y a de données similaires, plus la confiance est élevée)
    return Math.min(similarDataPoints / 20, 1);
  };

  const calculateSimilarityScore = (features: number[]): number => {
    // Calculer la similarité avec les NFT historiques les plus proches
    const similarities = historicalData.map(data => {
      const distance = features.reduce((acc, feat, i) => 
        acc + Math.pow(feat - data.features[i], 2), 0);
      return Math.exp(-Math.sqrt(distance));
    });

    // Prendre la moyenne des 5 meilleures similarités
    return similarities
      .sort((a, b) => b - a)
      .slice(0, 5)
      .reduce((a, b) => a + b, 0) / 5;
  };

  const predictPrice = async (nftId: string, features: number[]) => {
    if (!model) return;

    try {
      // Faire plusieurs prédictions avec dropout pour estimer l'incertitude
      const numPredictions = 10;
      const predictions: number[] = [];
      
      for (let i = 0; i < numPredictions; i++) {
        const inputTensor = tf.tensor2d([features]);
        const prediction = model.predict(inputTensor) as tf.Tensor;
        const predictedValue = (await prediction.data())[0];
        predictions.push(predictedValue);
        
        // Cleanup
        inputTensor.dispose();
        prediction.dispose();
      }

      // Calculer la prédiction finale (moyenne)
      const predictedPrice = predictions.reduce((a, b) => a + b, 0) / predictions.length;

      // Calculer les différents facteurs de confiance
      const varianceScore = calculateVarianceScore(predictions);
      const dataQuantityScore = calculateDataQuantityScore(features);
      const similarityScore = calculateSimilarityScore(features);

      // Calculer le score de confiance global (moyenne pondérée)
      const confidence = (
        varianceScore * 0.4 +
        dataQuantityScore * 0.3 +
        similarityScore * 0.3
      );

      setPredictions(prev => [...prev, {
        nftId,
        predictedPrice,
        confidence,
        confidenceFactors: {
          varianceScore,
          dataQuantityScore,
          similarityScore
        }
      }]);

    } catch (error) {
      console.error('Error predicting price:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter NFT ID to analyze..."
          className="mx-input flex-1"
        />
        <button className="mx-button whitespace-nowrap">
          Predict Price
        </button>
      </div>

      <div className="mx-grid">
        {predictions.map((pred) => (
          <div key={pred.nftId} className="mx-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="mx-gradient-text text-xl">NFT #{pred.nftId}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Confidence</span>
                <div className="mx-progress-bar w-24">
                  <div 
                    className="mx-progress-value" 
                    style={{ width: `${pred.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="mx-stat-card">
                <span className="mx-stat-value">{pred.predictedPrice.toFixed(2)} EGLD</span>
                <span className="mx-stat-label">Predicted Price</span>
              </div>
              <div className="mx-stat-card">
                <span className="mx-stat-value">{(pred.confidence * 100).toFixed(1)}%</span>
                <span className="mx-stat-label">Confidence Score</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">Confidence Factors</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mx-stat-card">
                  <div className="mx-progress-bar mb-2">
                    <div 
                      className="mx-progress-value" 
                      style={{ width: `${pred.confidenceFactors.varianceScore * 100}%` }}
                    />
                  </div>
                  <span className="mx-stat-value text-lg">
                    {(pred.confidenceFactors.varianceScore * 100).toFixed(1)}%
                  </span>
                  <span className="mx-stat-label">Model Consistency</span>
                </div>
                <div className="mx-stat-card">
                  <div className="mx-progress-bar mb-2">
                    <div 
                      className="mx-progress-value" 
                      style={{ width: `${pred.confidenceFactors.dataQuantityScore * 100}%` }}
                    />
                  </div>
                  <span className="mx-stat-value text-lg">
                    {(pred.confidenceFactors.dataQuantityScore * 100).toFixed(1)}%
                  </span>
                  <span className="mx-stat-label">Data Quantity</span>
                </div>
                <div className="mx-stat-card">
                  <div className="mx-progress-bar mb-2">
                    <div 
                      className="mx-progress-value" 
                      style={{ width: `${pred.confidenceFactors.similarityScore * 100}%` }}
                    />
                  </div>
                  <span className="mx-stat-value text-lg">
                    {(pred.confidenceFactors.similarityScore * 100).toFixed(1)}%
                  </span>
                  <span className="mx-stat-label">Historical Similarity</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NftPricePredictor };
