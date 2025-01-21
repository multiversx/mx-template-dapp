import { FormatAmountControllerPropsType } from 'types/sdkDappCoreTypes';
import { FormatAmountController } from 'lib/sdkDappCore';
import { DECIMALS, DIGITS } from 'localConstants';
import { WithClassnamePropsType } from 'types';

export const FormatAmount = (
  props: FormatAmountControllerPropsType & WithClassnamePropsType
) => {
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props
    });

  return (
    <format-amount
      class={props.className}
      data-testid={props['data-testid']}
      is-valid={isValid}
      label={label}
      value-decimal={valueDecimal}
      value-integer={valueInteger}
    ></format-amount>
  );
};
