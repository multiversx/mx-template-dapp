import React, { useEffect, useState } from 'react';
import { faBan, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { AxiosError } from 'axios';
import { Loader, PageState, TransactionsTable } from 'components';

import { apiTimeout, contractAddress, transactionSize } from 'config';
import { getTransactions } from 'helpers';
import { MyApiNetworkProvider } from 'helpers/MyApiNetworkProvider';
import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from 'hooks';
import { ServerTransactionType } from 'types';
import { NftVisualizer } from './components/NftVisualizer';

enum Section {
  staked = 'Staked',
  wallet = 'Wallet'
}

export const Dashboard = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const apiNetworkProvider = new MyApiNetworkProvider(apiAddress);

  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();

  const [section, setSection] = useState<Section>(Section.staked);
  const [stakedNfts, setStakedNfts] = useState<any[]>([
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-01',
      url: '/nftex.jpg'
    },
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-02',
      url: '/nftex.jpg'
    },
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-03',
      url: '/nftex.jpg'
    },
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-04',
      url: '/nftex.jpg'
    },
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-05',
      url: '/nftex.jpg'
    },
    {
      name: 'ciao 1',
      identifier: 'CIAO-ABC123-06',
      url: '/nftex.jpg'
    }
  ]); //TODO creare tipo
  const [walletNfts, setWalletNfts] = useState<any[]>([]);

  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchNfts = async () => {
    try {
      setIsLoading(true);

      //TODO retrieve NFTs
      const { data } = await getTransactions({
        apiAddress,
        sender: address,
        receiver: contractAddress,
        condition: 'must',
        transactionSize,
        apiTimeout
      });
      setTransactions(data);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (success || fail) {
      fetchNfts();
    }
  }, [success, fail]);

  useEffect(() => {
    fetchNfts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  /*
  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }
  */

  return (
    <div>
      <div className='container'>
        <div className='bg-white p-4'>
          <div className='bg-dark p-4'>
            <SectionSelector section={section} setSection={setSection} />
            <div className='nft-container'>
              {section === Section.staked &&
                stakedNfts.map((nft) => <NftVisualizer nft={nft} />)}
              {section === Section.wallet &&
                walletNfts.map((nft) => <NftVisualizer nft={nft} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type SectionSelectorProps = {
  section: string;
  setSection: any; //TODO cercare di mettere Dispatch<SetStateAction<Section>>
};

const SectionSelector = ({ section, setSection }: SectionSelectorProps) => {
  //TODO migliorare grafica
  return (
    <div className='mb-2'>
      <button
        className={
          'btn btn-lg btn-' +
          (section == Section.staked ? 'primary' : 'outline-primary')
        }
        onClick={() => setSection(Section.staked)}
      >
        Staked
      </button>
      <button
        className={
          'btn btn-lg btn-' +
          (section == Section.wallet ? 'primary' : 'outline-primary')
        }
        onClick={() => setSection(Section.wallet)}
      >
        Wallet
      </button>
    </div>
  );
};
