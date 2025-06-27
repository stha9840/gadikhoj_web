// UserRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../src/auth/AuthProvider";

const UserRoute = ({ children }) => {
  const { isAuthenticated, user, Loading } = useContext(AuthContext);

  if (Loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user.role !== "user") return <Navigate to="/" replace />;

  return children;
};

export default UserRoute;
