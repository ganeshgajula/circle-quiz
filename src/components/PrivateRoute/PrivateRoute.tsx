import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export type PrivateRouteProps = {
  path: string;
  element: React.ReactElement;
};

export const PrivateRoute = ({ path, ...props }: PrivateRouteProps) => {
  const {
    authData: { token },
  } = useAuth();

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
};
