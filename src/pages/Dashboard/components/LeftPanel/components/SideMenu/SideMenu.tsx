import {
  faChevronUp,
  faCirclePlus,
  faFilter,
  faFingerprint,
  faGripLines,
  faPenNib,
  faRectangleList,
  faTableTennisPaddleBall,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons/faGripLinesVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import { ItemsIdEnum } from 'pages/Dashboard/dashboard.types';

interface MenuItemsType {
  title: string;
  icon: IconDefinition;
  id: ItemsIdEnum;
}

const menuItems: MenuItemsType[] = [
  {
    title: 'Ping & Pong (Manual)',
    icon: faTableTennisPaddleBall,
    id: ItemsIdEnum.pingPongRaw
  },
  {
    title: 'Ping & Pong (ABI)',
    icon: faGripLines,
    id: ItemsIdEnum.pingPongAbi
  },
  {
    title: 'Ping & Pong (Backend)',
    icon: faGripLinesVertical,
    id: ItemsIdEnum.pingPongService
  },
  {
    title: 'Sign message',
    icon: faPenNib,
    id: ItemsIdEnum.signMessage
  },
  {
    title: 'Native auth',
    icon: faFingerprint,
    id: ItemsIdEnum.nativeAuth
  },
  {
    title: 'Batch Transactions',
    icon: faCirclePlus,
    id: ItemsIdEnum.batchTransactions
  },
  {
    title: 'Transactions (All)',
    icon: faRectangleList,
    id: ItemsIdEnum.transactionsAll
  },
  {
    title: 'Transactions (Ping & Pong)',
    icon: faFilter,
    id: ItemsIdEnum.transactionsPingPong
  }
];

export const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(ItemsIdEnum.pingPongRaw);

  const toggleCollapse = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  const handleMenuItemClick = (id: ItemsIdEnum) => {
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 135;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setActiveItem(id);
    }
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
              'flex items-center gap-2 p-2 cursor-pointer',
              {
                'bg-primary transition-all duration-300 rounded-lg font-bold':
                  item.id === activeItem
              }
            )}
            onClick={() => handleMenuItemClick(item.id)}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className='text-primary transition-all duration-300'
            />

            <div className='text-primary transition-all duration-300 text-sm'>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
