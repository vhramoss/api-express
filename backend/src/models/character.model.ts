import { Character } from "../types/character";


export interface CharacterFilter {
  name?: string;
  status?: "alive" | "dead" | "unknown";
  species?: string;
  type?: string;
}

export interface CharacterProvider {
  search(filter: CharacterFilter): Promise<Character[]>;
  getRandom(count: number): Promise<Character[]>;
}