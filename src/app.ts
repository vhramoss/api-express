import express from 'express';
import authRoutes from './routes/auth.routes';
import charactersRoutes from './routes/character.route';
import locationsRoutes from './routes/location.route';
import episodeRoutes from './routes/episode.route';
import { jwtAuth } from './middlewares/jwtAuth';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/characters', charactersRoutes, jwtAuth);
app.use('/locations', locationsRoutes, jwtAuth);
app.use('/episodes', episodeRoutes, jwtAuth);

export default app;