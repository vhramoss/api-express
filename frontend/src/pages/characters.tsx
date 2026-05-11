import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
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
          setError(err.message);
        } else {
          setError("Erro ao buscar personagens");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [token, debouncedSearch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography className="p-6 text-red-600">
        {error}
      </Typography>
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
        {characters.map((character) => (
          <Paper
            key={character.id}
            elevation={3}
            className="p-4 flex flex-col items-center text-center"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 rounded-full mb-3"
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
    </div>
  );
}

export default Characters;