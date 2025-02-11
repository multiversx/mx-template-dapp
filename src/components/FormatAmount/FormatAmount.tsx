import { FormatAmountController } from 'lib/sdkDappCore';
import { FormatAmountSDK } from 'lib/sdkDappCoreUI';
import { DECIMALS, DIGITS } from 'localConstants';
import { WithClassnamePropsType } from 'types';

interface FormatAmountPropsType extends WithClassnamePropsType {
  egldLabel?: string;
  value: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      ...props,
      input: props.value
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
