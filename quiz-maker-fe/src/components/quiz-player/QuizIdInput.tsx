import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function QuizIdInput() {
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  const handleLoad = () => {
    const id = inputId.trim();
    if (id) navigate(`/play/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Take a Quiz
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Enter Quiz ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoad()}
          fullWidth
        />
        <Button
          variant="contained"
          disabled={!inputId.trim()}
          onClick={handleLoad}
        >
          Load Quiz
        </Button>
      </Stack>
    </Box>
  );
}
