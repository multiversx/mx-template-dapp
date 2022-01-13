import React from "react";
import {
  DappProvider,
  AuthenticatedRoutesWrapper,
  DappUI,
} from "@elrondnetwork/dapp-core";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import UnlockPage from "pages/UnlockPage";
import Layout from "./components/Layout";
import PageNotFoud from "./components/PageNotFoud";
import { walletConnectBridge, walletConnectDeepLink, network } from "./config";
import { ContextProvider } from "./context";
import routes, { routeNames } from "./routes";

export const App = () => {
  const { TransactionsToastList } = DappUI;
  return (
    <Router>
      <DappProvider
        networkConfig={{ network, walletConnectBridge, walletConnectDeepLink }}
      >
        <AuthenticatedRoutesWrapper routes={routes} unlockRoute="unlock">
          <TransactionsToastList />
          <ContextProvider>
            <Layout>
              <Switch>
                <Route
                  path={routeNames.unlock}
                  component={UnlockPage}
                  exact={true}
                />
                {routes.map((route: any, index: number) => (
                  <Route
                    path={route.path}
                    key={"route-key-" + index}
                    component={route.component}
                    exact={true}
                  />
                ))}
                <Route component={PageNotFoud} />
              </Switch>
            </Layout>
          </ContextProvider>
        </AuthenticatedRoutesWrapper>
      </DappProvider>
    </Router>
  );
};

export default App;
