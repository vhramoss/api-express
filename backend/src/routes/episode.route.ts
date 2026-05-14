import { Router, Request, Response } from "express";
import { RickMortyEpisodeProvider } from "../providers/episode.provider";
import { EpisodesService } from "../services/episode.service";
import { EpisodeFilter } from "../models/episode.model";

const episodeRoutes = Router();

const provider = new RickMortyEpisodeProvider();
const service = new EpisodesService(provider);

episodeRoutes.get(
  "/",
  async (req: Request, res: Response) => {
    try {
      const episodes = await service.search({}); // sem filtro
      return res.status(200).json(episodes);
    } catch {
      return res.status(500).json({
        message: "Error fetching episodes"
      });
    }
  }
);

episodeRoutes.get(
  "/search",
  async (req: Request, res: Response) => {
    try {
      const filter = req.query as EpisodeFilter;
      const episodes = await service.search(filter);
      res.status(200).json(episodes);
    } catch {
      res.status(404).json({ message: "Episodes not found" });
    }
  }
);

export default episodeRoutes;
