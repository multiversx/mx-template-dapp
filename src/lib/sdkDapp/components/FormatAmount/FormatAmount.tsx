import { WithClassnameType } from 'types';
import { MvxFormatAmount } from '../../../sdkDappCoreUI/sdkDappCoreUI.components';
import { MvxFormatAmountPropsType } from '../../../sdkDappCoreUI/sdkDappCoreUI.types';
import { DECIMALS, DIGITS } from '../../../sdkDappUtils';
import { FormatAmountController } from '../../sdkDapp.helpers';
import { useGetNetworkConfig } from '../../sdkDapp.hooks';

interface FormatAmountPropsType
  extends Partial<MvxFormatAmountPropsType>,
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
    <MvxFormatAmount
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
