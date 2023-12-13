import { useMemo } from 'react';
import { Card } from 'components/Card';
import { getCallbackUrl } from 'utils';
import { WidgetType } from 'types/widget.types';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {},
  isCallbackUrlRelative
}: WidgetType) => {
  const callbackUrl = useMemo(() => {
    if (!anchor) {
      return '';
    }

    return getCallbackUrl({ anchor, relative: isCallbackUrlRelative });
  }, [anchor]);

  return (
    <Card
      title={title}
      description={description}
      reference={reference}
      anchor={anchor}
    >
      <MxWidget callbackUrl={callbackUrl} {...props} />
    </Card>
  );
};
