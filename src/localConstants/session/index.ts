export * from './session.enums';

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);
