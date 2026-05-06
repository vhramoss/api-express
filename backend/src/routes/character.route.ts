import { Router, Request, Response } from 'express';
import { RickMortyCharacterProvider } from '../providers/character.provider';
import { CharactersService } from '../services/character.service';
import { CharacterFilter } from '../models/character.model';

const charactersRoutes = Router();
const provider = new RickMortyCharacterProvider();
const service = new CharactersService(provider);

charactersRoutes.get(
  '/random',
  async (req: Request, res: Response) => {
    try {
      const characters = await service.getRandomCharacters(10);

      res.status(200).json({
        user: req.user,
        characters
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching characters'
      });
    }
  }
);

charactersRoutes.get(
  '/search',
  async (req: Request, res: Response) => {
    try {
      const filter = req.query as CharacterFilter;
      const characters = await service.search(filter);

      res.status(200).json({ characters });
    } catch {
      res.status(404).json({
        message: 'Characters not found with given filters'
      });
    }
  }
);

export default charactersRoutes;