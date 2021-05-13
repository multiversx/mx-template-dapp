import {StateType} from "./types";

const initialState = (): StateType => {
  return {
    transactions: [],
    transactionsFetched: undefined,
  };
};

export default initialState;
