import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { RouteNamesEnum } from 'localConstants';

export const ConnectButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(RouteNamesEnum.unlock);
  };

  return <Button onClick={onClick}>Connect</Button>;
};
