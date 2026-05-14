import { EpisodeFilter, EpisodeProvider } from "../models/episode.model";
import { Episode } from "../types/episode";

export class EpisodesService {
  constructor(private provider: EpisodeProvider) {}

  async search(filter: EpisodeFilter): Promise<Episode[]> {
    if (!filter || Object.keys(filter).length === 0) {
      return this.provider.getAll();
    }

    return this.provider.search(filter);
  }
}