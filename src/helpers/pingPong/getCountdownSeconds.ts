import type { SetStateAction } from 'react';

type GetCountdownSecondsType = {
  secondsLeft: number;
  setSecondsLeft: (value: SetStateAction<number>) => void;
};
export const getCountdownSeconds = ({
  secondsLeft,
  setSecondsLeft
}: GetCountdownSecondsType) => {
  if (secondsLeft) {
    const interval = setInterval(() => {
      setSecondsLeft((existing) => {
        if (existing) {
          return existing - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }
};
