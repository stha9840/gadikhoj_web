// GuestRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../src/auth/AuthProvider";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user, Loading } = useContext(AuthContext);

  if (Loading) return <div>Loading...</div>;

  if (isAuthenticated) {
    // Redirect logged-in users
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  return children;
};

export default GuestRoute;
