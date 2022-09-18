import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../services/pokemonService";

export const useFetchPokemonDetails = (id: string) => {
  const { data, isLoading, isError } = useQuery(["pokemonDetails", [id]], () =>
    getPokemonDetails(id)
  );

  return { data, isLoading, isError };
};
