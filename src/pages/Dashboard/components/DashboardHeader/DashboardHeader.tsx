export const DashboardHeader = () => (
  <div className='flex flex-col p-8 lg:p-10 justify-center items-center gap-6 self-stretch'>
    <div className='text-primary transition-all duration-300 text-center text-3xl xxs:text-5xl lg:text-6xl font-medium'>
      Welcome to dApp Template
    </div>

    <div className='text-secondary transition-all duration-300 text-center text-base xxs:text-lg lg:text-xl font-medium'>
      The MultiversX dApp Template, built using{' '}
      <a
        href='https://react.dev/'
        target='_blank'
        rel='noreferrer'
        className='underline hover:text-primary transition-all duration-300'
      >
        React.js
      </a>{' '}
      and{' '}
      <a
        href='https://www.typescriptlang.org/'
        target='_blank'
        rel='noreferrer'
        className='underline hover:text-primary transition-all duration-300'
      >
        Typescript
      </a>
      . It's a basic implementation of{' '}
      <a
        href='https://www.npmjs.com/package/@multiversx/sdk-dapp'
        target='_blank'
        rel='noreferrer'
        className='underline hover:text-primary transition-all duration-300'
      >
        @multiversx/sdk-dapp
      </a>
      , providing the basics for MultiversX authentication and TX signing.
    </div>
  </div>
);
