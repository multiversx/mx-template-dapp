import {
  DECIMALS,
  DIGITS,
  FormatAmountController,
  useGetNetworkConfig,
  FormatAmountSDK,
  FormatAmountSDKPropsType
} from 'lib';
import { WithClassnameType } from 'types';

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
      valueDecimal={valueDecimal}
      valueInteger={valueInteger}
    />
  );
};
