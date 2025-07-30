import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components';
import { NotificationsFeedManager } from 'lib';

export const NotificationsButton = () => {
  const handleOpenNotificationsFeed = async () => {
    await NotificationsFeedManager.getInstance().openNotificationsFeed();
  };

  return (
    <Button
      onClick={handleOpenNotificationsFeed}
      className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
      icon={faBell}
      iconClassName='px-0'
    />
  );
};
