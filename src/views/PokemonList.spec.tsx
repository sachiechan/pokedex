import { screen, render } from "@testing-library/react";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { PokemonList } from "./PokemonList";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../hooks/useFetchPokemon", () => ({
  useFetchPokemon: jest.fn(),
}));

describe("Shows loader when fetching data", () => {
  beforeEach(() => {
    //@ts-ignore: Unreachable code error
    useFetchPokemon.mockImplementation(() => ({
      data: {},
      isLoading: true,
      isError: false,
    }));
    render(<PokemonList />, { wrapper: BrowserRouter });
  });

  it("Showis Loading message", () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

// describe("Tests for PokemonList View", () => {
//   beforeEach(() => {
//     //@ts-ignore: Unreachable code error
//     useFetchPokemon.mockImplementation(() => ({
//       data: { results: [] },
//       isLoading: false,
//       isError: false,
//     }));
//     render(<PokemonList />, { wrapper: BrowserRouter });
//   });

//   it("Renders view", () => {
//     screen.debug();
//     expect(screen.getByText("Pokemons")).toBeInTheDocument();
//     expect(screen.getByRole("input")).toBeInTheDocument();
//     //await screen.findByText("bulbasaur");
//   });
// });
