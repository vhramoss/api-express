import Login from "./pages/login";
import Header from "./components/header";
import { useAuth } from "./contexts/authContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Characters from "./pages/characters";
import PrivateRoute from "./components/privateRoute";
import Episodes from "./pages/episodes";
import Locations from "./pages/locations";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={<Login />}/>

        <Route path="/characters" element={
          <PrivateRoute>
            <Characters />
          </PrivateRoute>
        }/>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/characters" : "/login"} replace />} />
        <Route path="/episodes" element={
          <PrivateRoute>
            <Episodes />
          </PrivateRoute>
        }/>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/episodes" : "/login"} replace />} />
        <Route path="/episodes" element={
          <PrivateRoute>
            <Locations />
          </PrivateRoute>
        }/>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/locations" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;