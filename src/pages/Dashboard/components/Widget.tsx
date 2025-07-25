import { Card } from 'components';
import { WidgetType } from 'types/widget.types';

export const Widget = ({
  title,
  description,
  reference,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  return (
    <Card title={title} description={description} reference={reference}>
      <MxWidget {...props} />
    </Card>
  );
};
