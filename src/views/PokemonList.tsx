import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import SearchBox from "../components/SearchBox";
import { Pokemon } from "../types/pokemonTypes";
import { useFetchPokemon } from "../hooks/useFetchPokemon";

export const PokemonList = () => {
  const { data = {}, isLoading, isError } = useFetchPokemon();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const filterPokemonList = (value: string) => {
    const filtered = data.results.filter(({ name }: Pokemon) => {
      return name.includes(value);
    });
    setPokemons(filtered);
  };

  useEffect(() => {
    if (data?.results) {
      console.log("Results", data.results);
      setPokemons(data.results);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later...</div>;
  }

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography gutterBottom variant="h5" component="div">
        Pokemons
      </Typography>
      <Box sx={{ marginY: "2rem" }}>
        <SearchBox onChange={filterPokemonList} />
      </Box>

      <Box sx={{ width: "90%", display: "flex", flexFlow: "wrap" }}>
        {pokemons.map(({ name, url }: Pokemon) => {
          return <PokemonCard name={name} url={url} />;
        })}
      </Box>
    </Box>
  );
};
