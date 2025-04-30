import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { UnlockPanelManager } from 'lib';
import { RouteNamesEnum } from 'localConstants';

export const ConnectButton = () => {
  const navigate = useNavigate();
  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      navigate(RouteNamesEnum.dashboard);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  return <Button onClick={handleOpenUnlockPanel}>Connect</Button>;
};
