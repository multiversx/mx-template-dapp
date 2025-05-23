import { MvxCopyButton } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { MvxCopyButtonPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';

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
