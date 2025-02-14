import {
  FormatAmountController,
  useGetNetworkConfig
} from 'lib/sdkDapp/sdkDappCore';
import { FormatAmountSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { FormatAmountSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';
import { DECIMALS, DIGITS } from 'lib/sdkDappUtils';
import { WithClassnameType } from 'types/componentsTypes';

interface FormatAmountPropsType
  extends Partial<FormatAmountSDKPropsType>,
    WithClassnameType {
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
      showLabel={props.showLabel}
      valueDecimal={valueDecimal}
      valueInteger={valueInteger}
    />
  );
};
