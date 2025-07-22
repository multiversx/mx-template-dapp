import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GITHUB_REPO_URL } from 'config';

export const GitHubButton = () => {
  return (
    <a
      href={GITHUB_REPO_URL}
      rel='noopener noreferrer'
      target='_blank'
      className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
    >
      <FontAwesomeIcon icon={faGithub as IconProp} />
    </a>
  );
};
