import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { getLocations } from "../services/locationService";
import type { Location } from "../services/locationService";

/**
 * Página Locations
 *
 * Responsabilidade:
 * - Buscar locations da API
 * - Exibir lista
 * - Tratar loading (Skeleton)
 * - Tratar erro (Snackbar)
 *
 * Não faz:
 * - Navegação
 * - Autenticação
 * - Lógica de permissão
 */
function Locations() {
  const { token } = useAuth();

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ controla abertura do snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      if (!token) return;

      try {
        setLoading(true);
        const data = await getLocations(token);
        setLocations(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar locations");
        }

        // ✅ erro como feedback, sem quebrar layout
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [token]);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-6">
        Locations
      </Typography>

      {/* ✅ Grid mantém layout estável */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? // ✅ Skeleton apenas no primeiro load
            Array.from({ length: 8 }).map((_, index) => (
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

      {/* ✅ Snackbar para erro */}
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