import express from 'express';
import authRoutes from './routes/auth.routes';
import charactersRoutes from './routes/character.route';
import locationsRoutes from './routes/location.route';
import episodeRoutes from './routes/episode.route';
import { jwtAuth } from './middlewares/jwtAuth';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http;//localhost:5173",
    credentials: true,
}));
app.use('/auth', authRoutes);
app.use('/characters', jwtAuth, charactersRoutes);
app.use('/locations', jwtAuth, locationsRoutes);
app.use('/episodes', jwtAuth, episodeRoutes);
app.use(cookieParser());

export default app;