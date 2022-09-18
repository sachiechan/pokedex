import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../services/pokemonService";

export const useFetchPokemon = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery(["pokemonList"], getPokemonList);

  return { data, isLoading, isError };
};
