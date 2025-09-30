import { FunctionComponent, SVGProps } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
