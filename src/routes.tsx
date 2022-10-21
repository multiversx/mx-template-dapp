import React from 'react';
import { AuthRedirectWrapper } from 'components';
import { dAppName } from 'config';
import { withPageTitle } from './components/PageTitle';

import { Transaction, Dashboard, Home } from './pages';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
};

export const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: () => (
      <AuthRedirectWrapper>
        <Home />
      </AuthRedirectWrapper>
    )
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  }
];

export const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});
