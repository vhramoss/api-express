import express from 'express';
import authRoutes from './routes/auth.routes';
import charactersRoutes from './routes/character.route';
import locationsRoutes from './routes/location.route';
import episodeRoutes from './routes/episode.route';
import { jwtAuth } from './middlewares/jwtAuth';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/characters', jwtAuth, charactersRoutes);
app.use('/locations', jwtAuth, locationsRoutes);
app.use('/episodes', jwtAuth, episodeRoutes);


export default app;