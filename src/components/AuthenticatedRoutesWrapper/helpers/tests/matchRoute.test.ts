import { matchRoute } from '../matchRoute';

const createRoutes = (path: string, authenticatedRoute = true) => [
  {
    path,
    component: () => null,
    authenticatedRoute
  }
];

describe('matchRoute', () => {
  it('should return true for simple routes', () => {
    const result = matchRoute(createRoutes('/home'), '/home');
    expect(result).toBe(true);
  });
  it('should return true for pattern routes', () => {
    const result = matchRoute(createRoutes('/user/:id'), '/user/first-name');
    expect(result).toBe(true);
  });
  it('should return false for non-matching pattern routes', () => {
    const result = matchRoute(
      createRoutes('/user/:id'),
      '/user/first-name/detail'
    );
    expect(result).toBe(false);
  });
  it('should return true for non-athenticated non-matching pattern routes', () => {
    const result = matchRoute(
      createRoutes('/user/:id', false),
      '/user/first-name'
    );
    expect(result).toBe(false);
  });
});
