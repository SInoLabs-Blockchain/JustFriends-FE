import Home from 'src/presentation/features/home';
import Profile from 'src/presentation/features/profile';
import { ROUTE } from 'src/common/constants/route';

export const appRoutes = [
  {
    path: ROUTE.HOME,
    component: Home,
    isPrivate: false,
  },
  {
    path: ROUTE.PROFILE,
    component: Profile,
    isPrivate: true,
  },
];
