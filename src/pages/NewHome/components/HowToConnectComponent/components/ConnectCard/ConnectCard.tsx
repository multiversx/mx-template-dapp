import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, SVGProps } from 'react';

interface ConnectCardPropsType {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkTitle: string;
  linkDownloadAddress: string;
}

export const ConnectCard = ({
  icon,
  title,
  description,
  linkTitle,
  linkDownloadAddress
}: ConnectCardPropsType) => {
  const IconComponent = icon;

  return (
    <div className='bg-secondary p-8 lg:p-10 flex flex-col gap-10 rounded-3xl'>
      <IconComponent />

      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl text-primary font-medium tracking-[-0.96px] leading-[1]'>
          {title}
        </h2>

        <p className='text-secondary text-xl tracking-[-0.21px] leading-[1.5]'>
          {description}
        </p>
      </div>

      <a
        href={linkDownloadAddress}
        target='_blank'
        className='text-accent text-lg font-semibold'
      >
        <span className='p-3'>{linkTitle}</span>

        <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </div>
  );
};
