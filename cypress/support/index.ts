// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    checkUrl: (url: string) => void;
    login: (walletID: string, selector: string) => void;
    apiIntercept: (method: string, param: string) => void;
    checkWidgetMsg: (msgArr: string[]) => void;
    getSelector: (
      selector: string,
      ...cypressAction: []
    ) => Chainable<JQuery<HTMLElement>>;
  }
}
