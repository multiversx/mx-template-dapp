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
    icon: faTableTennisPaddleBall,
    id: ItemsIdEnum.pingPongAbi
  },
  {
    title: 'Ping & Pong (Backend)',
    icon: faTableTennisPaddleBall,
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
    icon: faTableTennisPaddleBall,
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
        <h2 className='text-base text-secondary'>Library</h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={`text-primary transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          onClick={toggleCollapse}
        />
      </div>

      {!isCollapsed && (
        <div className='flex flex-col'>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={classNames(
                'flex items-center gap-2 p-2 cursor-pointer',
                { 'bg-primary rounded-lg font-bold': item.id === activeItem }
              )}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} className='text-primary' />

              <div className='text-primary text-sm'>{item.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
