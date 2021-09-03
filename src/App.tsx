import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFoud from "./components/PageNotFoud";
import * as config from "./config";
import { ContextProvider } from "./context";
import routes, { routeNames } from "./routes";

export default function App() {
  return (
    <Dapp.Context config={config}>
      <ContextProvider>
        <Layout>
          <Switch>
            <Route
              path={routeNames.unlock}
              component={() => (
                <Dapp.Pages.Unlock
                  callbackRoute={routeNames.dashboard}
                  title={config.dAppName}
                  lead="Please select your login method:"
                  ledgerRoute={routeNames.ledger}
                  walletConnectRoute={routeNames.walletconnect}
                />
              )}
              exact={true}
            />
            <Route
              path={routeNames.ledger}
              component={() => (
                <Dapp.Pages.Ledger callbackRoute={routeNames.dashboard} />
              )}
              exact={true}
            />
            <Route
              path={routeNames.walletconnect}
              component={() => (
                <Dapp.Pages.WalletConnect
                  callbackRoute={routeNames.dashboard}
                  logoutRoute={routeNames.home}
                  title="Maiar Login"
                  lead="Scan the QR code using Maiar"
                />
              )}
              exact={true}
            />

            {routes.map((route, i) => (
              <Route
                path={route.path}
                key={route.path + i}
                component={route.component}
                exact={true}
              />
            ))}
            <Route component={PageNotFoud} />
          </Switch>
        </Layout>
      </ContextProvider>
    </Dapp.Context>
  );
}
