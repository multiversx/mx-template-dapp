import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';

import { WithClassnameType } from 'types';

// prettier-ignore
const styles = {
  cardContainer: 'card-container flex flex-col gap-4 flex-1 rounded-xl bg-primary transition-all duration-200 ease-out p-6 lg:p-10 justify-center border border-secondary',
  cardTitle: 'card-title flex justify-between items-center text-2xl font-medium group text-primary transition-all duration-200 ease-out',
  cardRef: 'card-ref text-link hover:text-primary transition-all duration-200 ease-out flex items-center',
  cardRefIcon: 'card-ref-icon max-w-3.5 max-h-3.5',
  cardDescription: 'card-description text-secondary transition-all duration-200 ease-out mb-6 text-lg font-medium'
} satisfies Record<string, string>;

interface CardPropsType extends PropsWithChildren, WithClassnameType {
  title: string;
  description?: string;
  reference: string;
  anchor?: string;
}

export const Card = ({
  title,
  children,
  description,
  reference,
  anchor,
  'data-testid': dataTestId
}: CardPropsType) => (
  <div id={anchor} className={styles.cardContainer} data-testid={dataTestId}>
    <h2 className={styles.cardTitle}>
      {title}
      <a href={reference} target='_blank' className={styles.cardRef}>
        <FontAwesomeIcon icon={faInfoCircle} className={styles.cardRefIcon} />
      </a>
    </h2>

    {description && <p className={styles.cardDescription}>{description}</p>}
    {children}
  </div>
);
