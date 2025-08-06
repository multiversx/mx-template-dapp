import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Unlock } from 'pages';
import { NewHome } from 'pages/NewHome';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
  authenticatedRoute?: boolean;
  children?: RouteWithTitleType[];
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: NewHome,
    children: [
      {
        path: RouteNamesEnum.unlock,
        title: 'Unlock',
        component: Unlock
      }
    ]
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
