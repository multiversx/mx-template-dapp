import {
  faChevronUp,
  faFilter,
  faFingerprint,
  faPenNib,
  faRectangleList,
  faTableTennisPaddleBall,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FunctionComponent, SVGProps, useState } from 'react';

import IconBatch from 'assets/img/batch-tx.svg?react';
import IconAbi from 'assets/img/ping-pong-abi.svg?react';
import IconBackend from 'assets/img/ping-pong-backend.svg?react';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

interface SideMenuPropsType {
  setIsOpen: (isOpen: boolean) => void;
}
interface MenuItemsType {
  title: string;
  icon?: IconDefinition | FunctionComponent<SVGProps<SVGSVGElement>>;
  id: ItemsIdentifiersEnum;
}

const menuItems: MenuItemsType[] = [
  {
    title: 'Ping & Pong (Manual)',
    icon: faTableTennisPaddleBall,
    id: ItemsIdentifiersEnum.pingPongRaw
  },
  {
    title: 'Ping & Pong (ABI)',
    icon: IconAbi,
    id: ItemsIdentifiersEnum.pingPongAbi
  },
  {
    title: 'Ping & Pong (Backend)',
    icon: IconBackend,
    id: ItemsIdentifiersEnum.pingPongService
  },
  {
    title: 'Sign message',
    icon: faPenNib,
    id: ItemsIdentifiersEnum.signMessage
  },
  {
    title: 'Native auth',
    icon: faFingerprint,
    id: ItemsIdentifiersEnum.nativeAuth
  },
  {
    title: 'Batch Transactions',
    icon: IconBatch,
    id: ItemsIdentifiersEnum.batchTransactions
  },
  {
    title: 'Transactions (All)',
    icon: faRectangleList,
    id: ItemsIdentifiersEnum.transactionsAll
  },
  {
    title: 'Transactions (Ping & Pong)',
    icon: faFilter,
    id: ItemsIdentifiersEnum.transactionsPingPong
  }
];

export const SideMenu = ({ setIsOpen }: SideMenuPropsType) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(
    ItemsIdentifiersEnum.pingPongRaw
  );

  const toggleCollapse = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  const handleMenuItemClick = (id: ItemsIdentifiersEnum) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 250;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveItem(id);
    }
  };

  const setItemIcon = (
    icon: IconDefinition | FunctionComponent<SVGProps<SVGSVGElement>>
  ) => {
    if ('iconName' in icon) return <FontAwesomeIcon icon={icon} />;

    const IconComponent = icon;
    return <IconComponent />;
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base transition-all duration-300 text-secondary'>
          Library
        </h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={`text-primary transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          onClick={toggleCollapse}
        />
      </div>

      <div
        className={classNames('flex flex-col transition-all duration-300', {
          hidden: isCollapsed
        })}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={classNames(
              'flex items-center gap-2 p-2 cursor-pointer text-tertiary transition-all duration-300 fill-tertiary',
              {
                'text-primary bg-primary fill-primary rounded-lg font-bold':
                  item.id === activeItem
              }
            )}
            onClick={() => handleMenuItemClick(item.id)}
          >
            {item.icon && setItemIcon(item.icon)}

            <div className='transition-all duration-300 text-sm'>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
