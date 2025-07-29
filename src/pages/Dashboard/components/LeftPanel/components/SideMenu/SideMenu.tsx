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

interface MenuItemsType {
  title: string;
  icon: IconDefinition;
}

const menuItems: MenuItemsType[] = [
  {
    title: 'Ping & Pong (Manual)',
    icon: faTableTennisPaddleBall
  },
  {
    title: 'Ping & Pong (ABI)',
    icon: faTableTennisPaddleBall
  },
  {
    title: 'Ping & Pong (Backend)',
    icon: faTableTennisPaddleBall
  },
  {
    title: 'Sign message',
    icon: faPenNib
  },
  {
    title: 'Native auth',
    icon: faFingerprint
  },
  {
    title: 'Batch Transactions',
    icon: faTableTennisPaddleBall
  },
  {
    title: 'Transactions (All)',
    icon: faRectangleList
  },
  {
    title: 'Transactions (Ping & Pong)',
    icon: faFilter
  }
];

export const SideMenu = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base text-secondary'>Library</h2>

        <FontAwesomeIcon icon={faChevronUp} className='text-primary' />
      </div>

      <div className='flex flex-col'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-2 p-2'
            // onClick={handleMenuItemClick}
          >
            <FontAwesomeIcon icon={item.icon} className='text-primary' />
            <div className='text-primary text-sm'>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
