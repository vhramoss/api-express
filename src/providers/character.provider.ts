import axios from "axios";
import { CharacterProvider, CharacterFilter } from "../models/character.model";
import { Character } from "../types/character";
export class RickMortyCharacterProvider implements CharacterProvider {
  private baseUrl = "https://rickandmortyapi.com/api";

  async getRandom(count: number): Promise<Character[]> {
    const maxId = 826;

    const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * maxId) + 1);
    const response = await axios.get(`${this.baseUrl}/character/${randomIds.join(",")}`);

    return Array.isArray(response.data) ? response.data : [response.data];
  }

  async search(filter: CharacterFilter): Promise<Character[]> {
    const response = await axios.get(`${this.baseUrl}/character`, { params: filter });
    return response.data.results ?? [];
  }
}