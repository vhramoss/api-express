const API_URL = "http://localhost:3000/characters";

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  description: string;
  image: string;
}

export async function getCharacters(token: string, name?: string): Promise<Character[]> {
  const query = name ? `?name=${encodeURIComponent(name)}` : "";
  const response = await fetch(`${API_URL}/search${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Resposta inválida do servidor");
  }

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar personagens");
  }

  return data.characters ?? data;
}