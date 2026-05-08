import Login from "./pages/login";
import Header from "./components/header";
import { useAuth } from "./contexts/authContext";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Usuário autenticado
        </h1>
      </div>
    </div>
  );
}

export default App;