// null and undefined comes when timeToPong response does not contain returnData
// it cannot be set as 0 because it will display the countdown and will disable canPing
// if it is null/undefined then action of ping can be made
export const setTimeRemaining = (
  secondsRemaining?: null | number
): { canPing: boolean; timeRemaining?: number } => {
  switch (secondsRemaining) {
    case undefined:
    case null:
      return {
        canPing: true
      };
    case 0:
      return {
        timeRemaining: 0,
        canPing: false
      };
    default: {
      return {
        timeRemaining: secondsRemaining,
        canPing: false
      };
    }
  }
};
