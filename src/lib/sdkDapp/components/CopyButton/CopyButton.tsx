import { MvxCopyButton } from 'lib/sdkDappUI/sdkDappUI.components';
import { MvxCopyButtonPropsType } from 'lib/sdkDappUI/sdkDappUI.types';

export const CopyButton = ({
  className,
  text,
  copyIcon,
  iconClass,
  successIcon
}: Partial<MvxCopyButtonPropsType>) => {
  return (
    <MvxCopyButton
      class={className}
      text={text}
      copyIcon={copyIcon}
      iconClass={iconClass}
      successIcon={successIcon}
    />
  );
};
