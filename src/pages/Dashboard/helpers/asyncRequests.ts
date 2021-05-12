import axios from "axios";

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
      const { data } = await axios.get(`${apiAddress}${url}`, {
        params: {
          sender: address,
          receiver: contractAddress,
          condition: "must",
          size: 25,
        },
        timeout,
      });

      return {
        data: data,
        success: data !== undefined,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  };

export const getTransactions = fetchTransactions("/transactions");
export const getTransactionsCount = fetchTransactions("/transactions/count");
