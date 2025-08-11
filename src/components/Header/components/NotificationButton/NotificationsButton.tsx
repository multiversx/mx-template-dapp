import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationsFeedManager } from 'lib';
import { HeaderElementContainer } from '../HeaderElementContainer';

export const NotificationsButton = () => {
  const handleOpenNotificationsFeed = async () => {
    await NotificationsFeedManager.getInstance().openNotificationsFeed();
  };

  return (
    <HeaderElementContainer onClickFunction={handleOpenNotificationsFeed}>
      <FontAwesomeIcon icon={faBell} />
    </HeaderElementContainer>
  );
};
