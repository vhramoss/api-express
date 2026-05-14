import { API_URL } from "../config/api";
import { Character } from "../models/character.model";

const CHARACTERS_URL = `${API_URL}/characters`;

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

  if (!text) {
    return [];
  }

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
    throw new Error("Erro ao buscar personagens");
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


export async function getRandomCharacters(): Promise<Character[]> {
  const response = await fetch(`${CHARACTERS_URL}/random`, {
    credentials: "include",
  });

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

  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar personagens aleatórios");
  }

  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as any).characters)
  ) {
    return (data as any).characters;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}