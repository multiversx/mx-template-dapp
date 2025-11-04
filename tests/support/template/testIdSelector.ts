/**
 * Helper function to create a data-testid selector string
 * @param testId - The test ID value
 * @returns CSS selector string for data-testid attribute
 */
export const getTestIdSelector = (testId: string): string =>
  `[data-testid="${testId}"]`;
