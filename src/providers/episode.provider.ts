import axios from "axios";
import { EpisodeProvider, EpisodeFilter } from "../models/episode.model";
import { Episode } from "../types/episode";

export class RickMortyEpisodeProvider implements EpisodeProvider {
  private baseUrl = "https://rickandmortyapi.com/api";

  async search(filter: EpisodeFilter): Promise<Episode[]> {
    const response = await axios.get(`${this.baseUrl}/episode`, { params: filter });
    return response.data.results ?? [];
  }
}
