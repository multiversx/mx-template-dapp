import { Card } from 'components/Card';
import { getCallbackRoute } from 'utils';
import { WidgetType } from 'types/widget.types';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const callbackRoute = anchor ? getCallbackRoute({ anchor }) : '';

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
