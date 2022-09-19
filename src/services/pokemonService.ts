import axios from "axios";
import { PokemonDetails, PokemonResponse } from "../types/pokemonTypes";

const defaultAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

/**
 * Fetches a list of pokemons from the API
 * @returns {PokemonResponse} An object with a 'results' property containg the retreived pokemons.
 */
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

/**
 * Fetches details of a pokemon charachter from the API
 * @param {id} id The id of a pokemon character.
 * @returns {PokemonDetails} An object containing details of the pokemon.
 */
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
