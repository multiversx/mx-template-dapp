import React from "react";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageState from "components/PageState";
import { useContext } from "context";
import TransactionsList from "./TransactionsList";

const Transactions = () => {
  const { transactions } = useContext();

  return transactions.length > 0 ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div className="my-5">
      <PageState
        svgComponent={
          <FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />
        }
        title="No Transactions"
      />
    </div>
  );
};

export default Transactions;
