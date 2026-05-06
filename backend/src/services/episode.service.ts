import { EpisodeFilter, EpisodeProvider } from "../models/episode.model";
import { Episode } from "../types/episode";

export class EpisodesService {
  constructor(private provider: EpisodeProvider) {}

  async search(filter: EpisodeFilter): Promise<Episode[]> {
    return this.provider.search(filter);
  }
}
