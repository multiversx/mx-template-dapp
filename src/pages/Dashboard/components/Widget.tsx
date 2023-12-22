import { Card } from 'components/Card';
import { getCallbackRoute } from 'utils/getCallbackRoute';
import { WidgetType } from 'types/widget.types';
import { LoginMethodsEnum } from 'types/sdkDappTypes';
import { useGetAccountProvider } from 'hooks/sdkDappHooks';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const { providerType } = useGetAccountProvider();
  const isWebWallet = providerType === LoginMethodsEnum.wallet;
  const callbackRoute = anchor ? getCallbackRoute({ anchor, isWebWallet }) : '';

  return (
    <Card
      title={title}
      description={description}
      reference={reference}
      anchor={anchor}
    >
      <MxWidget callbackRoute={callbackRoute} {...props} />
    </Card>
  );
};
