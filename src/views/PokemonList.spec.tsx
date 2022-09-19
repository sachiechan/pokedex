import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { PokemonList } from "./PokemonList";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

describe("Tests for PokemonList View", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore: Unreachable code error
    useFetchPokemon.mockImplementation(() => ({
      data: {
        results: [
          { name: "ditto", url: "" },
          { name: "bulbasaur", url: "" },
        ],
      },
      isLoading: false,
      isError: false,
    }));
    render(<PokemonList />);
  });

  it("Renders view", async () => {
    expect(screen.getByText("Pokemons")).toBeInTheDocument();
    const bulbasaurCard = await screen.findByText("bulbasaur");
    expect(bulbasaurCard).toBeInTheDocument();
    const filterInput = screen.getByRole("input");
    expect(filterInput).toBeInTheDocument();
    await userEvent.type(filterInput, "dit");
    waitFor(() => {
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    });
    expect(await screen.findByText("ditto")).toBeInTheDocument;
  });
});
