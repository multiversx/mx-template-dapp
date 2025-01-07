import React from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import axios from 'axios';
import type { WidgetProps } from '../../types/widget.types';

interface NftRarityScore {
  nftId: string;
  rarityScore: number;
  attributes: Record<string, string>;
}

const NftRarityAnalyzer = ({ callbackRoute }: WidgetProps) => {
  const { address } = useGetAccount();
  const [nftScores, setNftScores] = React.useState<NftRarityScore[]>([]);

  const analyzeNftRarity = async (nftId: string) => {
    try {
      // Appel à l'API XOXNO pour obtenir les métadonnées du NFT
      const response = await axios.get(`https://api.xoxno.com/nft/${nftId}`);
      const nftData = response.data;

      // Calcul du score de rareté basé sur les attributs
      let rarityScore = 0;
      const attributes = nftData.attributes;

      // TODO: Implémenter l'algorithme de scoring
      // Pour chaque attribut, calculer sa rareté dans la collection
      
      setNftScores(prev => [...prev, {
        nftId,
        rarityScore,
        attributes
      }]);

    } catch (error) {
      console.error('Error analyzing NFT rarity:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Enter NFT ID to analyze rarity..."
          className="mx-input flex-1"
        />
        <button className="mx-button whitespace-nowrap">
          Analyze Rarity
        </button>
      </div>

      <div className="mx-grid">
        {nftScores.map((score) => (
          <div key={score.nftId} className="mx-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="mx-gradient-text text-xl">NFT #{score.nftId}</h3>
              <div className="mx-stat-card px-3 py-1">
                <span className="mx-stat-value text-lg">{score.rarityScore.toFixed(2)}</span>
                <span className="mx-stat-label">Rarity Score</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">Attributes</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(score.attributes).map(([key, value]) => (
                  <div key={key} className="mx-stat-card">
                    <span className="mx-stat-label capitalize">{key}</span>
                    <span className="mx-stat-value text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NftRarityAnalyzer };
