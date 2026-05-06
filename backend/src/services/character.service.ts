import { CharacterFilter, CharacterProvider } from "../models/character.model";
import { Character } from "../types/character";

export class CharactersService {
  constructor(private provider: CharacterProvider) {}

  async getRandomCharacters(count = 10): Promise<Character[]> {
    return this.provider.getRandom(count);
  }

  async search(filter: CharacterFilter): Promise<Character[]> {
    return this.provider.search(filter);
  }

}
