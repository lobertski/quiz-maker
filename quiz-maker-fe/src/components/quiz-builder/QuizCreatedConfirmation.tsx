import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Stack, Typography } from "@mui/material";
import SnackbarAlert from "@/components/SnackbarAlert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface QuizCreatedConfirmationProps {
  quizId: number;
}

export default function QuizCreatedConfirmation({
  quizId,
}: QuizCreatedConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(quizId));
    setCopied(true);
  };

  const handleOpen = () => {
    navigate(`/play/${quizId}`);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <CheckCircleOutlineIcon
        sx={{ fontSize: 64, color: "secondary.main", mb: 1 }}
      />
      <Typography variant="h5" gutterBottom color="secondary.main">
        Quiz Created Successfully!
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Share this Quiz ID with participants
      </Typography>

      <Box
        sx={{
          maxWidth: 360,
          mx: "auto",
          bgcolor: "grey.50",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          {quizId}
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyId}
          >
            Copy ID
          </Button>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            onClick={handleOpen}
          >
            Open Quiz
          </Button>
        </Stack>
      </Box>

      <SnackbarAlert
        message={copied ? "Quiz ID copied to clipboard" : null}
        onClose={() => setCopied(false)}
        severity="success"
        autoHideDuration={2000}
      />
    </Box>
  );
}
