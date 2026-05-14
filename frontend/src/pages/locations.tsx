import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { getLocations } from "../services/locationService";
import { Location } from "../models/location.model";

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ controla abertura do snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        const data = await getLocations();
        setLocations(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar locations");
        }

        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-6">
        Locations
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
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Paper>
            ))
          : locations.map((location) => (
              <Paper
                key={location.id}
                elevation={3}
                className="p-4 text-center"
              >
                <Typography variant="h6">
                  {location.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-500"
                >
                  {location.type}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-400"
                >
                  {location.dimension}
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

export default Locations;