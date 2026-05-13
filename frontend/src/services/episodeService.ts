const API_URL = "http://localhost:3000/episodes";

export interface Episode {
  id: number;
  name: string;
  episode: string;
}

export async function getEpisodes(token: string): Promise<Episode[]> {
  const response = await fetch(`${API_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar episódios");
  }

  return data.episodes;
}