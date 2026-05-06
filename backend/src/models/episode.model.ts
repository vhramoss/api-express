import { Episode } from "../types/episode";

export interface EpisodeProvider {
  search(filter: EpisodeFilter): Promise<Episode[]>;
}

export interface EpisodeFilter {
  name?: string;
  episode?: string;
}