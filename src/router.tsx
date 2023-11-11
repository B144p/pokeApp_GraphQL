import { lazy } from "react";
import { CustomRouteObjectTypes } from "./router.model";
const BaseLayout = lazy(() => import("./layouts/BaseLayout"))
const FetchComp = lazy(() => import("./FetchComp"))
const PokemonView = lazy(() => import("./views/app/detail/PokemonView"))

const publicRoutes = [
  { path: "/", element: <FetchComp /> },
]

const developmentRoutes = [
  { path: "/", element: <FetchComp /> },
  { path: "/pokemon-chain/:id", element: <PokemonView /> },
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
