import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import { createMemoryHistory, History } from "history";
import { Router } from "react-router-dom";
import App from "App";
import mockImplementation, { MockImplementationType } from "./networkRequests";

export const renderWithHistory = ({
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
      </Router>,
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

const renderWithRouter = ({
  route,
  networkRequests,
}: {
  route: string;
  networkRequests?: MockImplementationType["networkRequests"];
}) => {
  const mockGet = jest.spyOn(axios, "get");

  mockGet.mockImplementation(mockImplementation({ networkRequests }));

  return renderWithHistory({
    route,
  });
};

export default renderWithRouter;
