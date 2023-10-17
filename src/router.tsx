import { lazy } from "react";
import { CustomRouteObjectTypes, RoutesTypes } from "./router.model";
const BaseLayout = lazy(() => import("./layouts/BaseLayout"))
const FetchComp = lazy(() => import("./FetchComp"))

const developmentRoutes = [
  { path: "/", element: <FetchComp /> },
]

export const publicRouters: CustomRouteObjectTypes[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      // { path: '*', element: <Status404 /> }
    ]
  }
];

export const developmentRouters: CustomRouteObjectTypes = {
  path: "/",
  element: <BaseLayout />,
  children: developmentRoutes,
};
