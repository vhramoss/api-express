const API_URL = "http://localhost:3000/locations";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export async function getLocations(
  token: string
): Promise<Location[]> {
  const response = await fetch(`${API_URL}/search`, {
    method: "GET",
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
    throw new Error(
      data.message || "Erro ao buscar locations"
    );
  }

  return data.locations;
}
``