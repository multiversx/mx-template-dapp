import {
  FormatAmountController,
  useGetNetworkConfig
} from 'lib/sdkDapp/sdkDappCore';
import { FormatAmountSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { DECIMALS, DIGITS } from 'lib/sdkDappUtils';
import { WithClassnameType } from 'types/componentsTypes';

interface FormatAmountPropsType extends WithClassnameType {
  egldLabel?: string;
  value: string;
}

export const FormatAmount = (props: FormatAmountPropsType) => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel,
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
