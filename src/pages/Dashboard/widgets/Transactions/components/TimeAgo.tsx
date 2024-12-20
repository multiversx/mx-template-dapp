import { timeAgo, getHumanReadableTimeFormat } from 'lib/sdkDappCore';

export interface TimeAgoPropsType {
  value: number;
  short?: boolean;
  tooltip?: boolean;
}

export const TimeAgo = ({
  value,
  short = false,
  tooltip = false
}: TimeAgoPropsType) => {
  const result = timeAgo(value * 1000, short);

  const component = tooltip ? (
    <span
      title={getHumanReadableTimeFormat({
        value,
        noSeconds: false,
        utc: true
      })}
      data-testid={`timeAgo-${value}`}
    >
      {result}
    </span>
  ) : (
    <span data-testid={`timeAgo-${value}`}>{result}</span>
  );

  return <span className={styles?.transactionCell}>{component}</span>;
};
