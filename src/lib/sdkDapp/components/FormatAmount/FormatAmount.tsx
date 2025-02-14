import { WithClassnameType } from 'types';
import { FormatAmountSDK } from '../../../sdkDappCoreUI/sdkDappCoreUI.components';
import { FormatAmountSDKPropsType } from '../../../sdkDappCoreUI/sdkDappCoreUI.types';
import { DECIMALS, DIGITS } from '../../../sdkDappUtils';
import { FormatAmountController, useGetNetworkConfig } from '../../sdkDappCore';

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
