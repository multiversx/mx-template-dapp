import { WithClassnameType } from 'types';

import { MvxFormatAmount } from '../../../sdkDappUI/sdkDappUI.components';
import { MvxFormatAmountPropsType } from '../../../sdkDappUI/sdkDappUI.types';
import { DECIMALS, DIGITS } from '../../../sdkDappUtils';
import { FormatAmountController } from '../../sdkDapp.helpers';
import { useGetNetworkConfig } from '../../sdkDapp.hooks';

interface IFormatAmountProps
  extends Partial<MvxFormatAmountPropsType>,
    WithClassnameType {
  value: string;
}

export const FormatAmount = (props: IFormatAmountProps) => {
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
      decimalClass={props.decimalClass}
      labelClass={props.labelClass}
    />
  );
};
