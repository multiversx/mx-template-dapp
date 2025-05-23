export type TimeToPongResponseType = {
  status: 'not_yet_pinged' | 'awaiting_pong';
  timeToPong?: number;
};
