import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../contexts/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();

  async function handleSubmit() {
    try {
        const response = await login({
            email,
            password,
        });

        authLogin(response.accessToken);

        console.log("Login bem sucedido!");
        console.log("Token:", response.accessToken);

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else{
            alert("Ocorreu um erro desconhecido");
        }
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2>Login</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Email</label>
        <input
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Senha</label>
        <input
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={handleSubmit} style={{ width: "100%" }}>
        Entrar
      </button>
    </div>
  );
}

export default Login;