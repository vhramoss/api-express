import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { CircularProgress, Box } from "@mui/material";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
``