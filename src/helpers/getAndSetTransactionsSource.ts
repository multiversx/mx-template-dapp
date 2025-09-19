let currentTransactionsSource: string = '';

export const setTransactionsSource = (source: string) => {
  currentTransactionsSource = source;
};

export const getTransactionsSource = () => currentTransactionsSource;
