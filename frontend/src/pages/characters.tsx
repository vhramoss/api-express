import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Skeleton,
  Button,
} from "@mui/material";
import {
  getCharacters,
  getRandomCharacters,
} from "../services/characterService";
import { Character } from "../models/character.model";

function CharacterSkeleton() {
  return (
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

function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);


  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);

        const data = await getCharacters(debouncedSearch);
        setCharacters(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro ao buscar personagens"
        );
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [debouncedSearch]);


  async function handleRandom() {
    try {
      setLoading(true);
      const data = await getRandomCharacters();
      setCharacters(data);
      setSearch(""); 
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao buscar personagens aleatórios"
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-6">
        <TextField
          label="Buscar personagem"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <Button
          variant="outlined"
          onClick={handleRandom}
          disabled={loading}
        >
          Random
        </Button>
      </div>


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
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-32 h-32 rounded-full mb-2"
                  />

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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
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
