import { Router, Response, Request } from 'express';
import { RickMortyLocationProvider } from '../providers/location.provider';
import { LocationsService } from '../services/location.service';
import { LocationFilter } from '../models/location.model';

const locationRoutes = Router();
const provider = new RickMortyLocationProvider();
const service = new LocationsService(provider);

locationRoutes.get(
  '/',
  async (req: Request, res: Response) => {
    try {
      const locations = await service.search({}); 
      return res.status(200).json(locations);
    } catch {
      return res.status(500).json({
        message: 'Error fetching locations'
      });
    }
  }
);

locationRoutes.get(
    '/search',
    async (req: Request, res: Response) => {
        try {
            const filter = req.query as LocationFilter;
            const locations = await service.search(filter);

            res.status(200).json({ locations });
        } catch {
            res.status(404).json({
                message: 'Locations not found with given filters'
            });
        }
    }
);

export default locationRoutes;