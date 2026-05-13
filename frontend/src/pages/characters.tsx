import { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, TextField, Snackbar, Alert, Skeleton } from "@mui/material";
import { getCharacters } from "../services/characterService";
import type { Character } from "../services/characterService";
import { useAuth } from "../contexts/authContext";

function Characters() {
  const { token } = useAuth();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [initialLoad, setInitialLoad] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function fetchCharacters() {
      if (!token) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        if (initialLoad) {
        setLoading(true);
        }
        const data = await getCharacters(token, debouncedSearch);
        setCharacters(data);
        setError(null);

        if (initialLoad) {
          setInitialLoad(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError("Servidor indisponível. Tente novamente mais tarde.");
        } else {
          setError("Erro ao buscar personagens");
        }
        setSnackbarOpen(true);

      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [token, debouncedSearch]);


  function CharacterSkeleton() {
    return(
      <Paper
        elevation={3}
        className="p-4 flex flex-col items-center text-center"
      >
        <Skeleton variant="circular" width={128} height={128} />
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="80%" />
      </Paper>
    );

  }

  return (

    <div className="p-6">
      <TextField
        label="Buscar personagem"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        className="mb-6"
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <CharacterSkeleton key={index} />
            ))
          : characters.map((character) => (
              <Paper
                key={character.id}
                elevation={3}
                className="p-4 flex flex-col items-center text-center"
              >
                {character.image}

                <Typography variant="h6">
                  {character.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-500"
                >
                  {character.species} — {character.status}
                </Typography>
              </Paper>
            ))}
      </div>

      <Snackbar 
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
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

export default Characters;