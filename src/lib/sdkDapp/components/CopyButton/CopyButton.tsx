import { CopyButtonSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { CopyButtonSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';

export const CopyButton = (props: Partial<CopyButtonSDKPropsType>) => {
  return <CopyButtonSDK {...props} />;
};
