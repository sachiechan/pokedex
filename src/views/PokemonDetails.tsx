import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider, Avatar } from "@mui/material";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";

export const PokemonDetails = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError } = useFetchPokemonDetails(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later...</div>;
  }

  return (
    <Box sx={{ margin: "3rem" }}>
      <Link to="/">{`< Back`}</Link>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={data?.name}
          src={data?.sprites?.front_shiny}
          sx={{ width: 150, height: 150, marginRight: "2rem" }}
        />
        <Typography variant="h4" gutterBottom>
          {data?.name}
        </Typography>
      </Box>

      <Divider />
      <Stack direction="row" gap={10} sx={{ marginTop: "2rem" }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Moves
          </Typography>
          <Divider />
          {data?.moves?.map(({ move }) => (
            <Typography
              key={move.name}
              gutterBottom
              variant="body1"
              component="div"
            >
              {move.name}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Abilities
          </Typography>
          <Divider />
          {data?.abilities?.map(({ ability }) => (
            <Typography
              key={ability.name}
              gutterBottom
              variant="body1"
              component="div"
            >
              {ability.name}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
