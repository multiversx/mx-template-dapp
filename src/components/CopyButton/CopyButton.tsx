import { CopyButtonSDK } from 'components/sdkDappCoreUI';
import { CopyButtonSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';

export const CopyButton = (props: Partial<CopyButtonSDKPropsType>) => {
  return <CopyButtonSDK {...props} />;
};
