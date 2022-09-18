import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url = "" }: PokemonCardProps) => {
  const uriParts = url.split("/");
  const uri = uriParts?.length === 8 ? `${uriParts[5]}/${uriParts[6]}` : "";
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(uri)}
      sx={{
        boxShadow: 3,
        width: "8rem",
        height: "5rem",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
    </Box>
  );
};

export default PokemonCard;
