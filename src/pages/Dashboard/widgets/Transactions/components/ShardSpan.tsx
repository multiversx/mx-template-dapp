import { getShardText } from 'lib/sdkDappCore';

export interface ShardSpanPropsType {
  shard: number | string;
  ['data-testid']?: string;
}

export const ShardSpan = ({ shard, ...rest }: ShardSpanPropsType) => (
  <span {...rest}>{getShardText(shard)}</span>
);
