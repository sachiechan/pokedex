import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import TextField from "@mui/material/TextField";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
