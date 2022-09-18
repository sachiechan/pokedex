import axios from "axios";
import { PokemonResponse, PokemonDetails } from "../types/pokemonTypes";

const defaultAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemonList = async () => {
  try {
    const response = await defaultAPI.get("/pokemon", {
      params: {
        limit: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ", error);
  }
};

export const getPokemonDetails = async (id: string) => {
  if (id) {
    try {
      const response = await defaultAPI.get<PokemonDetails>(`/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error ", error);
    }
  }
};
