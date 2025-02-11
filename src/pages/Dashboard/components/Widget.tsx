import { Card } from 'components/Card';
import { useIsWebProvider } from 'hooks';
import { WidgetType } from 'types/widget.types';
import { getCallbackRoute } from 'utils/getCallbackRoute';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const { isWebProvider } = useIsWebProvider();
  const callbackRoute = anchor
    ? getCallbackRoute({ anchor, isWebProvider })
    : '';

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
