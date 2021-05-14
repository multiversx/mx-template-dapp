import { render } from "@testing-library/react";
import { createMemoryHistory, History } from "history";
import { Router } from "react-router-dom";
import App from "App";

export const testAddress =
  "erd1x5vaatpqp27v32ku9xk8rdkxxlnvp2nrltngq22z8ll30l894jwqhdzng8";

export const renderWithRouter = ({
  route = "/",
  history = createMemoryHistory({ initialEntries: ["/"] }),
}: {
  route: string;
  history?: History;
}) => {
  history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Router history={history}>
        <App />
      </Router>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};
