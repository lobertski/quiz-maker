import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import QuizIdInput from "@/components/quiz-player/QuizIdInput";
import QuizLobby from "@/components/quiz-player/QuizLobby";
import ActiveQuiz from "@/components/quiz-player/ActiveQuiz";
import { useCreateAttempt, useQuiz } from "@/api/queries";
import type { Attempt } from "@/types";

export default function QuizPlayerPage() {
  const { quizId: paramId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const parsedId = paramId ? Number(paramId) : undefined;

  const [attempt, setAttempt] = useState<Attempt | null>(null);

  const { data: quiz, isLoading, isError, error: quizErr } = useQuiz(parsedId);
  const createAttempt = useCreateAttempt();

  if (!parsedId) {
    return <QuizIdInput />;
  }

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading quiz...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load quiz: {quizErr?.message ?? "Unknown error"}
        </Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/play")}>
          Try another ID
        </Button>
      </Box>
    );
  }

  if (!quiz?.questions?.length) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">This quiz has no questions.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/play")}>
          Try another ID
        </Button>
      </Box>
    );
  }

  if (attempt) {
    return <ActiveQuiz attempt={attempt} />;
  }

  const handleStart = () => {
    createAttempt.mutate(parsedId, {
      onSuccess: (data) => {
        setAttempt(data);
      },
    });
  };

  return (
    <QuizLobby
      quiz={quiz}
      onStart={handleStart}
      isPending={createAttempt.isPending}
    />
  );
}
