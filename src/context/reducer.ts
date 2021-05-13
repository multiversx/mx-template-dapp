import {ActionType, StateType, TransactionType} from "./types";

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "setTransactions": {
      const newState: StateType = {
        ...state,
        transactions: action.transactions,
        transactionsFetched: action.transactionsFetched,
      };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
