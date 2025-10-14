import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, SVGProps } from 'react';

interface ItemIconPropsType {
  icon: IconDefinition | FunctionComponent<SVGProps<SVGSVGElement>>;
}

export const ItemIcon = ({ icon }: ItemIconPropsType) => {
  if ('iconName' in icon) {
    return <FontAwesomeIcon icon={icon} />;
  }

  const IconComponent = icon;
  return <IconComponent />;
};
