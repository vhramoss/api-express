import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { getEpisodes } from "../services/episodeService";
import { Episode } from "../models/episode.model";

function Episodes() {

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        setLoading(true);
        const data = await getEpisodes();
        setEpisodes(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar episódios");
        }


        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-6">
        Episodes
      </Typography>


      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Paper
                key={index}
                elevation={3}
                className="p-4 text-center"
              >
                <Skeleton variant="text" height={32} />
                <Skeleton variant="text" width="60%" />
              </Paper>
            ))
          : episodes.map((episode) => (
              <Paper
                key={episode.id}
                elevation={3}
                className="p-4 text-center"
              >
                <Typography variant="h6">
                  {episode.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-500"
                >
                  {episode.episode}
                </Typography>
              </Paper>
            ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Episodes;
