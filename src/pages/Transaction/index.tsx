import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, Link } from "react-router-dom";
import PageState from "components/PageState";
import { routeNames } from "routes";

const Transaction = () => {
  const { search } = useLocation();
  const { explorerAddress } = Dapp.useContext();

  const query = new URLSearchParams(search);
  const { status, txHash } = Object.fromEntries(query);

  return status === "success" ? (
    <PageState
      svgComponent={
        <FontAwesomeIcon icon={faCheck} className="text-success fa-3x" />
      }
      className="dapp-icon icon-medium"
      title="Transaction submitted successfully"
      description={
        <>
          <p>
            <a
              href={`${explorerAddress}transactions/${txHash}`}
              {...{
                target: "_blank",
              }}
              className="tx-link"
              title="View in Explorer"
            >
              {txHash}
            </a>
          </p>
          <Link to={routeNames.dashboard} className="btn btn-primary mt-3">
            Back to dashboard
          </Link>
        </>
      }
    />
  ) : (
    <PageState
      svgComponent={
        <FontAwesomeIcon icon={faTimes} className="text-danger fa-3x" />
      }
      className="dapp-icon icon-medium"
      title="Error sending transaction"
      description={
        <>
          <p>Try again</p>
          <a href={routeNames.dashboard} className="btn btn-primary mt-3">
            Back to dashboard
          </a>
        </>
      }
    />
  );
};

export default Transaction;
