import { CopyButtonSDK } from 'lib/sdkDappCoreUI';

export interface CopyButtonPropsType {
  className?: string;
  text: string;
  copyIcon?: any;
  successIcon?: any;
}

export const CopyButton = (props: CopyButtonPropsType) => {
  return <CopyButtonSDK {...props} />;
};
