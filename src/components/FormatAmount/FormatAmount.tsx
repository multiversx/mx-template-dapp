import { FormatAmountControllerPropsType } from 'types/sdkDappCoreTypes';
import { FormatAmountController } from 'lib/sdkDappCore';
import { DECIMALS, DIGITS } from 'localConstants';
import { WithClassnamePropsType } from 'types';
import { FormatAmountSDK } from 'lib/sdkDappCoreUI';

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
    <FormatAmountSDK
      class={props.className}
      dataTestId={props['data-testid']}
      isValid={isValid}
      label={label}
      valueDecimal={valueDecimal}
      valueInteger={valueInteger}
    />
  );
};
