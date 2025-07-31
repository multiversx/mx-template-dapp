import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GITHUB_REPO_URL } from 'config';
import { HeaderElementContainer } from '../HeaderElementContainer';

export const GitHubButton = () => (
  <HeaderElementContainer>
    <a href={GITHUB_REPO_URL} rel='noopener noreferrer' target='_blank'>
      <FontAwesomeIcon icon={faGithub as IconProp} />
    </a>
  </HeaderElementContainer>
);
