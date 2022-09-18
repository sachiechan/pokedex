type NameWithUrl = { name: string; url: string };

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results?: Pokemon[];
};

export type PokemonDetails = {
  name: string;
  sprites: { front_default: string; front_shiny: string };
  abilities: {
    ability: NameWithUrl;
    isHidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: NameWithUrl;
  }[];
  moves: {
    move: NameWithUrl;
  }[];
};
