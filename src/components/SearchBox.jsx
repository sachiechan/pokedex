import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import TextField from "@mui/material/TextField";

export default function SearchBox({ onChange }) {
  const [value, setValue] = useState("");

  const handleTextChange = (e) => {
    setValue(e.target.value);
    debouncedResults(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce((value) => onChange(value), 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  return (
    <TextField
      id="outlined-basic"
      label="Filter"
      role="input"
      variant="outlined"
      data-testid="autocomplete"
      value={value}
      sx={{ width: 300 }}
      onChange={handleTextChange}
    />
  );
}
