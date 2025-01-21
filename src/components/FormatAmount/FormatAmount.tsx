import { FormatAmountControllerPropsType } from 'types/sdkDappCoreTypes';
import { useGetNetworkConfig, FormatAmountController } from 'lib/sdkDappCore';
import { DECIMALS, DIGITS } from 'localConstants';

export const FormatAmount = (props: FormatAmountControllerPropsType) => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props,
      egldLabel
    });

  return (
    <format-amount
      is-valid={isValid}
      value-decimal={valueDecimal}
      value-integer={valueInteger}
      label={label}
    ></format-amount>
  );
};
