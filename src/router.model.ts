import { RouteObject, To } from "react-router-dom";

export interface RoutesTypes {
    path?: To;
    element?: JSX.Element;
    children?: RoutesTypes[];
}

// Custom Routes Type
export type CustomRouteObjectTypes = RouteObject & {};
