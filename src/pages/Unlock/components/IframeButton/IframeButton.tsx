import { Button } from 'components';

export const IframeButton = ({
  disabled,
  onClick,
  loginButtonText
}: IframeButtonPropsType) => {
  return (
    <Button
      onClick={() => onClick?.()}
      disabled={disabled}
      className='inline-block mx-4 rounded-md m-1 text-base text-center bg-[#1b46c2] border-[#007bff] text-white disabled:opacity-[0.65] disabled:cursor-not-allowed px-3 py-1.5 focus:shadow-[0_0_0_0.2rem_rgba(38,143,255,0.5)]'
    >
      {loginButtonText}
    </Button>
  );
};

export interface IframeButtonPropsType {
  loginButtonText?: string;
  disabled?: boolean;
  onClick?: () => void;
}
