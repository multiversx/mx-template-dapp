import { CopyButtonSDK } from 'components/sdkDappCoreUI';
import { CopyButtonSDKPropsType } from 'types/sdkDappCoreUI.types';

export const CopyButton = (props: Partial<CopyButtonSDKPropsType>) => {
  return <CopyButtonSDK {...props} />;
};
