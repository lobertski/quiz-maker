import { Stack, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { useNavigate } from "react-router";
import ActionCard from "@/components/ActionCard";

export default function Home() {
  const [quizId, setQuizId] = useState("");
  const navigate = useNavigate();

  const handlePlay = () => {
    if (quizId.trim()) {
      navigate(`/play/${quizId.trim()}`);
    }
  };

  return (
    <Stack alignItems="center" mt={5} sx={{ textAlign: "center" }}>
      <Typography
        variant="h2"
        fontWeight={800}
        sx={{
          background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}
      >
        Welcome to Quiz Maker
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: 480, mx: "auto" }}
      >
        Create coding quizzes with multiple choice and short answer questions,
        or take an existing quiz and test your knowledge.
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        justifyContent="center"
      >
        <ActionCard
          icon={
            <AddCircleOutlineIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
            />
          }
          title="Create a Quiz"
          description="Build a new quiz with coding questions, code snippets, and multiple question types."
          buttonLabel="Start Building"
          buttonIcon={<AddCircleOutlineIcon />}
          onButtonClick={() => navigate("/builder")}
        />

        <ActionCard
          icon={
            <PlayArrowIcon
              sx={{ fontSize: 48, color: "secondary.main", mb: 1 }}
            />
          }
          title="Take a Quiz"
          description="Enter a quiz ID to load and start answering questions."
          buttonLabel="Start Quiz"
          buttonIcon={<PlayArrowIcon />}
          buttonColor="secondary"
          buttonDisabled={!quizId.trim()}
          onButtonClick={handlePlay}
        >
          <TextField
            label="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
            fullWidth
            sx={{ mb: 1.5 }}
          />
        </ActionCard>
      </Stack>
    </Stack>
  );
}
