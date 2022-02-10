import {
  RouteProps,
  Route as ReactRouterDOMRoute,
  Redirect,
} from "react-router-dom";
import { useAuthProvider } from "../hooks/AuthContext";

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export const Route: React.FC<Props> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuthProvider();

  return (
    <ReactRouterDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "dashboard",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};
