import Login from "./pages/login";
import Header from "./components/header";
import { useAuth } from "./contexts/authContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Characters from "./pages/characters";
import Episodes from "./pages/episodes";
import Locations from "./pages/locations";
import PrivateRoute from "./components/privateRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/characters"
          element={
            <PrivateRoute>
              <Characters />
            </PrivateRoute>
          }
        />

        <Route
          path="/episodes"
          element={
            <PrivateRoute>
              <Episodes />
            </PrivateRoute>
          }
        />

        <Route
          path="/locations"
          element={
            <PrivateRoute>
              <Locations />
            </PrivateRoute>
          }
        />

        {/* Catch-all MUST be last */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/characters" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;