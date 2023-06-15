// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    checkUrl: (url: string) => void;
    login: () => void;
    apiIntercept: (method: string, param: string) => void;
    getSelector: (
      selector: string,
      ...cypressAction: []
    ) => Chainable<JQuery<HTMLElement>>;
  }
}
