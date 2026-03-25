import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuizIcon from "@mui/icons-material/Quiz";
import TimerIcon from "@mui/icons-material/Timer";
import type { Quiz, Question } from "@/types";

interface QuizLobbyProps {
  quiz: Quiz & { questions: Question[] };
  onStart: () => void;
  isPending: boolean;
}

export default function QuizLobby({
  quiz,
  onStart,
  isPending,
}: QuizLobbyProps) {
  const count = quiz.questions.length;

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", textAlign: "center", mt: 6 }}>
      <QuizIcon sx={{ fontSize: 56, color: "primary.main", mb: 1 }} />
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {quiz.title}
      </Typography>

      {quiz.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {quiz.description}
        </Typography>
      )}

      <Card
        sx={{
          mb: 4,
          border: 1,
          borderColor: "grey.200",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            sx={{ py: 1 }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Question{count !== 1 && "s"}
              </Typography>
            </Box>
            {quiz.timeLimitSeconds && (
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={0.5}
                >
                  <TimerIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {Math.floor(quiz.timeLimitSeconds / 60)}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Minutes
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        size="large"
        onClick={onStart}
        disabled={isPending}
        startIcon={
          isPending ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <PlayArrowIcon />
          )
        }
        sx={{ px: 5, py: 1.5 }}
      >
        {isPending ? "Starting..." : "Start Quiz"}
      </Button>
    </Box>
  );
}
