import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTransactionOutcome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [txData] = useState({
    status: searchParams.get('status'),
    txHash: searchParams.get('txHash'),
    address: searchParams.get('address')
  });

  useEffect(() => {
    // reset search params after transaction is completed
    if (txData.status && txData.address) {
      setSearchParams([]);
    }
  }, [searchParams, txData]);

  return txData;
};
