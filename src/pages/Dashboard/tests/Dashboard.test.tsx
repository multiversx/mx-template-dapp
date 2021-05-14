import React from "react";
import { routeNames } from "routes";
import { renderWithRouter, testAddress } from "testUtils";

jest.mock("@elrondnetwork/dapp", () => {
  const dapp = jest.requireActual("@elrondnetwork/dapp");
  return {
    ...dapp,
    // testing Authenticate is responsability of @elrondnetwork/dapp
    Authenticate: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe("Dashboard page", () => {
  it("shows a spinner while loading transactions", async () => {
    const screen = renderWithRouter({
      route: `${routeNames.dashboard}?address=${testAddress}`,
    });
    expect(screen.history.location.pathname).toBe(routeNames.dashboard);
    const loader = await screen.findByTestId("loader");
    expect(loader).toBeDefined();
  });
});
