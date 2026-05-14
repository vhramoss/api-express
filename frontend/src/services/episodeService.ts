import { getApiUrl } from "../config/api";
import { Episode } from "../models/episode.model";

const API_URL = getApiUrl()
const EPISODES_URL = `${API_URL}/episodes`;

export async function getEpisodes(): Promise<Episode[]> {
  const response = await fetch(EPISODES_URL, {
    credentials: "include",
  });


  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado");
    }

    throw new Error("Erro ao buscar episódios");
  }


  const text = await response.text();

  if (!text) {
    return [];
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }

 
  if (Array.isArray(data)) {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as any).episodes)
  ) {
    return (data as any).episodes;
  }

  return [];
}