import { useState } from "react";
import { TextField, Button, Paper, Typography, Snackbar, Alert } from "@mui/material";
import { login } from "../services/authService";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
        setLoading(true);
    
        const response = await login({
            email,
            password,
        });

        authLogin(response.accessToken);

        navigate("/characters");


    } catch (error) {
        if (error instanceof Error) {
            setError("Servidor indisponível. Tente novamente mais tarde.");
        } else{
            setError("Ocorreu um erro desconhecido");
        }
        setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <Paper elevation={6} className="w-full max-w-md rounded-xl p-8 shadow-xl">
        <Typography variant="h5" className="mb-2 text-center font-semibold">
          Bem-vindo
        </Typography>

        <Typography variant="body2" className="mb-6 text-center text-gray-500">
          Faça login para continuar
        </Typography>
        <form
         className="flex flex-col gap-5"
          onSubmit={(e) => {  
            e.preventDefault(); 
            handleSubmit();
            }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;