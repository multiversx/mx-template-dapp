import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home } from 'pages';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
  authenticatedRoute?: boolean;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: Disclaimer
  }
];
