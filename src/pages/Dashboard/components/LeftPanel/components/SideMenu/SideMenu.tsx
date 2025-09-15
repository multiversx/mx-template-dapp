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

import { ReactComponent as IconBatch } from 'assets/img/batch-tx.svg';
import { ReactComponent as IconAbi } from 'assets/img/ping-pong-abi.svg';
import { ReactComponent as IconBackend } from 'assets/img/ping-pong-backend.svg';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

// prettier-ignore
const styles = {
  sideMenuContainer: 'side-menu-container flex flex-col gap-4',
  sideMenuHeader: 'side-menu-header flex items-center justify-between',
  sideMenuHeaderTitle: 'side-menu-header-title text-base transition-all duration-200 ease-out text-secondary',
  sideMenuHeaderIcon: 'side-menu-header-icon text-primary transition-transform duration-200 ease-out',
  sideMenuHeaderIconRotated: 'rotate-180',
  sideMenuItems: 'side-menu-items flex flex-col transition-all duration-200 ease-out',
  sideMenuItemsHidden: 'hidden',
  sideMenuItem: 'side-menu-item flex items-center gap-2 p-2 cursor-pointer text-tertiary hover:text-primary hover:bg-primary hover:font-bold transition-all duration-200 ease-out fill-tertiary hover:fill-primary hover:rounded-lg',
  sideMenuItemActive: 'side-menu-item-active text-primary bg-primary fill-primary rounded-lg font-bold transition-all duration-200 ease-out',
  sideMenuItemTitle: 'side-menu-item-title transition-all duration-200 ease-out text-sm'
} satisfies Record<string, string>;

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
    <div className={styles.sideMenuContainer}>
      <div className={styles.sideMenuHeader}>
        <h2 className={styles.sideMenuHeaderTitle}>Library</h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={classNames(styles.sideMenuHeaderIcon, {
            [styles.sideMenuHeaderIconRotated]: isCollapsed
          })}
          onClick={toggleCollapse}
        />
      </div>

      <div
        className={classNames(styles.sideMenuItems, {
          [styles.sideMenuItemsHidden]: isCollapsed
        })}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            className={classNames(styles.sideMenuItem, {
              [styles.sideMenuItemActive]: item.id === activeItem
            })}
          >
            {item.icon && setItemIcon(item.icon)}

            <div className={styles.sideMenuItemTitle}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
