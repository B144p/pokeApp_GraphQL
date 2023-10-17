import { lazy } from "react";
import { CustomRouteObjectTypes, RoutesTypes } from "./router.model";
const BaseLayout = lazy(() => import("./layouts/BaseLayout"))
const FetchComp = lazy(() => import("./FetchComp"))

const publicRoutes = [
  { path: "/", element: <FetchComp /> },
]

const developmentRoutes = [
  { path: "/", element: <FetchComp /> },
]

export const publicRouters: CustomRouteObjectTypes = {
  path: '/',
  element: <BaseLayout />,
  children: publicRoutes
}

export const developmentRouters: CustomRouteObjectTypes = {
  path: "/",
  element: <BaseLayout />,
  children: developmentRoutes,
}
