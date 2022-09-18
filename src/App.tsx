import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PokemonList } from "./views/PokemonList";
import { PokemonDetails } from "./views/PokemonDetails";
import { PageNotFound } from "./views/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
