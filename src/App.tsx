import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from 'components';

import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains
} from 'config';
import {
  AxiosInterceptorContext, // using this is optional
  DappProvider,
  TransactionsToastList,
  NotificationModal,
  SignTransactionsModals
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
} from 'lib';

import { RouteNamesEnum } from 'localConstants';
import { PageNotFound } from 'pages';
import { routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';

export const App = () => {
  return (
    <Router>
      <BatchTransactionsContextProvider>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={`route-key-'${route.path}`}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={PageNotFound} />
          </Routes>
        </Layout>
      </BatchTransactionsContextProvider>
    </Router>
  );
};
