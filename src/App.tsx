import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';
import { Layout } from './components';

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
            <Route path='*' element={<div>NOT FOUND</div>} />
          </Routes>
        </Layout>
      </BatchTransactionsContextProvider>
    </Router>
  );
};
