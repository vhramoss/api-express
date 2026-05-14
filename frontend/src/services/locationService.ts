import { getApiUrl } from "../config/api";
import { Location } from "../models/location.model";

const API_URL = getApiUrl()
const LOCATIONS_URL = `${API_URL}/locations`;

export async function getLocations(): Promise<Location[]> {
  const response = await fetch(LOCATIONS_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Não autorizado");
    }

    throw new Error("Erro ao buscar locations");
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

  // ✅ NORMALIZAÇÃO
  if (Array.isArray(data)) {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as any).locations)
  ) {
    return (data as any).locations;
  }

  return [];
}