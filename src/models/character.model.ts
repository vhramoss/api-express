import { Character } from "../types/character";

export interface CharacterProvider {
  getRandom(count: number): Promise<Character[]>;
  search(filter: CharacterFilter): Promise<Character[]>;
}

export interface CharacterFilter {
  name?: string;
  status?: "alive" | "dead" | "unknown";
  species?: string;
  type?: string;
}
