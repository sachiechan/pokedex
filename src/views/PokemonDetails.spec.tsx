import React from "react";
import { screen, render } from "@testing-library/react";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";
import { PokemonDetails } from "./PokemonDetails";
import { BrowserRouter } from "react-router-dom";

const mockPokemon = {
  name: "ditto",
  sprites: {
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
  },
  abilities: [{ ability: { name: "limber" } }],
  moves: [
    {
      move: { name: "transform" },
    },
  ],
};

const mockedUseParams = jest.fn(() => ({ id: 1 }));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => mockedUseParams,
}));

jest.mock("../hooks/useFetchPokemonDetails", () => ({
  useFetchPokemonDetails: jest.fn(),
}));

describe("Shows loader when fetching data", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore: Unreachable code error
    useFetchPokemonDetails.mockImplementation(() => ({
      data: {},
      isLoading: true,
      isError: false,
    }));
    render(<PokemonDetails />, { wrapper: BrowserRouter });
  });

  it("Show Loading message", () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("Renders the component", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore: Unreachable code error
    useFetchPokemonDetails.mockImplementation(() => ({
      data: mockPokemon,
      isLoading: false,
      isError: false,
    }));
    render(<PokemonDetails />, { wrapper: BrowserRouter });
  });

  it("Feteches and renders pokemon details", async () => {
    expect(screen.getByText(/ditto/i)).toBeInTheDocument();
    expect(screen.getByText(/limber/i)).toBeInTheDocument();
    expect(screen.getByText(/transform/i)).toBeInTheDocument();

    const img = await screen.findByAltText(/ditto/i);
    expect(img).toBeInTheDocument();
  });
});
