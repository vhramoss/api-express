const API_URL = "http://localhost:3000";

interface LoginPayload {
  email: string;
  password: string;
}


export async function login(payload: LoginPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Servidor indisponível. Tente novamente mais tarde.");
  }

  const text = await response.text();

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }

  if (response.status === 401) {
    throw new Error("Email ou senha incorretos");
  }


  if (!response.ok) {
    throw new Error(
      data.message || "Erro ao realizar login"
    );
  }

  return data;
}

export async function logout(): Promise<void> {
  await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export async function me(): Promise<void> {
  const response = await fetch("http://localhost:3000/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sessão inválida");
  }
}
