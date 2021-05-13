import { renderWithRouter } from "testUtils";

test("renders home page", () => {
  const screen = renderWithRouter({ route: "/" });
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
});
