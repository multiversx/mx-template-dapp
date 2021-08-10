import axios from 'axios';

interface GetLatestTransactionsType {
  apiAddress: string;
  address: string;
  contractAddress: string;
  timeout: number;
  page?: number;
  url?: string;
}

const fetchTransactions = (url: string) =>
  async function getTransactions({
    apiAddress,
    address,
    contractAddress,
    timeout,
  }: GetLatestTransactionsType) {
    try {
      const promises = [address, contractAddress].map((receiver) =>
        axios.get(`${apiAddress}${url}`, {
          params: {
            sender: address,
            receiver,
            condition: 'must',
            size: 25,
          },
          timeout,
        })
      );

      const [ownTransactions, contractTransactions] = await Promise.all(promises);

      return {
        data: [...ownTransactions.data, ...contractTransactions.data],
        success: ownTransactions.data !== undefined && contractTransactions.data !== undefined,
      };
    } catch (err) {
      return {
        data: [],
        success: false,
      };
    }
  };

export const getTransactions = fetchTransactions('/transactions');
export const getTransactionsCount = fetchTransactions('/transactions/count');
