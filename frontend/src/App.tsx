import Login from "./pages/login";
import Header from "./components/header";
import { useAuth } from "./contexts/authContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Characters from "./pages/characters";
import PrivateRoute from "./components/privateRoute";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;