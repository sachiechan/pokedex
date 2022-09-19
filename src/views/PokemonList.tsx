import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import { Pokemon } from "../types/pokemonTypes";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import PokemonCard from "../components/PokemonCard";

export const PokemonList = () => {
  const { data = {}, isLoading, isError } = useFetchPokemon();
  const [searchString, setSearchString] = useState<string>("");

  const filterPokemonList = () => {
    if (!searchString) {
      return data?.results || [];
    }
    const filtered = data.results.filter(({ name }: Pokemon) => {
      return name.includes(searchString);
    });
    return filtered;
  };

  const filteredList = filterPokemonList();

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
        <SearchBox onChange={(text: string) => setSearchString(text)} />
      </Box>

      <Box sx={{ width: "90%", display: "flex", flexFlow: "wrap" }}>
        {filteredList.map(({ name, url }: Pokemon) => {
          return <PokemonCard key={name} name={name} url={url} />;
        })}
      </Box>
    </Box>
  );
};
