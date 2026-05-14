import { LoginPayload } from "../models/loginPayload.model";
import { getApiUrl } from "../config/api";

const API_URL = getApiUrl()
export async function login(payload: LoginPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Servidor indisponível. Tente novamente mais tarde.");
  }


  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Email ou senha incorretos");
    }
    throw new Error("Erro ao realizar login");
  }


  const text = await response.text();


  if (!text) {
    return;
  }

  try {
    JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }
}


export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}


export async function me(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Sessão inválida");
  }

  await response.text();
}