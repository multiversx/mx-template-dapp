import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { decimals as configDecimals, denomination } from "config";
import denominate from "./denominate";

interface DenominateType {
  value: string;
  showLastNonZeroDecimal?: boolean;
  showErd?: boolean;
  decimals?: number;
  dataTestId?: string;
  token?: string;
}

const Denominate = ({
  value,
  showLastNonZeroDecimal = false,
  showErd = true,
  dataTestId,
  decimals,
  token,
}: DenominateType) => {
  decimals = decimals !== undefined ? decimals : configDecimals;
  const { egldLabel } = Dapp.useContext();

  const denominatedValue = denominate({
    input: value,
    denomination,
    decimals,
    showLastNonZeroDecimal,
  });

  const valueParts = denominatedValue.split(".");
  const hasNoDecimals = valueParts.length === 1;
  const isNotZero = denominatedValue !== "0";

  if (decimals > 0 && hasNoDecimals && isNotZero) {
    let zeros = "";

    for (let i = 1; i <= decimals; i++) {
      zeros = zeros + "0";
    }

    valueParts.push(zeros);
  }

  return (
    <span data-testid={dataTestId}>
      <span className="int-amount">{valueParts[0]}</span>
      {valueParts.length > 1 && (
        <span className="decimals">.{valueParts[1]}</span>
      )}
      {showErd && (
        <span className="symbol">&nbsp;{token ? token : egldLabel}</span>
      )}
    </span>
  );
};

export default Denominate;
