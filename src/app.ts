import express from 'express';
import authRoutes from './routes/auth.routes';
import charactersRoutes from './routes/character.route';
import locationsRoutes from './routes/location.route';
import episodeRoutes from './routes/episode.route';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/characters', charactersRoutes);
app.use('/locations', locationsRoutes);
app.use('/episodes', episodeRoutes);

export default app;