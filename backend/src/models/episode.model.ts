import { Episode } from "../types/episode";

export interface EpisodeProvider {
  getAll(): Promise<Episode[]>;
  search(filter: EpisodeFilter): Promise<Episode[]>;
}

export interface EpisodeFilter {
  name?: string;
  episode?: string;
}