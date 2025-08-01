export const TemplateLogo = () => (
  <div className='flex items-center justify-center gap-2'>
    <div className='w-4 h-4 bg-logo-primary relative transition-all duration-300'>
      <div className='w-4 h-4 bg-logo-secondary border-2 border-logo absolute -left-0.5 top-0.5 transition-all duration-300' />
    </div>

    <div className='hidden lg:!flex text-primary font-medium text-xl tracking-[-0.72px] transition-all duration-300'>
      dApp Template
    </div>
  </div>
);
