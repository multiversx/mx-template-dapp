import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { UnlockPanelManager } from 'lib';
import { RouteNamesEnum } from 'localConstants';

export const ConnectButton = () => {
  const navigate = useNavigate();
  const unlockPanelInstance = UnlockPanelManager.init({
    loginCallback: () => {
      navigate(RouteNamesEnum.dashboard);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelInstance.openUnlockPanel();
  };

  return <Button onClick={handleOpenUnlockPanel}>Connect</Button>;
};
