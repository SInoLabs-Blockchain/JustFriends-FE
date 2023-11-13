import Home from "src/presentation/features/home";
import Profile from "src/presentation/features/profile";
import PostDetails from "src/presentation/features/postDetails";
import EditProfile from "src/presentation/features/profile/editProfile";
import Search from "../features/search";
import ErrorPage from "../features/error";
import { ROUTE } from "src/common/constants/route";

export const appRoutes = [
  {
    path: ROUTE.HOME,
    component: Home,
    ErrorBoundary: ErrorPage,
    isPrivate: false,
  },
  {
    path: ROUTE.POST_DETAILS,
    component: PostDetails,
    isPrivate: false,
  },
  {
    path: ROUTE.PROFILE,
    component: Profile,
    isPrivate: true,
  },
  {
    path: ROUTE.SEARCH,
    component: Search,
    isPrivate: false,
  },
  {
    path: ROUTE.EDIT_PROFILE,
    component: EditProfile,
    isPrivate: true,
  },
];
