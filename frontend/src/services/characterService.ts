import { API_URL } from "../config/api";

const CHARACTERS_URL = `${API_URL}/characters`;

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  description: string;
  image: string;
}

export async function getCharacters(
  name?: string
): Promise<Character[]> {
  const url = name
    ? `${CHARACTERS_URL}/search?name=${encodeURIComponent(name)}`
    : CHARACTERS_URL;

  const response = await fetch(url, {
    credentials: "include", 
  });

  const text = await response.text();

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }


  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) {
    throw new Error(
      (data as any)?.message || "Erro ao buscar personagens"
    );
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as any).characters)
  ) {
    return (data as any).characters;
  }

  return [];
}