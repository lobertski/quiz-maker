import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <SearchOffIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
      <Typography variant="h3" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Page not found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}
