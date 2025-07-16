import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { safeWindow } from '@multiversx/sdk-dapp';
import { Button } from 'components';
import { GITHUB_REPO } from 'localConstants';

export const GitHubButton = () => {
  const handleOpenGitHubRepo = () => {
    safeWindow?.open(GITHUB_REPO);
  };

  return (
    <Button
      onClick={handleOpenGitHubRepo}
      className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
    >
      <FontAwesomeIcon icon={faGithub} />
    </Button>
  );
};
