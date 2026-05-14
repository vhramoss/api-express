import { API_URL } from "../config/api";
import { Episode } from "../models/episode.model";

const CHARACTERS_URL = `${API_URL}/episodes`;

export async function getEpisodes(): Promise<Episode[]> {
  const response = await fetch(CHARACTERS_URL, {
    credentials: "include",
  });

  const text = await response.text();

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Resposta inválida do servidor");
  }

  if (!response.ok) {

    if (response.status === 401) {
      throw new Error("Não autorizado");
    }
    throw new Error(
      data.message || "Erro ao buscar episódios"
    );
  }


  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.episodes)) {
    return data.episodes;
  }

  return [];
}
``