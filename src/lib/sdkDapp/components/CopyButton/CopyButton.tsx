import { CopyButtonSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { CopyButtonSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';

export const CopyButton = ({
  className,
  text,
  copyIcon,
  iconClass,
  successIcon
}: Partial<CopyButtonSDKPropsType>) => {
  return (
    <CopyButtonSDK
      class={className}
      text={text}
      copyIcon={copyIcon}
      iconClass={iconClass}
      successIcon={successIcon}
    />
  );
};
