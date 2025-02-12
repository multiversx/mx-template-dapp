import { WithClassnameType } from 'types';
import { CopyButtonSDK } from 'utils';

export interface CopyButtonPropsType extends WithClassnameType {
  text: string;
}

export const CopyButton = (props: CopyButtonPropsType) => {
  return <CopyButtonSDK {...props} />;
};
